export class DarkModeHandler {
	DARK_MODE = $state(false);

	constructor() {}

	setDarkMode = () => {
		this.DARK_MODE = true;
	};

	setLightMode = () => {
		this.DARK_MODE = false;
	};

	setMode = (mode: string) => {
		if(mode == 'dark') this.DARK_MODE = true;
		else if(mode == 'light') this.DARK_MODE = false;
		console.log(this.DARK_MODE, "DM", mode);
	}

	getBackgroundColor = () => {
		return this.DARK_MODE
			? 'backdrop-blur bg-neutral-800/30! text-neutral-100 decoration-neutral-100'
			: 'backdrop-blur bg-neutral-100/70! text-neutral-800 decoration-neutral-800';
	};
	getBackgroundCoverColor = () => {
		return this.DARK_MODE ? 'backdrop-blur-xs bg-neutral-800/70' : 'backdrop-blur-xs bg-neutral-100/70';
	};
	getAccentColor = () => {
		return this.DARK_MODE ? 'backdrop-blur bg-orange-700/50' : 'backdrop-blur bg-orange-600/70';
	};
	getAccentColorText = () => {
		return this.DARK_MODE ? 'text-orange-700!' : 'text-orange-600!';
	};
	getAccentColorBackground = () => {
		return this.DARK_MODE ? 'bg-orange-700! text-neutral-100!' : 'bg-neutral-100! text-orange-600!';
	};
	getBackgroundColorChildren = () => {
		return this.DARK_MODE
			? '*:bg-neutral-800/30! *:text-neutral-100 *:decoration-neutral-100'
			: '*:bg-neutral-100/70! *:text-neutral-800 *:decoration-neutral-800';
	};
	getLightBackground = () => {
		return this.DARK_MODE
			? 'backdrop-blur bg-neutral-600/30! text-neutral-100! decoration-neutral-100'
			: 'backdrop-blur bg-neutral-200/50! text-neutral-800! decoration-neutral-800';
	};
	getBackdrop = () => {
		return this.DARK_MODE ? 'backdrop:bg-neutral-800/70' : 'backdrop:bg-neutral-100/70';
	};
	getTextColorAsBackground = () => {
		return this.DARK_MODE ? 'bg-neutral-100' : 'bg-neutral-800';
	};
	getButtonColor = () => {
		return this.DARK_MODE
			? 'backdrop-blur bg-neutral-800! text-neutral-100! decoration-neutral-100!'
			: 'backdrop-blur bg-neutral-100! text-orange-700! decoration-orange-700!';
	}
}

export const darkMode = new DarkModeHandler();
