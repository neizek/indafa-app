<script lang="ts">
	import SignInForm from '$lib/components/widgets/SignInForm.svelte';
	import OTPForm from '$lib/components/widgets/OTPForm.svelte';

	let { closePopUp } = $props();

	let email = $state('');
	let step = $state<'login' | 'otp'>('login');
</script>

{#if step === 'login'}
	<SignInForm bind:email onLogin={() => (step = 'otp')} />
{:else if step === 'otp'}
	<OTPForm {email} {closePopUp} />
{/if}
