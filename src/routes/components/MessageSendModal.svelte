<script lang="ts">
	import Modal from "./Modal.svelte";
	import { m } from "$lib/paraglide/messages";
	import { enhance } from "$app/forms";
	import { MAX_CONTENT_LENGTH } from "$lib";
	import { darkMode } from "$lib/index.svelte";

	let {
		showMessageModal = $bindable(false)
	}: {
		showMessageModal: boolean
	} = $props();

	let sending = $state(false);
	let messageContent = $state('');
</script>

<Modal bind:showModal={showMessageModal}>
	<form
		class="flex w-full grow flex-col gap-2 lg:min-w-[20svw] lg:min-h-[30svh] max-lg:min-w-[80svw] max-lg:min-h-[50svh]"
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
			<div class="relative flex w-full flex-col grow">
				<textarea
					name="message"
					class="text-input grow {darkMode.getLightBackground()} placeholder:opacity-50"
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
			</div>
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
