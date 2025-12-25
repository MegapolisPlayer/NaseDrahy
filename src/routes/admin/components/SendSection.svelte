<script lang="ts">
	import { darkMode } from '$lib/index.svelte';

		let {
		dest, 
		response = $bindable(""),
		testApiKey, 
		object
	}: {
		dest: string;
		response: string;
		testApiKey: string;
		object?: Object|undefined;
	} = $props();

	const makeFetch = (dest: string, object?: Object|undefined) => {
		response = `${dest}, waiting...`;
		fetch(dest, {
			body: JSON.stringify({
				sitekey: testApiKey,
				...object,
			}),
			method: 'POST'
		}).then((v) => {
			v.text().then((w) => {
				response = w;
			});
		});
	};
</script>

<div>
	<button
		onclick={() => {
			makeFetch(dest, object);
		}}
		class="button-primary {darkMode.getAccentColor()} {darkMode.getAccentColorBackground()}"
	>
		Send
	</button>
	<h2 class="text-xl">POST {dest}</h2>
</div>
