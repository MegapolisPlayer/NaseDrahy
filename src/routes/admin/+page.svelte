<script lang="ts">
	import { enhance } from '$app/forms';
	import { darkMode } from '$lib/index.svelte';
	import type { EventTypeInput } from '$lib/types.js';
	import InputSection from './components/InputSection.svelte';
	import SendSection from './components/SendSection.svelte';

	let { data } = $props();

	let apiKey = $derived(data.railwaysPageAPIKey);
	let testApiKey = $derived(data.railwaysPageAPIKey);
	let testUuidDelete = $state('');

	//for each field in EventType except UUID
	let testEventName = $state('');
	let testEventDay = $state(0);
	let testEventMonth = $state(0);
	let testEventYear = $state(0);
	let testEventDesc = $state('');
	let testEventLocation = $state('');

	let eventObject: EventTypeInput = $derived({
		name: testEventName,
		day: testEventDay,
		month: testEventMonth,
		year: testEventYear,
		description: testEventDesc,
		city: testEventLocation
	});
	let deletionObject = $derived({
		uuid: testUuidDelete
	})

	let response = $state('No response yet.');
</script>

<div
	class="flex w-full grow flex-col gap-5 *:w-4/6 {darkMode.getBackgroundColorChildren()} items-center p-5 *:flex *:flex-col *:gap-2 *:rounded-2xl *:p-5 *:shadow-lg"
>
	<form
		class="button-primary flex-row! items-center!"
		method="post"
		use:enhance
		action="?/updateAPIKey"
	>
		<h2 class="text-xl">API key</h2>
		<input
			class="text-input {darkMode.getLightBackground()}"
			name="key"
			type="text"
			bind:value={apiKey}
			required
		/>
		<button
			type="button"
			onclick={() => {
				apiKey = crypto.randomUUID();
			}}
			class="button-primary {darkMode.getAccentColor()} {darkMode.getAccentColorBackground()}"
		>
			Generate new
		</button>
		<button
			type="button"
			onclick={() => {
				apiKey = data.railwaysPageAPIKey;
			}}
			class="button-primary {darkMode.getAccentColor()} {darkMode.getAccentColorBackground()}"
		>
			Get true value
		</button>
		<button
			class="button-primary {darkMode.getAccentColor()} {darkMode.getAccentColorBackground()}"
		>
			Update
		</button>
	</form>

	<div class="grid! grid-cols-3! *:flex *:flex-row *:items-center *:gap-2">
		<SendSection dest={'/api/get/'} {testApiKey} bind:response />
		<SendSection dest={'/api/roudnice/'} {testApiKey} bind:response />
		<SendSection dest={'/api/last/'} {testApiKey} bind:response />
		<SendSection dest={'/api/add/'} {testApiKey} bind:response object={eventObject} />
		<SendSection dest={'/api/delete/'} {testApiKey} bind:response object={deletionObject} />
	</div>
	<div class="*:flex *:flex-row *:items-center *:gap-2">
		<h2 class="text-xl">Input</h2>

		<!-- Test API key -->
		<InputSection label="Test API key" type="text" bind:value={testApiKey}>
			<button
				type="button"
				onclick={() => {
					testApiKey = data.railwaysPageAPIKey;
				}}
				class="button-primary {darkMode.getAccentColor()} {darkMode.getAccentColorBackground()}"
			>
				Use correct
			</button>
		</InputSection>

		<h2 class="text-lg italic">For POST api/delete/</h2>
		<InputSection label="UUID of event to delete" type="text" bind:value={testUuidDelete} />

		<h2 class="text-lg italic">For POST api/add/</h2>
		<InputSection label="Event Name" type="text" bind:value={testEventName} />
		<InputSection label="Event Day" type="text" bind:value={testEventDay} />
		<InputSection label="Event Month" type="text" bind:value={testEventMonth} />
		<InputSection label="Event Year" type="number" bind:value={testEventYear} />
		<InputSection label="Event description" type="text" bind:value={testEventDesc} />
		<InputSection label="Event location" type="text" bind:value={testEventLocation} />
	</div>
	<div>
		<h2 class="text-xl">Response</h2>
		<div class="text-input {darkMode.getLightBackground()}">
			{response}
		</div>
	</div>
</div>
