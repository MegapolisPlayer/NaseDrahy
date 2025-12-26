export class DarkModeHandler {
	DARK_MODE = $state(false);

	constructor() {}

	setDarkMode = () => {
		this.DARK_MODE = true;
	};

	setLightMode = () => {
		this.DARK_MODE = false;
	};

	getBackgroundColor = () => {
		return this.DARK_MODE
			? 'bg-neutral-800! text-neutral-100 decoration-neutral-100'
			: 'bg-neutral-100! text-neutral-800 decoration-neutral-800';
	};
	getTransparentBackgroundColor = () => {
		return this.DARK_MODE ? 'bg-neutral-800/70' : 'bg-neutral-100/70';
	};
	getAccentColor = () => {
		return this.DARK_MODE ? 'bg-orange-700' : 'bg-orange-600';
	};
	getAccentColorText = () => {
		return this.DARK_MODE ? 'text-orange-700!' : 'text-orange-600!';
	};
	getAccentColorBackground = () => {
		return this.DARK_MODE ? 'bg-orange-700! text-neutral-100!' : 'bg-neutral-100! text-orange-600!';
	};
	getBackgroundColorChildren = () => {
		return this.DARK_MODE
			? '*:bg-neutral-800 *:text-neutral-100 *:decoration-neutral-100'
			: '*:bg-neutral-100 *:text-neutral-800 *:decoration-neutral-800';
	};
	getLightBackground = () => {
		return this.DARK_MODE
			? 'bg-neutral-600! text-neutral-100! decoration-neutral-100'
			: 'bg-neutral-200! text-neutral-800! decoration-neutral-800';
	};
	getBackdrop = () => {
		return this.DARK_MODE ? 'backdrop:bg-neutral-800/70' : 'backdrop:bg-neutral-100/70';
	};
	getTextColorAsBackground = () => {
		return this.DARK_MODE ? 'bg-neutral-100' : 'bg-neutral-800';
	};
}

export const darkMode = new DarkModeHandler();
