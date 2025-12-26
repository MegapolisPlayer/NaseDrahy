<script lang="ts">
	import { darkMode } from '$lib/index.svelte';
	import { fly } from 'svelte/transition';
	import { m } from '$lib/paraglide/messages';
</script>

<div
	class="flex gap-2 rounded-2xl max-lg:flex-col lg:flex-row {darkMode.getAccentColor()} p-5 text-white max-lg:w-9/10 lg:w-4/6"
	in:fly|global={{ duration: 1000, delay: 1000, x: -500, y: 0, opacity: 0 }}
>
	<div class="flex flex-col justify-center gap-0">
		<h2 class="font-medium max-lg:text-lg lg:text-2xl">
			{m.wantToHaveAccessToTheCounterAnywhereEverywhere()}
		</h2>
		<p class="max-lg:text-base lg:text-xl">
			{m.tryOurPhoneWidget()}
		</p>
	</div>
	<div class="grow"></div>
	<div class=" flex flex-col items-center justify-center gap-0 max-lg:text-center">
		<a
			href="https://kukiweb.cz/trwidget"
			class="group rounded-2xl max-lg:w-full {darkMode.getBackgroundColor()} p-5 text-xl font-medium {darkMode.getAccentColorBackground()} hover:text-white active:bg-orange-700"
		>
			<i class="ri-download-line group-hover:hidden"></i>
			<i class="ri-download-fill not-group-hover:hidden"></i>
			{m.download()}
		</a>
	</div>
</div>
