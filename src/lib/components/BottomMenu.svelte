<script lang="ts">
	import { goto } from '$app/navigation';
	import { createPopUp } from '$lib/stores/popUp';
	import { UserIcon, Settings, House, Map } from '@lucide/svelte';
	import SettingsForm from '$lib/components/widgets/SettingsForm.svelte';
	import { t } from '$lib/translations';

	const menu = [
		{ icon: House, action: () => goto('/'), label: 'common.home' },
		{ icon: UserIcon, action: () => goto('/user/profile'), label: 'common.profile' },
		{ icon: Map, action: () => goto('/map'), label: 'common.map' },
		{ icon: Settings, action: () => createSettingsPopup(), label: 'common.settings' }
	];

	function createSettingsPopup() {
		createPopUp({
			title: 'common.settings',
			content: {
				component: SettingsForm,
				props: {}
			},
			icon: Settings
		});
	}
</script>

<div
	class="preset-glass-surface fixed right-0 bottom-0 left-0 mx-auto mb-4 w-full max-w-sm space-y-4 card"
>
	<div class="flex items-center justify-around gap-4 px-3">
		{#each menu as { icon, action, label }}
			<button class="flex flex-col items-center p-3" on:click={action}>
				<svelte:component this={icon} class="size-6" />
				<span class="text-xs">{$t(label)}</span>
			</button>
		{/each}
	</div>
</div>
