<script lang="ts">
	import Selector from '$lib/components/ui/Selector.svelte';
	import { BadgePercent, ChartNoAxesColumn, ClipboardClock } from '@lucide/svelte';
	let { children } = $props();
	const menuOptions = [
		{ label: 'common.stats', icon: ChartNoAxesColumn, value: '1' },
		{ label: 'common.appointments', icon: ClipboardClock, value: '2' }
		// { label: 'common.specialOffers', icon: BadgePercent, value: '3' }
	];

	let selectedOption = $state(undefined);
</script>

<Selector options={menuOptions} bind:value={selectedOption} />

{@render children()}
