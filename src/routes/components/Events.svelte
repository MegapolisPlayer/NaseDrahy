<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import type { EventType } from '$lib/types';
	import Event from './Event.svelte';
	import { darkMode } from '$lib/index.svelte';
	import { fly } from 'svelte/transition';

	let {
		events
	}: {
		events: EventType[];
	} = $props();
</script>

<div
	class="flex flex-col gap-5 rounded-2xl {darkMode.getBackgroundColor()} grow overflow-x-hidden overflow-y-scroll p-5 max-lg:w-full lg:w-4/6"
	in:fly|global={{ duration: 1000, delay: 1500, x: 500, y: 0, opacity: 0 }}
>
	<h2 class="text-2xl font-medium">
		{m.previousExtraordinaryEvents()}
	</h2>

	{#each events as event, i (i)}
		<Event {event} />
	{:else}
		<div class="flex flex-col grow gap-2 justify-center items-center p-5">
			{m.noExtraordinaryEventsDotDotDotYet()}
		</div>
	{/each}
</div>
