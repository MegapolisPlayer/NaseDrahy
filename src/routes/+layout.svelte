<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import 'remixicon/fonts/remixicon.css';
	import { m } from '$lib/paraglide/messages';
	import Bottombar from './components/Bottombar.svelte';
	import Topbar from './components/Topbar.svelte';
	import { onMount } from 'svelte';
	import { darkMode } from '$lib/index.svelte';

	let { children, data } = $props();

	let ready = $state(false);
	onMount(() => {
		ready = true;

		darkMode.setMode(data.dark);
	});
</script>

<svelte:head>
	<title>
		{m.ourRailwaysDotDotDot()}
	</title>
	<link rel="icon" href={favicon} />
</svelte:head>

{#key ready}
	{#if ready}
		<div
			class="relative flex min-h-screen max-w-screen min-w-screen grow flex-col items-center justify-center gap-0 overflow-hidden bg-[url('/pozadi.jpg')] bg-cover bg-fixed"
		>
			<div
				class="absolute top-0 left-0 z-1 h-full w-full {darkMode.getBackgroundCoverColor()}"
			></div>

			<Topbar />
			<div class="z-2 flex w-full grow flex-col">
				{@render children()}
			</div>
			<Bottombar />
		</div>
	{/if}
{/key}
