<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';
	import FormItem from '$lib/components/ui/FormItem.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import { openOTPVerificationPopUp, sendOTP } from '$lib/helpers/auth';
	import z from 'zod';
	import Form from '../ui/Form.svelte';
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-zod';
	import { LogIn } from '@lucide/svelte';
	import Selector from '../ui/Selector.svelte';
	import type { VerificationType } from '$lib/types/auth';

	let { closePopUp } = $props();
	let isLoading: boolean = $state(false);
	let signInWay: VerificationType = $state('email');

	const phoneRegex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/;

	const schema = z.discriminatedUnion('type', [
		z.object({
			type: z.literal('email'),
			email: z.string().email()
		}),
		z.object({
			type: z.literal('phone'),
			phone: z.string().regex(phoneRegex, 'Enter a valid phone number')
		})
	]);

	const { form, errors, data } = createForm({
		extend: validator({ schema }),
		onSubmit: (values) => {
			isLoading = true;

			const input = values.type === 'email' ? values.email : values.phone;
			sendOTP(values.type, input)
				.then(() => {
					closePopUp();
					openOTPVerificationPopUp(input, values.type);
				})
				.finally(() => {
					isLoading = false;
				});
		}
	});

	const signInOptions = [
		{ value: 'phone', label: 'Mobile phone' },
		{ value: 'email', label: 'Email' }
	];

	$effect(() => {
		$data.type = signInWay;
	});
</script>

<span>Use this form to sign in your account on Indafa</span>
<FormItem label="Choose your sign in way">
	<Selector options={signInOptions} bind:value={signInWay} />
</FormItem>
<Form {form}>
	{#if signInWay === 'email'}
		<FormItem label="Email" errors={$errors.email}>
			<Input type="email" placeholder="janis.berzins@gmail.com" bind:value={$data.email} />
		</FormItem>
	{:else if signInWay === 'phone'}
		<FormItem label="Phone" errors={$errors.phone}>
			<Input type="tel" inputmode="tel" placeholder="+371 26972159" bind:value={$data.phone} />
		</FormItem>
	{/if}
	<div class="mt-4">
		<Button type="submit" label="Login" {isLoading} icon={LogIn} full />
	</div>
</Form>
