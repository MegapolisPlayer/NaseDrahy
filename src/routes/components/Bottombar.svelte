<script lang="ts">
	import { m } from '$lib/paraglide/messages';
</script>

<div
	class="z-10 flex gap-2 rounded-t-2xl bg-white p-2 pb-0! ps-5! pe-5! max-lg:w-full max-lg:flex-col lg:w-4/6 lg:flex-row"
>
	© Martin Bykov, Juraj Křivda 2025
	<div class="max-lg:hidden lg:grow"></div>
	<a href="https://martinbykov.eu">
		<i class="ri-pages-fill"></i>
		{m.authorsWebsite()}
	</a>
	<a href="https://kukiweb.cz">
		<i class="ri-smartphone-fill"></i>
		{m.widgetAuthorsWebsite()}
	</a>
	<a
		href="https://commons.wikimedia.org/wiki/File:Roudnice_nad_Labem_n%C3%A1dra%C5%BE%C3%AD.1_(2025).jpg"
	>
		<i class="ri ri-image-fill"></i>
		{m.linkToPictureSource()}
	</a>
</div>
