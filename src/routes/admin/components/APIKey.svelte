<script lang="ts">
	import { enhance } from '$app/forms';
	import { darkMode } from '$lib/index.svelte';

	let {
		action = "",
		name = "",
		trueValue = "",
		apiKey = $bindable(trueValue),
	}: {
		action: string;
		name: string;
		trueValue: string;
		apiKey?: string;
	} = $props();
</script>

<form class="button-primary flex-row! items-center!" method="post" use:enhance {action}>
	<h2 class="text-xl">{name}</h2>
	<input
		class="text-input {darkMode.getLightBackground()}"
		name="key"
		type="text"
		bind:value={apiKey}
		required
	/>
	<button
		type="button"
		onclick={() => {
			apiKey = crypto.randomUUID();
		}}
		class="button-primary {darkMode.getAccentColor()} {darkMode.getAccentColorBackground()}"
	>
		Generate new
	</button>
	<button
		type="button"
		onclick={() => {
			apiKey = trueValue;
		}}
		class="button-primary {darkMode.getAccentColor()} {darkMode.getAccentColorBackground()}"
	>
		Get true value
	</button>
	<button class="button-primary {darkMode.getAccentColor()} {darkMode.getAccentColorBackground()}">
		Update
	</button>
</form>
