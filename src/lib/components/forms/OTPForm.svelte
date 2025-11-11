<script lang="ts">
	import { sendOTP, verifyOTP } from '$lib/helpers/auth';
	import z from 'zod';
	import Button from '../ui/Button.svelte';
	import FormItem from '../ui/FormItem.svelte';
	import Input from '../ui/Input.svelte';
	import { validator } from '@felte/validator-zod';
	import { createForm } from 'felte';
	import { Check } from '@lucide/svelte';
	import Form from '../ui/Form.svelte';
	import { t } from '$lib/translations/translations';
	import type { VerificationType } from '$lib/types/auth';

	let {
		input,
		verificationType,
		closePopUp
	}: {
		input: string;
		verificationType: VerificationType;
		closePopUp: () => void;
	} = $props();

	let isLoadingVerification: boolean = $state(false);
	let isLoadingResending: boolean = $state(false);
	let countdown = $state(0);
	let isDisabled = $derived(countdown > 0);
	let intervalId: ReturnType<typeof setInterval> | null = null;

	const schema = z.object({
		otp: z.string().length(6, 'Code must consist of 6 digits')
	});

	const { form, errors, data } = createForm({
		extend: validator({ schema }),
		onSubmit: (values) => {
			isLoadingVerification = true;

			verifyOTP(verificationType, input, values.otp)
				.then(() => {
					closePopUp();
				})
				.finally(() => {
					isLoadingVerification = false;
				});
		}
	});

	function onResend() {
		isLoadingResending = true;
		sendOTP(verificationType, input)
			.then(() => {
				startCountdown();
			})
			.finally(() => {
				isLoadingResending = false;
			});
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
	{#if verificationType === 'email' || verificationType === 'email_change'}
		<span>{$t('common.codeSentToEmail', { email: input })}</span>
	{:else if verificationType === 'sms' || verificationType === 'phone_change'}
		<span>{$t('common.codeSentToPhone', { phone: input })}</span>
	{/if}
	<FormItem label={$t('common.verificationCode')} errors={$errors.otp}>
		<Input
			type="text"
			inputmode="numeric"
			placeholder={$t('common.enterSixDigitCode')}
			bind:value={$data.otp}
		/>
	</FormItem>
	<div class="mt-4 flex flex-col gap-2">
		<Button
			type="submit"
			label={$t('common.submitCode')}
			icon={Check}
			isLoading={isLoadingVerification}
			full
		/>
		<Button
			preset="ghost"
			label={`${$t('common.didntReceiveResend')} ${countdown > 0 ? `${countdown}${$t('common.s')}` : ''}`}
			full
			isLoading={isLoadingResending}
			disabled={isDisabled}
			onclick={onResend}
		/>
	</div>
</Form>
