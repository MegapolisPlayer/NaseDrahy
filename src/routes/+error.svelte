<script lang="ts">
	import { page } from "$app/state";
	import { darkMode } from "$lib/index.svelte";
</script>

<div class="flex flex-col grow w-full justify-center items-center">
	<div class="rounded-2xl {darkMode.getBackgroundColor()} p-5 flex flex-col gap-0 items-center">
		<span class="text-9xl font-medium">{page.status}</span>
		<span class="text-5xl">{page.error?.message}</span>
	</div>
</div>