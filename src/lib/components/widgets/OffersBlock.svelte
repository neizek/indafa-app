<script lang="ts">
	import { getOffers } from '$lib/helpers/offers';
	import { t } from '$lib/translations/translations';
	import { onMount } from 'svelte';
	import Image from '../ui/Image.svelte';
	import ScrollableSection from '../ui/ScrollableSection.svelte';

	let offers: { url: string }[] = [{ url: '' }];

	onMount(() => {
		getOffers().then((data) => {
			offers = data;
		});
	});
</script>

<ScrollableSection
	header={$t('common.specialOffers')}
	noItemsText={$t('common.noSpecialOffersAvaliable')}
	items={offers}
>
	{#snippet itemRenderer(offer)}
		<Image src={offer.url} alt="Special offer" />
	{/snippet}
</ScrollableSection>
