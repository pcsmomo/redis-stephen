import { RedisCommandArguments } from '@node-redis/client/dist/lib/commands';
import { createClient, defineScript } from 'redis';
import { itemsKey, itemsByViewsKey, itemsViewsKey } from '$services/keys';

const client = createClient({
	socket: {
		host: process.env.REDIS_HOST,
		port: parseInt(process.env.REDIS_PORT)
	},
	password: process.env.REDIS_PW,
	scripts: {
		addOneAndStore: defineScript({
			NUMBER_OF_KEYS: 1,
			SCRIPT: `
				return redis.call('SET', KEYS[1], 1 + tonumber(ARGV[1]))
			`,
			transformArguments(key: string, value: number): RedisCommandArguments {
				return [key, value.toString()];
				// ['books:count', '5']
				// EVALSHA <ID> 1 'books:count', '5'
			},
			transformReply(reply: any) {
				return reply;
			}
		}),
		incrementView: defineScript({
			NUMBER_OF_KEYS: 3,
			SCRIPT: `
				local itemsViewsKey = KEYS[1]
				local itemsKey = KEYS[2]
				local itemsByViewsKey = KEYS[3]
				local itemId = ARGV[1]
				local userId = ARGV[2]

				local inserted = redis.call('PFADD', itemsViewsKey, userId)

				if inserted == 1 then
					redis.call('HINCRBY', itemsKey, 'views', 1)
					redis.call('ZINCRBY', itemsByViewsKey, 1, itemId)
				end
			`,
			transformArguments(itemId: string, userId: string): RedisCommandArguments {
				return [
					itemsViewsKey(itemId), // -> items:views#asdf
					itemsKey(itemId), // -> items#asdf
					itemsByViewsKey, // -> items:views
					itemId, // -> asdf
					userId // -> u123
				];
			},
			transformReply() {}
		})
	}
});

// debugging code
// client.on('connect', async () => {
// 	await client.addOneAndStore('books:count', 10);
// 	const result = await client.get('books:count');
// 	console.log(result);
// });

client.on('error', (err) => console.error(err));
client.connect();

export { client };
