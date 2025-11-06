<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';
	import type { CarWash } from '$lib/types/carWashes';
	import { Phone } from '@lucide/svelte';
	import WorkingHours from './WorkingHours.svelte';

	let { carWash }: { carWash: CarWash } = $props();
</script>

<div class="flex flex-col gap-4 card">
	<WorkingHours workingHours={carWash.working_hours} />
	<div class="flex flex-col gap-2">
		<div class="flex gap-2">
			<Button
				label="Waze"
				preset="tonal"
				onclick={() => window.open(`tel:${carWash.phone}`)}
				full
			/>
			<Button
				label="Google Maps"
				preset="tonal"
				onclick={() => window.open(`tel:${carWash.phone}`)}
				full
			/>
		</div>
		<Button
			label="Piezvanit"
			icon={Phone}
			onclick={() => window.open(`tel:${carWash.phone}`)}
			full
		/>
	</div>
</div>
