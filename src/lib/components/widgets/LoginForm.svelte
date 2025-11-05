<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';
	import FormItem from '$lib/components/ui/FormItem.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import { sendOTP } from '$lib/helpers/auth';

	// let email = $state('');
	let { email = $bindable(), onLogin } = $props();

	async function handleLogin() {
		sendOTP(email).then((response) => {
			onLogin();
			console.log('OTP sent:', response);
		});
	}
</script>

<FormItem label="Email">
	<Input type="email" placeholder="Email" bind:value={email} />
</FormItem>
<Button label="Login" onclick={handleLogin} />
