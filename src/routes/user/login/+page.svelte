<script lang="ts">
	import { goto } from '$app/navigation';
	import LoginForm from '$lib/components/widgets/LoginForm.svelte';
	import OTPForm from '$lib/components/widgets/OTPForm.svelte';
	import { session } from '$lib/stores/auth';
	import { onMount } from 'svelte';

	let email = $state('');
	let step = $state<'login' | 'otp'>('login');

	onMount(() => {
		if (session) {
			goto('/user');
		}
	});
</script>

{#if step === 'login'}
	<LoginForm bind:email onLogin={() => (step = 'otp')} />
{:else if step === 'otp'}
	<OTPForm {email} />
{/if}
