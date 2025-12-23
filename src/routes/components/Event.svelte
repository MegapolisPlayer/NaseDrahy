<script lang="ts">
	import { m } from "$lib/paraglide/messages";
	import type { EventType } from "$lib/types";

	let {
		event
	}: {
		event: EventType
	} = $props();
</script>

<div class="flex flex-row w-full grow shadow-lg">
	{JSON.stringify(event)}	
</div>