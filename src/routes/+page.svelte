<script lang="ts">
	import DaysSince from './components/DaysSince.svelte';
	//import Description from './components/Description.svelte';
	import Events from './components/Events.svelte';
	import Widget from './components/Widget.svelte';

	let { data } = $props();
</script>

<div class="flex w-full grow flex-col items-center gap-5 pt-5 pb-5 *:shadow-lg">
	<DaysSince events={data.events} canSendMessages={data.canSendMessages} />

	<Widget />

	<!--
		<Description />
	-->

	<Events events={data.events} />
</div>
