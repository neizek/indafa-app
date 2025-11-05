<script>
	import Button from '$lib/components/ui/Button.svelte';
	import Section from '$lib/components/ui/Section.svelte';
	import { user } from '$lib/stores/auth';
	import { Pen } from '@lucide/svelte';
</script>

<Section header="User Profile">
	{#snippet controls()}
		<Button label="Edit" preset="tonal" onclick={() => {}}>
			<Pen size={20} />
		</Button>
	{/snippet}
	<p>Name: {$user?.user_metadata.display_name}</p>
	<p>Email: {$user?.email}</p>
</Section>
