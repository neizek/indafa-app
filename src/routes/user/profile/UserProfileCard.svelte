<script lang="ts">
	import { goto } from '$app/navigation';
	import EditProfileForm from '$lib/components/forms/EditProfileForm.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import FormItem from '$lib/components/ui/FormItem.svelte';
	import Section from '$lib/components/ui/Section.svelte';
	import { ROUTES } from '$lib/constants/routes';
	import { createEditProfilePopUp, signOut } from '$lib/helpers/auth';
	import { user } from '$lib/stores/auth';
	import { createPopUp } from '$lib/stores/popUp';
	import { LogOut, Pen } from '@lucide/svelte';

	let isLoading: boolean = $state(false);

	function onSignOut() {
		isLoading = true;

		signOut()
			.then(() => {
				goto(ROUTES.HOME);
			})
			.finally(() => {
				isLoading = false;
			});
	}

	console.log($user?.phone);
</script>

<Section header="User Profile">
	{#snippet controls()}
		<Button label="Edit" preset="ghost" icon={Pen} onclick={createEditProfilePopUp} />
	{/snippet}
	<FormItem label="First name">
		<span>{$user?.user_metadata.firstName ?? 'No data'} {$user?.user_metadata.lastName}</span>
	</FormItem>
	<FormItem label="Email">
		<span>{!$user?.email || $user?.email === '' ? 'No data' : $user?.email}</span>
	</FormItem>
	<FormItem label="Phone">
		<span>{!$user?.phone || $user?.phone === '' ? 'No data' : $user?.phone}</span>
	</FormItem>
	<Button preset="tonal" label="Sign out" icon={LogOut} onclick={onSignOut} {isLoading} />
</Section>
