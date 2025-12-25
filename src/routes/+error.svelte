<script lang="ts">
	import { page } from '$app/state';
	import { darkMode } from '$lib/index.svelte';
</script>

<div class="flex w-full grow flex-col items-center justify-center">
	<div class="rounded-2xl {darkMode.getBackgroundColor()} flex flex-col items-center gap-0 p-5">
		<span class="text-9xl font-medium">{page.status}</span>
		<span class="text-5xl">{page.error?.message}</span>
	</div>
</div>
