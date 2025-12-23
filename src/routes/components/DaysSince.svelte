<script lang="ts">
	import { m } from "$lib/paraglide/messages";
	import type { EventType } from "$lib/types";

	let {
		event
	}: {
		event: EventType
	} = $props();
</script>

<div class="max-lg:w-full lg:w-4/6 flex flex-col bg-white p-5 rounded-2xl">
	<h2 class="text-2xl font-medium">
		{m.daysSinceLastExtraordinaryEvent()}
	</h2>
	<div class="flex flex-col w-full justify-center items-center grow text-9xl font-medium">
		{m.TODAY()}
	</div>
	<div class="flex flex-row w-full gap-2">
		<div class="grow"></div>
		<div>
			{m.didWeNotNoticeAnEvent()}
		</div>
		<div>
			{m.leaveAMessage()}
		</div>
	</div>
</div>