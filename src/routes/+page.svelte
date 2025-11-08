<script lang="ts">
	import { ClockPlus } from '@lucide/svelte';
	import { t } from '$lib/translations';
	import { goto } from '$app/navigation';
	import Button from '$lib/components/ui/Button.svelte';
	import IndafaLogo from '$lib/assets/indafa.svg?raw';
	import OffersBlock from '$lib/components/widgets/OffersBlock.svelte';
	import AppointmentsBlock from '$lib/components/widgets/AppointmentsBlock.svelte';
</script>

<div class="h-auto w-full p-2 dark:invert">
	{@html IndafaLogo}
</div>
<OffersBlock />
<AppointmentsBlock />
<Button
	label={$t('common.makeAnAppointment')}
	icon={ClockPlus}
	onclick={() => goto('/appointment')}
/>
