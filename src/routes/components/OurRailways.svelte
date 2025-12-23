<script lang="ts">
	import { m } from "$lib/paraglide/messages";
	import { onDestroy, onMount } from "svelte";

	let interval: NodeJS.Timeout | undefined = $state(undefined);

	let messages = $state([
		m.favourite(),
		m.beloved(),
		m.reliable(),
		m.punctual(),
		m.predictable(),
		m.extravagant(),
		m.elegant(),
		m.czech(),
	]);
	let id = $state(0);

	onMount(() => {
		interval = setInterval(() => {
			id++;
			if(id >= messages.length) {
				id = 0;
			}
		}, 1000);
	})

	onDestroy(() => {
		clearInterval(interval);
	})
</script>

<div class="flex flex-row gap-1 font-medium">
	<span>
		{m.our()} 
	</span>
	<span class="font-bold text-amber-500">
		{messages[id]}
	</span>
	<span>
		{m.railways()}
	</span>
</div>