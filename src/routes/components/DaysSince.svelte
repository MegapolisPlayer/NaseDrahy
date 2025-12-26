<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import type { EventType } from '$lib/types';
	import { fly } from 'svelte/transition';
	import Modal from './Modal.svelte';
	import { darkMode } from '$lib/index.svelte';
	import { enhance } from '$app/forms';
	import { DAYS_MS, writeDays, MAX_CONTENT_LENGTH } from '$lib';

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

	let messageContent = $state('');
</script>

<div
	class="flex flex-col rounded-2xl max-lg:gap-2 lg:gap-6 {darkMode.getBackgroundColor()}  p-5 max-lg:w-9/10 lg:w-4/6"
	in:fly|global={{ duration: 1000, delay: 500, x: 500, y: 0, opacity: 0 }}
>
	{#if events.length === 0}
		<div class="flex w-full grow flex-col items-center justify-center max-lg:text-lg lg:text-xl">
			{m.noExtraordinaryEventsDotDotDotYet()}
		</div>
	{:else}
		<h2 class="max-lg:lg font-medium lg:text-2xl">
			{#if daysPassed == 0}
				{m.lastExtraordinaryEventHappened()}
			{:else}
				{m.daysSinceLastExtraordinaryEvent()}
			{/if}
		</h2>
		<h1
			class="flex w-full grow flex-col items-center justify-center font-medium max-lg:text-center max-lg:text-6xl lg:text-9xl"
		>
			{#if daysPassed == 0}
				{m.TODAY()}
			{:else}
				{daysPassed} {writeDays(daysPassed)}
			{/if}
		</h1>
	{/if}
	<div
		class="flex w-full gap-2 max-lg:flex-col max-lg:justify-center max-lg:text-sm lg:flex-row lg:items-center"
	>
		<div class="grow max-lg:hidden"></div>
		<div class="">
			{m.didWeNotNoticeAnEvent()}
		</div>
		<div class="flex flex-row max-lg:w-full">
			<div class="grow lg:hidden"></div>
			<button
				class="group {darkMode.getAccentColor()} button-primary text-neutral-100 hover:text-neutral-100 active:bg-orange-700"
				onclick={() => (showMessageModal = true)}
			>
				<i class="ri-send-plane-line group-hover:hidden"></i>
				<i class="ri-send-plane-fill not-group-hover:hidden"></i>
				{m.leaveAMessage()}
			</button>
		</div>
	</div>
</div>

<Modal bind:showModal={showMessageModal}>
	<form
		class="flex w-full grow flex-col gap-2"
		use:enhance={async () => {
			sending = true;
			return async ({ update, result }) => {
				await update();

				if (result.type == 'failure') {
					alert(m.failedToSendMessage());
				} else {
					alert(m.messageSentSuccessfully());
				}

				sending = false;
				showMessageModal = false;
			};
		}}
		method="POST"
		action="?/sendMessage"
	>
		{#if sending}
			<div class="animation-pulse flex w-full grow flex-col items-center justify-center">
				{m.sendingMessage()}
			</div>
		{:else}
			<h2 class="max-lg:text-lg lg:text-2xl">{m.leaveAMessage()}</h2>
			<span class="relative flex w-full flex-col">
				<textarea
					name="message"
					class="text-input {darkMode.getLightBackground()} placeholder:opacity-50"
					placeholder={m.enterMessageHere()}
					bind:value={messageContent}
				></textarea>
				<div
					class="absolute right-2 bottom-2 z-20 font-medium {messageContent.length >
					MAX_CONTENT_LENGTH
						? 'text-red-700!'
						: 'text-green-500!'}"
				>
					{messageContent.length}/{MAX_CONTENT_LENGTH}
				</div>
			</span>
			<button
				class="
					group {darkMode.getAccentColor()} button-primary text-neutral-100 hover:text-neutral-100 active:bg-orange-700
					disabled:opacity-50 disabled:brightness-50
					"
				disabled={messageContent.length > MAX_CONTENT_LENGTH}
			>
				<i class="ri-send-plane-line group-hover:hidden"></i>
				<i class="ri-send-plane-fill not-group-hover:hidden"></i>
				{m.sendMessage()}
			</button>
		{/if}
	</form>
</Modal>
