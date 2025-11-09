<script lang="ts">
	import { goto } from '$app/navigation';
	import { sendOTP, verifyOTP } from '$lib/helpers/auth';
	import z from 'zod';
	import Button from '../ui/Button.svelte';
	import FormItem from '../ui/FormItem.svelte';
	import Input from '../ui/Input.svelte';
	import { validator } from '@felte/validator-zod';
	import { createForm } from 'felte';
	import { Check } from '@lucide/svelte';
	import Form from '../ui/Form.svelte';
	import { onMount } from 'svelte';
	import { t } from '$lib/translations/translations';

	let { input, verificationType, closePopUp } = $props();

	let isLoading: boolean = $state(false);
	// let isDisabled: boolean = $state(true);
	// let timer: number = 6000;
	let countdown = $state(0);
	let isDisabled = $derived(countdown > 0);
	let intervalId: ReturnType<typeof setInterval> | null = null;

	const schema = z.object({
		otp: z.string().length(6, 'Code must consist of 6 digits')
	});

	const { form, errors, data } = createForm({
		extend: validator({ schema }),
		onSubmit: (values) => {
			isLoading = true;

			verifyOTP(verificationType, input, values.otp)
				.then(() => {
					closePopUp();
				})
				.finally(() => {
					isLoading = false;
				});
		}
	});

	function onResend() {
		startCountdown();
	}

	function startCountdown() {
		countdown = 60;

		intervalId = setInterval(() => {
			countdown--;

			if (countdown <= 0) {
				clearInterval(intervalId!);
				intervalId = null;
			}
		}, 1000);
	}

	startCountdown();
</script>

<Form {form}>
	<FormItem label={$t('common.verificationCode')}>
		<Input
			type="text"
			inputmode="numeric"
			placeholder={$t('common.enterSixDigitCode')}
			bind:value={$data.otp}
		/>
	</FormItem>
	<div class="mt-4 flex flex-col gap-2">
		<Button type="submit" label={$t('common.submitCode')} icon={Check} {isLoading} full />
		<Button
			preset="ghost"
			label={`${$t('common.didntReceiveResend')} ${countdown} s`}
			full
			disabled={isDisabled}
			onclick={onResend}
		/>
	</div>
</Form>
