<script lang="ts">
	import { ClockPlus } from '@lucide/svelte';
	import { t } from '$lib/translations';
	import { goto } from '$app/navigation';
	import Button from '$lib/components/ui/Button.svelte';
	import IndafaLogo from '$lib/assets/indafa.svg?raw';
</script>

<div class="flex h-full flex-1 flex-col items-center justify-between">
	<div class="h-auto w-full p-2">
		{@html IndafaLogo}
	</div>
	<Button label={$t('common.makeAnAppointment')} onclick={() => goto('/appointment')}>
		<ClockPlus />
	</Button>
</div>
