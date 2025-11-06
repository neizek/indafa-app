<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/ui/Button.svelte';
	import FormItem from '$lib/components/ui/FormItem.svelte';
	import Section from '$lib/components/ui/Section.svelte';
	import EditProfileForm from '$lib/components/widgets/EditProfileForm.svelte';
	import { signOut } from '$lib/helpers/auth';
	import { user } from '$lib/stores/auth';
	import { createPopUp } from '$lib/stores/popUp';
	import { LogOut, Pen } from '@lucide/svelte';

	let isLoading: boolean = $state(false);

	function createEditProfilePopUp() {
		createPopUp({
			title: 'Edit user',
			icon: Pen,
			content: {
				component: EditProfileForm,
				props: {}
			}
		});
	}

	function onSignOut() {
		isLoading = true;

		signOut()
			.then(() => {
				goto('/');
			})
			.finally(() => {
				isLoading = false;
			});
	}

	console.log($user);
</script>

<Section header="User Profile">
	{#snippet controls()}
		<Button label="Edit" preset="tonal" icon={Pen} onclick={createEditProfilePopUp} />
	{/snippet}
	<FormItem label="First name">
		<span>{$user?.user_metadata.firstName} {$user?.user_metadata.lastName}</span>
	</FormItem>
	<FormItem label="Email">
		<span>{$user?.email}</span>
	</FormItem>
	<FormItem label="Phone">
		<span>{$user?.phone}</span>
	</FormItem>
	<Button preset="tonal" label="Sign out" icon={LogOut} onclick={onSignOut} {isLoading} />
</Section>
