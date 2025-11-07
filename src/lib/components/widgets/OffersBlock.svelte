<script>
	import ScrollableSection from '../ui/ScrollableSection.svelte';

	const offers = [
		{
			img: 'https://cdn.create.vista.com/downloads/a8b6e640-d047-45da-9b80-9728945ade97_1024.jpeg'
		},
		{ img: 'https://images.template.net/390494/Car-Wash-Coupon-Template-edit-online.png' }
	];
</script>

<ScrollableSection
	header="Special offers"
	noItemsText="No any special ads for the moment"
	items={offers}
>
	{#snippet itemRenderer(offer)}
		<img src={offer.img} alt="Offer" />
	{/snippet}
</ScrollableSection>
