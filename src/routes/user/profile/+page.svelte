<script lang="ts">
	import { Tabs } from '@skeletonlabs/skeleton-svelte';
	import UserProfileCard from './UserProfileCard.svelte';
	import UserVehiclesCard from './UserVehiclesCard.svelte';
	import UserAppointments from './UserAppointments.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { UserLock } from '@lucide/svelte';
	import { goto } from '$app/navigation';
	import { ROUTES } from '$lib/constants/routes';
</script>

<Tabs defaultValue="tab-1">
	<Tabs.List>
		<Tabs.Trigger value="tab-1">Profile</Tabs.Trigger>
		<Tabs.Trigger value="tab-2">Appointments</Tabs.Trigger>
		<Tabs.Indicator />
	</Tabs.List>
	<Tabs.Content value="tab-1">
		<div class="flex flex-col gap-4">
			<UserProfileCard />
			<UserVehiclesCard />
			<Button
				preset="tonal"
				icon={UserLock}
				label="Worker's dashboard"
				onclick={() => goto(ROUTES.OPERATOR)}
			/>
		</div>
	</Tabs.Content>
	<Tabs.Content value="tab-2">
		<UserAppointments />
	</Tabs.Content>
</Tabs>
