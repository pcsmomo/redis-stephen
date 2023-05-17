import axios from 'axios';

console.clear();
console.log('Running...');

let completedCount = 0;
let success = 0;
let fail = 0;
const createBid = async (amount: number, port: number) => {
	axios
		.post(
			`http://localhost:${port}/items/${itemId}/bids`,
			{ amount },
			{
				headers: {
					accept: 'application/json',
					'content-type': 'application/json',
					cookie
				}
			}
		)
		.then((res) => {
			success++;
		})
		.catch((err) => {
			if (err.code !== 'ECONNRESET') {
				fail++;
			}
		})
		.finally(() => {
			completedCount++;
			if (completedCount === attempts) {
				console.table({
					'Time Ms': Math.floor(performance.now() - start),
					Successes: success,
					Failures: fail,
					'% Success': Math.round((success / (success + fail)) * 100)
				});
			}
		});
};

const pause = async (p: number) => {
	return new Promise((resolve) => {
		setTimeout(resolve, p);
	});
};

const cookie = 'auth=9975918c%3AC9yBfEgOABd-oHEw3Ta4pOS3Z0M';
const attempts = 50;
const itemId = '7fe091';
const start = performance.now();

const run = async () => {
	for (let i = 0; i < attempts; i++) {
		const port = [3000, 3001, 3002][i % 3];
		createBid(i, port);
		await pause(0);
	}
};
run();