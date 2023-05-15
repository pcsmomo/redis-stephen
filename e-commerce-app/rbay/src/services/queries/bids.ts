import type { CreateBidAttrs, Bid } from '$services/types';
import { bidHistoryKey } from '$services//keys';
import { client } from '$services/redis';
import { DateTime } from 'luxon';

export const createBid = async (attrs: CreateBidAttrs) => {};

export const getBidHistory = async (itemId: string, offset = 0, count = 10): Promise<Bid[]> => {
	return [];
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
