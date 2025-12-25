<script lang="ts">
	import DaysSince from "./components/DaysSince.svelte";
	import Description from "./components/Description.svelte";
	import Events from "./components/Events.svelte";
	import Widget from "./components/Widget.svelte";

	let { data } = $props();
</script>

<div class="flex flex-col w-full items-center grow gap-5 pt-5 pb-5 *:shadow-lg">
	<DaysSince events={data.events} />

	<Widget />

	<!--
		<Description />
	-->

	<Events events={data.events} />
</div>
