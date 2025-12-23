<script lang="ts">
	import { m } from '$lib/paraglide/messages';
</script>

<div class="flex flex-row rounded-2xl bg-orange-500 p-5 text-white max-lg:w-full lg:w-4/6">
	<div class="flex flex-col gap-0 justify-center">
		<h2 class="text-2xl font-medium">
			{m.wantToHaveAccessToTheCounterAnywhereEverywhere()}
		</h2>
		<p class="text-xl">
			{m.tryOurPhoneWidget()}
		</p>
	</div>
	<div class="grow"></div>
	<div class="flex flex-col items-center justify-center gap-0">
		<a
			href="https://kukiweb.cz/trwidget"
			class="group rounded-2xl bg-white p-5 text-xl font-medium text-orange-500 hover:bg-orange-600 hover:text-white active:bg-orange-700"
		>
			<i class="ri-download-line group-hover:hidden"></i>
			<i class="ri-download-fill not-group-hover:hidden"></i>
			{m.download()}
		</a>
	</div>
</div>
