<script lang="ts">
	import { enhance } from '$app/forms';
	import { darkMode } from '$lib/index.svelte';
	import { m } from '$lib/paraglide/messages';
</script>

<form 
	class="flex flex-row gap-1"
	use:enhance
	action="/?/setDarkMode"
	method="POST"
>
	<div class="grow lg:hidden"></div>
	<button
		type="submit"
		onclick={() => {
			darkMode.setLightMode();
		}}
		name="mode"
		value="light"
	>
		<i class="ri-sun-line group-hover:hidden"></i>
		<i class="ri-sun-fill not-group-hover:hidden"></i>
		{m.lightMode({})}
	</button>
	<button
		type="submit"
		onclick={() => {
			darkMode.setDarkMode();
		}}
		name="mode"
		value="dark"
	>
		<i class="ri-moon-line group-hover:hidden"></i>
		<i class="ri-moon-fill not-group-hover:hidden"></i>
		{m.darkMode({})}
	</button>
</form>
