<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import type { EventType } from '$lib/types';
	import { fly } from 'svelte/transition';
	import Modal from './Modal.svelte';
	import { darkMode } from '$lib/index.svelte';

	let {
		events
	}: {
		events: EventType[];
	} = $props();

	let showMessageModal = $state(false);
</script>

<div
	class="flex flex-col rounded-2xl {darkMode.getBackgroundColor()}  p-5 max-lg:w-full lg:w-4/6"
	in:fly|global={{ duration: 1000, delay: 500, x: 500, y: 0, opacity: 0 }}
>
	{#if events.length === 0}
		<div class="flex flex-col grow w-full justify-center items-center text-xl">
			{m.noExtraordinaryEventsDotDotDotYet()}
		</div>
	{:else}
		<h2 class="text-2xl font-medium">
			{m.daysSinceLastExtraordinaryEvent()}
		</h2>
		<div class="flex w-full grow flex-col items-center justify-center text-9xl font-medium">
			{m.TODAY()}
		</div>
		<div class="flex w-full flex-row gap-2">
			<div class="grow"></div>
			<div>
				{m.didWeNotNoticeAnEvent()}
			</div>
			<button class="" onclick={() => (showMessageModal = true)}>
				{m.leaveAMessage()}
			</button>
		</div>
	{/if}
</div>

<Modal></Modal>
