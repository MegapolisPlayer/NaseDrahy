<script lang="ts">
	import { darkMode } from '$lib/index.svelte';
	import type { EventType } from '$lib/types';

	let {
		event
	}: {
		event: EventType;
	} = $props();

	let isRoudnice = $derived(event.location.toLowerCase().includes('roudnice'));
</script>

<div
	class="hoverable flex min-h-25 w-full flex-col rounded-lg p-2 shadow-lg {darkMode.getLightBackground()} justify-center"
>
	<div class="flex w-full gap-2 max-lg:flex-col lg:flex-row">
		<h2 class="font-medium max-lg:text-base lg:text-xl">{event.name}</h2>
		<div class="grow max-lg:hidden"></div>
		<p class="text-xs italic opacity-40 max-lg:hidden">{event.uuid}</p>
	</div>
	<div class="overflow-hidden max-lg:text-sm lg:text-base">
		{event.description}
	</div>
	<div
		class="flex w-full max-lg:flex-col max-lg:text-sm lg:flex-row lg:gap-2 lg:text-base {isRoudnice
			? 'font-medium!'
			: ''} {isRoudnice ? darkMode.getAccentColorText() : ''}"
	>
		<div>
			<i class="ri-calendar-2-line"></i>
			{event.day.toString().padStart(2, '0')}.{event.month.toString().padStart(2, '0')}.{event.year}
		</div>
		<div>
			<i class="ri-map-pin-5-line"></i>
			{event.location}
			{#if isRoudnice}
				<i class="ri ri-error-warning-fill"></i>
			{/if}
		</div>
	</div>
	<div class="text-[0.6rem] italic opacity-40 lg:hidden">
		{event.uuid}
	</div>
</div>
