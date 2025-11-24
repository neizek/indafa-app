<script lang="ts">
	import '../mapbox.css';
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import BottomMenu from '$lib/components/widgets/BottomMenu.svelte';
	import PopUp from '$lib/components/widgets/PopUp.svelte';
	import { beforeNavigate, goto } from '$app/navigation';
	import { previousUrl } from '$lib/stores/navigation';
	import Toaster from '$lib/components/ui/Toaster.svelte';
	import type { Route } from '$lib/constants/routes';
	import { closeAllPopUps } from '$lib/stores/popUp';
	import { onMount } from 'svelte';
	import { page } from '$app/state';

	let { children } = $props();

	let historyNavigation = false;

	beforeNavigate(({ type, from }) => {
		historyNavigation = type === 'popstate';
		previousUrl.set(from?.url.pathname as Route);
		closeAllPopUps();
	});

	onMount(() => {
		if (page.url.pathname !== '/') {
			goto('/');
		}
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<PopUp />
<Toaster />

<div class="m-auto flex min-h-dvh max-w-xl flex-col gap-4 self-center p-4 pb-30">
	{@render children()}
</div>

<BottomMenu />
