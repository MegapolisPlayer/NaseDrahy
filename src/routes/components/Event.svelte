<script lang="ts">
	import { darkMode } from '$lib/index.svelte';
	import { m } from '$lib/paraglide/messages';
	import type { EventType } from '$lib/types';

	let {
		event
	}: {
		event: EventType;
	} = $props();

	let isRoudnice = $derived(event.location.toLowerCase().includes('roudnice'));
</script>

<div
	class="flex h-25 max-h-25 min-h-25 w-full flex-col rounded-lg p-2 shadow-lg {darkMode.getLightBackground()} justify-center"
>
	<div class="flex w-full flex-row gap-2">
		<h2 class="text-xl font-medium">{event.name}</h2>
		<div class="grow"></div>
		<p class="text-xs italic opacity-50">{event.uuid}</p>
	</div>
	<div>
		{event.description}
	</div>
	<div
		class="flex w-full flex-row gap-2 {isRoudnice ? 'font-medium' : ''} {isRoudnice
			? darkMode.getAccentColorText()
			: darkMode.getLightBackground()}"
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
</div>
