import type { CreateBidAttrs, Bid } from '$services/types';
import { bidHistoryKey, itemsKey, itemsByPriceKey } from '$services//keys';
import { client, withLock } from '$services/redis';
import { DateTime } from 'luxon';
import { getItem } from './items';

// to simulate hanging process
// const pause = (duration: number) => {
// 	return new Promise((resolve) => {
// 		setTimeout(resolve, duration);
// 	});
// };

// Version 3: With Lock
export const createBid = async (attrs: CreateBidAttrs) => {
	return withLock(attrs.itemId, async (lockedClient: typeof client, signal: any) => {
		// 1) Fetching the item
		// 2) Doing validation
		// 3) Writing some data
		const item = await getItem(attrs.itemId);

		// await pause(5000);

		// validate
		if (!item) {
			throw new Error('Item does not exist');
		}
		if (item.price >= attrs.amount) {
			throw new Error('Bid too low');
		}
		if (item.endingAt.diff(DateTime.now()).toMillis() < 0) {
			throw new Error('Item closed to bidding');
		}

		// create bid
		const serialized = serializeHistory(attrs.amount, attrs.createdAt.toMillis());

		if (signal.expired) {
			throw new Error("Lock expired, can't write anymore data");
		}

		return Promise.all([
			lockedClient.rPush(bidHistoryKey(attrs.itemId), serialized),
			lockedClient.hSet(itemsKey(item.id), {
				bids: item.bids + 1,
				price: attrs.amount,
				highestBidUserId: attrs.userId
			}),
			lockedClient.zAdd(itemsByPriceKey, {
				value: item.id,
				score: attrs.amount
			})
		]);
	});
};

export const getBidHistory = async (itemId: string, offset = 0, count = 10): Promise<Bid[]> => {
	const startIndex = -1 * offset - count;
	const endIndex = -1 - offset;

	const range = await client.lRange(bidHistoryKey(itemId), startIndex, endIndex);

	return range.map((bid) => deserializeHistory(bid));
};

const serializeHistory = (amount: number, createdAt: number) => {
	return `${amount}:${createdAt}`;
};

const deserializeHistory = (stored: string) => {
	const [amount, createdAt] = stored.split(':');

	return {
		amount: parseFloat(amount),
		createdAt: DateTime.fromMillis(parseInt(createdAt))
	};
};

// ////////////////////////////
// Version 2: Using Watch / Multi
// export const createBid = async (attrs: CreateBidAttrs) => {
// 	return client.executeIsolated(async (isolatedClient) => {
// 		await isolatedClient.watch(itemsKey(attrs.itemId));

// 		const item = await getItem(attrs.itemId);

// 		// validate
// 		if (!item) {
// 			throw new Error('Item does not exist');
// 		}
// 		if (item.price >= attrs.amount) {
// 			throw new Error('Bid too low');
// 		}
// 		if (item.endingAt.diff(DateTime.now()).toMillis() < 0) {
// 			throw new Error('Item closed to bidding');
// 		}

// 		// create bid
// 		const serialized = serializeHistory(attrs.amount, attrs.createdAt.toMillis());

// 		return isolatedClient
// 			.multi()
// 			.rPush(bidHistoryKey(attrs.itemId), serialized)
// 			.hSet(itemsKey(item.id), {
// 				bids: item.bids + 1,
// 				price: attrs.amount,
// 				highestBidUserId: attrs.userId
// 			})
// 			.zAdd(itemsByPriceKey, {
// 				value: item.id,
// 				score: attrs.amount
// 			})
// 			.exec();
// 	});
// };

// ////////////////////////////
// Version 1: Using Promise.all pipeline
// not using Promise.all because we want to execute the commands with transaction
// export const createBid = async (attrs: CreateBidAttrs) => {
// 	const item = await getItem(attrs.itemId);

// 	if (!item) {
// 		throw new Error('Item does not exist');
// 	}
// 	if (item.price >= attrs.amount) {
// 		throw new Error('Bid too low');
// 	}
// 	if (item.endingAt.diff(DateTime.now()).toMillis() < 0) {
// 		throw new Error('Item closed to bidding');
// 	}

// 	const serialized = serializeHistory(attrs.amount, attrs.createdAt.toMillis());

// 	Promise.all([
// 		client.rPush(bidHistoryKey(attrs.itemId), serialized),
// 		client.hSet(itemsKey(item.id), {
// 			bids: item.bids + 1,
// 			price: attrs.amount,
// 			highestBidUserId: attrs.userId
// 		})
// 	]);
// };
