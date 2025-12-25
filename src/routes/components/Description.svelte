<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { darkMode } from '$lib/index.svelte';
</script>

<div class="flex flex-col max-lg:w-full lg:w-4/6 {darkMode.getBackgroundColor()}  rounded-2xl p-5">
	<h2 class="text-2xl font-medium">
		{m.whyDoesThisConstantlyHappenAndHowToFixIt()}
	</h2>
</div>
