<script lang="ts">
	import { goto } from '$app/navigation';
	import { verifyOTP } from '$lib/helpers/auth';
	import Button from '../ui/Button.svelte';
	import FormItem from '../ui/FormItem.svelte';
	import Input from '../ui/Input.svelte';

	let { email } = $props();
	let otp = $state('');

	function handleOTP() {
		verifyOTP(email, otp).then((response) => {
			console.log('OTP verified:', response);
			goto('/');
		});
	}
</script>

<FormItem label="Verification code">
	<Input type="text" placeholder="Enter OTP" bind:value={otp} />
</FormItem>
<Button label="Confirm" onclick={handleOTP} />
<span>Didn't receive code? Resend</span>
