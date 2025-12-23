<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import type { EventType } from '$lib/types';
	import Event from './Event.svelte';

	let {
		events
	}: {
		events: EventType[];
	} = $props();
</script>

<div class="flex flex-col rounded-2xl bg-white p-5 max-lg:w-full lg:w-4/6">
	<h2 class="text-2xl font-medium">
		{m.previousExtraordinaryEvents()}
	</h2>

	{#each events as event, i (i)}
		<Event {event} />
	{/each}
</div>
