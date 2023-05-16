import { client } from '$services/redis';
import { itemsKey, itemsByPriceKey } from '$services/keys';
import { deserialize } from './deserialize';

export const itemsByPrice = async (order: 'DESC' | 'ASC' = 'DESC', offset = 0, count = 10) => {
	let results: any = await client.sort(itemsByPriceKey, {
		GET: [
			'#',
			`${itemsKey('*')}->name`,
			`${itemsKey('*')}->views`,
			`${itemsKey('*')}->endingAt`,
			`${itemsKey('*')}->imageUrl`,
			`${itemsKey('*')}->price`
		],
		BY: 'nosort',
		// technically there's no 'score' field, so it won't sort by anything
		// however, sorted sets are sorted by score by default
		DIRECTION: order,
		LIMIT: {
			offset,
			count
		}
	});

	const items = [];
	while (results.length) {
		const [id, name, views, endingAt, imageUrl, price, ...rest] = results;
		const item = deserialize(id, { name, views, endingAt, imageUrl, price });
		items.push(item);
		results = rest;
	}

	return items;
};
