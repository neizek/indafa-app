<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';
	import Item from '$lib/components/ui/Item.svelte';
	import { getCustomerData } from '$lib/helpers/auth';
	import { Mail, Phone, User } from '@lucide/svelte';

	let { userId }: { userId: string } = $props();
	const customer = getCustomerData(userId);
</script>

<div>
	{#await customer}
		<div class="w-full space-y-2">
			<div class="placeholder animate-pulse"></div>
			<div class="placeholder animate-pulse"></div>
			<div class="placeholder animate-pulse"></div>
		</div>
	{:then customer}
		<div class="flex flex-col gap-2">
			<Item icon={User} label="{customer.firstname} {customer.lastname}" />
			<Item icon={Mail} label={customer.email} />
			<div class="mt-2">
				<Button icon={Phone} label={customer.phone ?? 'Позвонить'} full />
			</div>
		</div>
	{/await}
</div>
