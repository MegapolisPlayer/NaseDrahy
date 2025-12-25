<script lang="ts">
	import { darkMode } from '$lib/index.svelte';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let { children, showModal = $bindable() } = $props();
	let dialog: HTMLDialogElement | undefined = $state();
	let clickable: HTMLDivElement | undefined = $state();

	onMount(() => {
		if (showModal) dialog?.showModal();
		else dialog?.close();
	});

	$effect(() => {
		if (showModal) dialog?.showModal();
		else dialog?.close();
	});
</script>

{#key showModal}
	<div class="absolute! m-0! h-0! w-0! p-0! *:bg-transparent">
		<dialog
			transition:fade|global={{ duration: 250 }}
			bind:this={dialog}
			onclose={() => (showModal = false)}
			onclick={(e) => {
				if (!clickable?.contains(e.target as Node)) dialog?.close();
			}}
			class="min-h-screen w-screen max-w-screen min-w-screen
		{darkMode.getBackdrop()}"
		>
			<div class="flex min-h-screen w-full grow flex-col items-center justify-center">
				<div
					bind:this={clickable}
					class="{darkMode.getBackgroundColor()} mt-5 mb-5 rounded-lg p-5 text-left max-lg:w-full lg:max-w-4/5
			"
				>
					{@render children?.()}
				</div>
			</div>
		</dialog>
	</div>
{/key}
