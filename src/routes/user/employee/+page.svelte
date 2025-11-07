<script lang="ts">
	import FormItem from '$lib/components/ui/FormItem.svelte';
	import Section from '$lib/components/ui/Section.svelte';
	import Selector from '$lib/components/ui/Selector.svelte';
	import { carWashes, carWashesOptions } from '$lib/stores/carWashes';

	let selectedCarWash = $carWashes[0].id;
</script>

<Section>
	<FormItem label="Select car wash">
		<Selector options={$carWashesOptions} bind:value={selectedCarWash} />
	</FormItem>
</Section>
