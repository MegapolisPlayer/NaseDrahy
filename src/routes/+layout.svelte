<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import 'remixicon/fonts/remixicon.css';
	
	let { children } = $props();
</script>

<svelte:head>
	<title></title>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="flex flex-col min-w-screen max-w-screen min-h-screen grow justify-center items-center">
	{@render children()}
</div>
