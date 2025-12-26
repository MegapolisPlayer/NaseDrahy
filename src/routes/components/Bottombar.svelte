<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { fly } from 'svelte/transition';
	import { darkMode } from '$lib/index.svelte';
	import VerticalLine from './VerticalLine.svelte';
</script>

<div
	class="z-10 flex gap-0 rounded-t-2xl {darkMode.getBackgroundColor()} flex-col p-2 ps-5! pe-5! shadow-lg max-lg:w-9/10 lg:w-4/6"
	in:fly|global={{ duration: 500, delay: 100, x: 0, y: 100, opacity: 0 }}
>
	<div class="flex w-full max-lg:flex-col lg:flex-row lg:gap-2">
		© Martin Bykov, Juraj Křivda 2025
		<div class="max-lg:hidden lg:grow"></div>
		<a href="https://martinbykov.eu">
			<i class="ri-pages-fill"></i>
			{m.authorsWebsite()}
		</a>
		<VerticalLine />
		<a href="https://kukiweb.cz">
			<i class="ri-smartphone-fill"></i>
			{m.widgetAuthorsWebsite()}
		</a>
		<VerticalLine />
		<a
			href="https://commons.wikimedia.org/wiki/File:Roudnice_nad_Labem_n%C3%A1dra%C5%BE%C3%AD.1_(2025).jpg"
		>
			<i class="ri ri-image-fill"></i>
			{m.linkToPictureSource()}
		</a>
	</div>
	<div class="font-medium">
		{m.thisWebsiteDoesNotIntendToCauseAnyHarmToCzechRailwaysOrTheRailwayAdministration()}
	</div>
</div>
