<script lang="ts">
	import { darkMode } from '$lib/index.svelte';

	let { value = $bindable(), type = 'text', label, children = undefined } = $props();
</script>

<div>
	<h2 class="text-xl">{label}</h2>
	<input class="text-input {darkMode.getLightBackground()}" {type} bind:value required />
	{@render children?.()}
</div>
