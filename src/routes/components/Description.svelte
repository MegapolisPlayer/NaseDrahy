<script lang="ts">
	import { m } from "$lib/paraglide/messages";
	import { darkMode } from "$lib/index.svelte";
</script>

<div class="max-lg:w-full lg:w-4/6 flex flex-col  {darkMode.getBackgroundColor()}  p-5 rounded-2xl">
	<h2 class="text-2xl font-medium">
		{m.whyDoesThisConstantlyHappenAndHowToFixIt()}
	</h2>
	
</div>