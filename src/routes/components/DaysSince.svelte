<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import type { EventType } from '$lib/types';
	import { fly } from 'svelte/transition';
	import Modal from './Modal.svelte';
	import { darkMode } from '$lib/index.svelte';
	import { enhance } from '$app/forms';
	import { DAYS_MS, writeDays } from '$lib';

	let {
		events
	}: {
		events: EventType[];
	} = $props();

	let showMessageModal = $state(false);
	let lastEventTime = $derived.by(() => {
		if (events.length == 0) return new Date();
		return new Date(events[0].year, events[0].month - 1, events[0].day);
	});
	let daysPassed = $derived(Math.trunc((Date.now() - lastEventTime.getTime()) / DAYS_MS));

	let sending = $state(false);
</script>

<div
	class="flex flex-col rounded-2xl {darkMode.getBackgroundColor()}  p-5 max-lg:w-full lg:w-4/6"
	in:fly|global={{ duration: 1000, delay: 500, x: 500, y: 0, opacity: 0 }}
>
	{#if events.length === 0}
		<div class="flex w-full grow flex-col items-center justify-center text-xl">
			{m.noExtraordinaryEventsDotDotDotYet()}
		</div>
	{:else}
		<h2 class="text-2xl font-medium">
			{#if daysPassed == 0}
				{m.lastExtraordinaryEventHappened()}
			{:else}
				{m.daysSinceLastExtraordinaryEvent()}
			{/if}
		</h2>
		<div class="flex w-full grow flex-col items-center justify-center text-9xl font-medium">
			{#if daysPassed == 0}
				{m.TODAY()}
			{:else}
				{daysPassed} {writeDays(daysPassed)}
			{/if}
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

<Modal bind:showModal={showMessageModal}>
	<form class="flex w-full grow flex-col gap-2" use:enhance={async () => {
		sending = true;
		return async ({ update, result }) => {
			await update();

			if(result.type == 'failure') {
				alert(m.failedToSendMessage());
			}
			else {
				alert(m.messageSentSuccessfully());
			}

			sending = false;
			showMessageModal = false;
		}
	}} method="POST" action="?/sendMessage">
		{#if sending}
			<div class="flex flex-col grow w-full justify-center items-center animation-pulse">
				{m.sendingMessage()}
			</div>
		{:else}
		<h2 class="text-2xl">{m.leaveAMessage()}</h2>
		<textarea name="message" class="text-input {darkMode.getLightBackground()} placeholder:opacity-50" placeholder={m.enterMessageHere()}></textarea>
		<button class="group {darkMode.getAccentColor()} text-neutral-100 button-primary hover:text-white active:bg-orange-700">
			<i class="ri-send-plane-line group-hover:hidden"></i>
			<i class="ri-send-plane-fill not-group-hover:hidden"></i>
			{m.sendMessage()}
		</button>
		{/if}
	</form>
</Modal>
