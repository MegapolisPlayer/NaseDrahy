import { error, type RequestEvent } from '@sveltejs/kit';
import { RateLimiter } from 'sveltekit-rate-limiter/server';

const limiter = new RateLimiter({
  IPUA: [5, 's'], // IP + User Agent limiter
});

export const checkRate = async (event: RequestEvent) => {
	if(((await limiter.check(event)).limited)) {
		throw error(429);
	}
	return false;
}