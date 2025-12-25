<script lang="ts">
	import { darkMode } from '$lib/index.svelte';
	import { m } from '$lib/paraglide/messages';
</script>

<div class="flex flex-row gap-1">
	<button onclick={() => {
		darkMode.setLightMode();
	}}>
		<i class="group-hover:hidden ri-sun-line"></i>
		<i class="not-group-hover:hidden ri-sun-fill"></i>
		{m.lightMode({})}
	</button>
	<button onclick={() => {
		darkMode.setDarkMode();
	}}>
		<i class="group-hover:hidden ri-moon-line"></i>
		<i class="not-group-hover:hidden ri-moon-fill"></i>
		{m.darkMode({})}
	</button>
</div>
