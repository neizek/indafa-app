<script lang="ts">
	import { goto } from '$app/navigation';
	import Selector from '$lib/components/ui/Selector.svelte';
	import { ROUTES } from '$lib/constants/routes';
	import { ChartNoAxesColumn, ClipboardClock } from '@lucide/svelte';
	let { children } = $props();

	const menuOptions = [
		{ label: 'common.stats', icon: ChartNoAxesColumn, value: ROUTES.ADMIN.DASHBOARD },
		{ label: 'common.appointments', icon: ClipboardClock, value: ROUTES.ADMIN.APPOINTMENTS }
	];

	let selectedOption = $state(undefined);

	function onChange() {
		if (selectedOption) goto(selectedOption);
	}
</script>

<Selector options={menuOptions} bind:value={selectedOption} onchange={onChange} />

{@render children()}
