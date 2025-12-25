import { type RequestEvent } from '@sveltejs/kit';
import { RateLimiter } from 'sveltekit-rate-limiter/server';

const limiter = new RateLimiter({
  IPUA: [25, 's'], // IP + User Agent limiter
});

//returns if ok?
export const checkRate = async (event: RequestEvent) => {
	if(event.isSubRequest) return true;
	return !((await limiter.check(event)).limited);
}