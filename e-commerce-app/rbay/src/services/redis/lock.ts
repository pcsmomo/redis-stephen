import { client } from './client';
import { randomBytes } from 'crypto';

export const withLock = async (key: string, cb: (signal: any) => any) => {
	// Initialize a few variables to control retry behavior
	const retryDelayMs = 10;
	let retries = 20;

	// Generate a random value to store at the lock key
	const token = randomBytes(6).toString('hex'); // 12 characters
	// Create the lock key
	const lockKey = `lock:${key}`;

	// Set up a while loop to implement the retry behavior
	while (retries >= 0) {
		retries--;
		// Try to do a SET NX operation
		const acquired = await client.set(lockKey, token, {
			NX: true,
			PX: 2000
		});

		if (!acquired) {
			// ELSE brief pause (retryDelayMs) and then retry
			await pause(retryDelayMs);
			continue;
		}

		// If the set is successful, then run the callback
		try {
			const signal = { expired: false };
			setTimeout(() => {
				signal.expired = true;
			}, 2000);
			const result = await cb(signal);
			return result;
		} finally {
			// Unset the locked set
			await client.unlock(lockKey, token);
		}
	}
};

const buildClientProxy = () => {};

const pause = (duration: number) => {
	return new Promise((resolve) => {
		setTimeout(resolve, duration);
	});
};
