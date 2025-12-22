<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import 'remixicon/fonts/remixicon.css';
	import { m } from '$lib/paraglide/messages';
	import Bottombar from './components/Bottombar.svelte';
	import Topbar from './components/Topbar.svelte';
	import Disclaimerbar from './components/Disclaimerbar.svelte';
	
	let { children } = $props();
</script>

<svelte:head>
	<title>
		{m.ourRailwaysDotDotDot()}
	</title>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="relative bg-[url('/pozadi.jpg')] bg-cover bg-fixed flex flex-col min-w-screen max-w-screen min-h-screen grow justify-center items-center">
	<div class="bg-white/70 absolute top-0 left-0 w-full h-full z-1"></div>
	
	<Topbar />
	<div class="flex flex-col grow w-full z-2">
		{@render children()}
	</div>
	<Bottombar />
	<Disclaimerbar />
</div>
