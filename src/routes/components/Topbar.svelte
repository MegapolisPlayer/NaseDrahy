<script lang="ts">
	import DarkMode from './DarkMode.svelte';
	import LanguageSelect from './LanguageSelect.svelte';
	import OurRailways from './OurRailways.svelte';
	import { fly } from 'svelte/transition';
	import { darkMode } from '$lib/index.svelte';
</script>

<div
	class="z-10 flex gap-2 rounded-b-2xl shadow-lg {darkMode.getBackgroundColor()} p-2 ps-5! pe-5! max-lg:w-full max-lg:flex-col lg:w-4/6 lg:flex-row"
	in:fly|global={{ duration: 500, delay: 100, x: 0, y: -100, opacity: 0 }}
>
	<DarkMode />
	<div class="max-lg:hidden lg:grow"></div>
	<OurRailways />
	<div class="max-lg:hidden lg:grow"></div>
	<LanguageSelect />
</div>
