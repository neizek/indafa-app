<script>
	import Button from '$lib/components/ui/Button.svelte';
	import Section from '$lib/components/ui/Section.svelte';
	import { t } from '$lib/translations/translations';
	import { BadgePercent } from '@lucide/svelte';

	const controls = [{ label: 'Users', href: '/admin/dashboard/users' }];
</script>

<Section header="Stats">
	<Button icon={BadgePercent} label={$t('common.specialOffers')} />
</Section>
