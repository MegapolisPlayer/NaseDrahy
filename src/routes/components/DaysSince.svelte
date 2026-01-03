<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import type { EventType } from '$lib/types';
	import { fly } from 'svelte/transition';
	import { darkMode } from '$lib/index.svelte';
	import { DAYS_MS, writeDays } from '$lib';
	import MessageSendModal from './MessageSendModal.svelte';

	let {
		events,
		canSendMessages
	}: {
		events: EventType[];
		canSendMessages: boolean;
	} = $props();

	let showMessageModal = $state(false);
	let lastEventTime = $derived.by(() => {
		if (events.length == 0) return new Date();
		return new Date(events[0].year, events[0].month - 1, events[0].day);
	});
	let daysPassed = $derived(Math.trunc((Date.now() - lastEventTime.getTime()) / DAYS_MS));
</script>

<div
	class="
		flex flex-col rounded-2xl max-lg:gap-2 lg:gap-6 {darkMode.getBackgroundColor()}  p-5 max-lg:w-9/10 lg:w-4/6
		hoverable
	"
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
		<h3 class="w-full text-center">
			<!-- haha funny messages -->
			{#if daysPassed < 0}
				{m.theWebsiteAdministratorProbablyConsumedSomeSubstances()}
			{:else if daysPassed == 0}
				{m.thisWasToBeExpected()}.
			{:else if daysPassed <= 2}
				{m.whenWillItHappenToday()}
			{:else if daysPassed <= 7}
				{m.aBitWierdIsntIt()}
			{:else if daysPassed <= 14}
				{m.unbelievableButTrue()}
			{:else if daysPassed <= 28}
				{m.thisGoesIntoTheYearlyReport()}
			{:else}
				<span class="font-bold">
					{m.completelyBonkers()}
				</span>
			{/if}
		</h3>
	{/if}
	<div
		class="flex w-full gap-2 max-lg:flex-col max-lg:justify-center max-lg:text-sm lg:flex-row lg:items-center"
	>
		{#if canSendMessages}
			<div class="grow max-lg:hidden"></div>
			<div class="">
				{m.didWeNotNoticeAnEvent()}
			</div>
			<div class="flex flex-row max-lg:w-full">
				<div class="grow lg:hidden"></div>
				<button
					class="group {darkMode.getAccentColor()} font-medium button-primary text-neutral-100 hover:text-neutral-100 active:bg-orange-700"
					onclick={() => (showMessageModal = true)}
				>
					<i class="ri-send-plane-line group-hover:hidden"></i>
					<i class="ri-send-plane-fill not-group-hover:hidden"></i>
					{m.leaveAMessage()}
				</button>
			</div>
		{/if}
	</div>
</div>

{#if canSendMessages}
	<MessageSendModal bind:showMessageModal />
{/if}
