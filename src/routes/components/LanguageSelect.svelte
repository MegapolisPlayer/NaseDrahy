<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { setLocale, getLocale, locales } from '$lib/paraglide/runtime';
</script>

<div class="flex flex-row gap-1">
	<div class="grow lg:hidden"></div>
	<span class="max-lg:hidden">
		<i class="ri-translate-2"></i>
		{m.selectLanguage()}:
	</span>
	{#each locales as locale, i (i)}
		<button
			class={getLocale() == locale ? 'text-orange-500!' : ''}
			onclick={() => {
				setLocale(locale);
			}}
		>
			{m.languageName({}, { locale: locale })}
		</button>
	{/each}
</div>
