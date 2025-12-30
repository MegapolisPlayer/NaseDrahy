export const load = async (event) => {
	const mode = event.cookies.get("dark");
	if (!mode) {
		event.cookies.set("dark", "light", { path: '/' });
		return {
			dark: "light"
		};
	}
	else {
		return {
			dark: mode
		};
	}
};