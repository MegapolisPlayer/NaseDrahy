import { m } from './paraglide/messages';

export const DAYS_MS = 60 * 60 * 24 * 1000;

export const writeDays = (days: number) => {
	if (days == 0) return m.days0();
	else if (days === 1) return m.day1();

	if (days % 10 == 2 || days % 10 == 3 || days % 10 == 4) return m.days234();
	else return m.days5();
};

//max message length
export const MAX_CONTENT_LENGTH = 250;

export const LINK_REGEX = /(?:https*:\/\/)?((?:(?:[a-z]|[0-9])+)\.)?((?:[a-z]|[0-9]){2,})(\.(?:[a-z]|[0-9]){2,6})(\/.*)?/gu;
export const LINK_SUBSTITUTE = '<a href="https://$1$2$3$4"><i class="ri-link"></i>$1$2$3</a>';