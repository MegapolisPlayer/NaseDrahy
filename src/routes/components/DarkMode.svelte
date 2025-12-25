<script lang="ts">
	import { darkMode } from '$lib/index.svelte';
	import { m } from '$lib/paraglide/messages';
</script>

<div class="flex flex-row gap-1">
	<button
		onclick={() => {
			darkMode.setLightMode();
		}}
	>
		<i class="ri-sun-line group-hover:hidden"></i>
		<i class="ri-sun-fill not-group-hover:hidden"></i>
		{m.lightMode({})}
	</button>
	<button
		onclick={() => {
			darkMode.setDarkMode();
		}}
	>
		<i class="ri-moon-line group-hover:hidden"></i>
		<i class="ri-moon-fill not-group-hover:hidden"></i>
		{m.darkMode({})}
	</button>
</div>
