<script lang="ts">
	import '../mapbox.css';
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import BottomMenu from '$lib/components/widgets/BottomMenu.svelte';
	import PopUp from '$lib/components/widgets/PopUp.svelte';
	import { beforeNavigate } from '$app/navigation';
	import { previousUrl } from '$lib/stores/navigation';
	import Toaster from '$lib/components/ui/Toaster.svelte';
	import type { Route } from '$lib/constants/routes';

	let { children } = $props();

	let historyNavigation = false;

	beforeNavigate(({ type, from }) => {
		historyNavigation = type === 'popstate';
		previousUrl.set(from?.url.pathname as Route);
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<PopUp />
<Toaster />

<div class="flex min-h-dvh flex-col gap-4 p-4 pb-30">
	{@render children()}
</div>

<BottomMenu />
