<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { setLocale, getLocale } from '$lib/paraglide/runtime';
	import OurRailways from './OurRailways.svelte';
</script>

<div
	class="z-10 flex gap-2 rounded-b-2xl bg-white p-2 ps-5! pe-5! max-lg:w-full max-lg:flex-col lg:w-4/6 lg:flex-row"
>
	<OurRailways />
	<div class="max-lg:hidden lg:grow"></div>
	<span>
		<i class="ri-translate-2"></i>
		{m.selectLanguage()}:
	</span>
	<button
		class="{getLocale() == 'cs' ? "text-orange-500!" : ""}"
		onclick={() => {
			setLocale('cs');
		}}
	>
		{m.languageName({}, { locale: 'cs' })}
	</button>
	<button
		class="{getLocale() == 'en' ? "text-orange-500!" : ""}"
		onclick={() => {
			setLocale('en');
		}}
	>
		{m.languageName({}, { locale: 'en' })}
	</button>
	<button
		class="{getLocale() == 'pl' ? "text-orange-500!" : ""}"
		onclick={() => {
			setLocale('pl');
		}}
	>
		{m.languageName({}, { locale: 'pl' })}
	</button>
</div>
