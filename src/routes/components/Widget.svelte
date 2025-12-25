<script lang="ts">
	import { darkMode } from '$lib/index.svelte';
	import { fly } from 'svelte/transition';
	import { m } from '$lib/paraglide/messages';
</script>

<div
	class="flex flex-row rounded-2xl {darkMode.getAccentColor()} p-5 text-white max-lg:w-full lg:w-4/6"
	in:fly|global={{ duration: 1000, delay: 1000, x: -500, y: 0, opacity: 0 }}
>
	<div class="flex flex-col justify-center gap-0">
		<h2 class="text-2xl font-medium">
			{m.wantToHaveAccessToTheCounterAnywhereEverywhere()}
		</h2>
		<p class="text-xl">
			{m.tryOurPhoneWidget()}
		</p>
	</div>
	<div class="grow"></div>
	<div class="flex flex-col items-center justify-center gap-0">
		<a
			href="https://kukiweb.cz/trwidget"
			class="group rounded-2xl {darkMode.getBackgroundColor()} p-5 text-xl font-medium {darkMode.getAccentColorText()} {darkMode.getAccentColorBackground()} hover:text-white active:bg-orange-700"
		>
			<i class="ri-download-line group-hover:hidden"></i>
			<i class="ri-download-fill not-group-hover:hidden"></i>
			{m.download()}
		</a>
	</div>
</div>
