import { client } from '$services/redis';
import { itemsKey, itemsByViewsKey } from '$services/keys';

export const itemsByViews = async (order: 'DESC' | 'ASC' = 'DESC', offset = 0, count = 10) => {
	const results = await client.sort(itemsByViewsKey, {
		GET: ['#', `${itemsKey('*')}->name`, `${itemsKey('*')}->views`],
		BY: 'nosort',
		// technically there's no 'score' field, so it won't sort by anything
		// however, sorted sets are sorted by score by default
		DIRECTION: order,
		LIMIT: {
			offset,
			count
		}
	});

	console.log(results);
};
