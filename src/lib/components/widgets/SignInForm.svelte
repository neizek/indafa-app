<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';
	import FormItem from '$lib/components/ui/FormItem.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import { sendOTP } from '$lib/helpers/auth';
	import z from 'zod';
	import Form from '../ui/Form.svelte';
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-zod';
	import { LogIn } from '@lucide/svelte';

	let { email = $bindable(), onLogin } = $props();
	let isLoading: boolean = $state(false);

	const schema = z.object({
		email: z.string().email()
	});

	const { form, errors, data } = createForm({
		extend: validator({ schema }),
		onSubmit: (values) => {
			isLoading = true;

			sendOTP(values.email)
				.then(() => {
					email = values.email;
					onLogin();
				})
				.finally(() => {
					isLoading = false;
				});
		}
	});
</script>

<Form {form}>
	<span>Use this form to sign in your account on Indafa</span>
	<FormItem label="Email" errors={$errors.email}>
		<Input type="email" placeholder="janis.berzins@gmail.com" bind:value={$data.email} />
	</FormItem>
	<div class="mt-4">
		<Button type="submit" label="Login" {isLoading} icon={LogIn} full />
	</div>
</Form>
