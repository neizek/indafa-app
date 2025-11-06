<script lang="ts">
	import { goto } from '$app/navigation';
	import { verifyOTP } from '$lib/helpers/auth';
	import z from 'zod';
	import Button from '../ui/Button.svelte';
	import FormItem from '../ui/FormItem.svelte';
	import Input from '../ui/Input.svelte';
	import { validator } from '@felte/validator-zod';
	import { createForm } from 'felte';
	import { Check } from '@lucide/svelte';
	import Form from '../ui/Form.svelte';

	let { email, closePopUp } = $props();

	let isLoading: boolean = $state(false);

	const schema = z.object({
		otp: z.string().length(6, 'Code must consist of 6 digits')
	});

	const { form, errors, data } = createForm({
		extend: validator({ schema }),
		onSubmit: (values) => {
			isLoading = true;

			verifyOTP(email, values.otp)
				.then(() => {
					closePopUp();
					goto('/');
				})
				.finally(() => {
					isLoading = false;
				});
		}
	});
</script>

<Form {form}>
	<FormItem label="Verification code">
		<Input
			type="text"
			inputmode="numeric"
			placeholder="Enter 6-digit code"
			bind:value={$data.otp}
		/>
	</FormItem>
	<div class="mt-4 flex flex-col gap-2">
		<Button type="submit" label="Submit code" icon={Check} full />
		<Button preset="tonal" label="Didn't receive code? Resend" full {isLoading} />
	</div>
</Form>
