<script>
	import { openAddVehiclePopUp } from '$lib/helpers/vehicles';
	import vehiclesStore from '$lib/stores/vehicles';
	import { Plus } from '@lucide/svelte';
	import Button from '../ui/Button.svelte';
</script>

{#if $vehiclesStore && $vehiclesStore.length < 8}
	<Button label="Add car" onclick={openAddVehiclePopUp}><Plus /></Button>
{/if}
