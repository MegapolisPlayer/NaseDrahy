<script lang="ts">
	import DaysSince from "./components/DaysSince.svelte";
	import Description from "./components/Description.svelte";
	import Events from "./components/Events.svelte";
	import Widget from "./components/Widget.svelte";
</script>

<div class="flex flex-col w-full items-center grow gap-5 pt-5 *:shadow-lg">
	<DaysSince />

	<Widget />

	<!--<Description />  -->

	<Events />
</div>
