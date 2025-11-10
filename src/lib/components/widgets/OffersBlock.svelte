<script>
	import { t } from '$lib/translations/translations';
	import Image from '../ui/Image.svelte';
	import ScrollableSection from '../ui/ScrollableSection.svelte';

	const offers = [
		{
			img: 'https://cdn.create.vista.com/downloads/a8b6e640-d047-45da-9b80-9728945ade97_1024s.jpeg'
		},
		{ img: 'https://images.template.net/390494/Car-Wash-Coupon-Template-edit-onlines.png' }
	];
</script>

<ScrollableSection
	header={$t('common.specialOffers')}
	noItemsText={$t('common.noSpecialOffersAvaliable')}
	items={offers}
>
	{#snippet itemRenderer(offer)}
		<Image src={offer.img} alt="Special offer" />
		<!-- <img src={offer.img} alt="Offer" class="ratioaspect-video" /> -->
	{/snippet}
</ScrollableSection>
