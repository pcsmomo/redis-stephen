import { client } from '$services/redis';

export const incrementView = async (itemId: string, userId: string) => {
	// it is slightly better to use Lua Script in terms of concurrency issues
	return client.incrementView(itemId, userId);

	// By code instead of Lua Script
	// const inserted = await client.pfAdd(itemsViewsKey(itemId), userId);

	// if (inserted) {
	// 	return Promise.all([
	// 		client.hIncrBy(itemsKey(itemId), 'views', 1),
	// 		client.zIncrBy(itemsByViewsKey, 1, itemId)
	// 	]);
	// }
};

// Keys I need to access
// 1) itemsViewsKey ->
// 2) itemsKey -> items#asldkfjqwe
// 3) itemsByViewsKey
//
// Arguments I need to accept
// 1) itemId
// 2) userId
//
// EVALSHA <ID> 3 'KEY1' 'KEY2' 'KEY3' 'ARG1' 'ARG2'
