<script lang="ts">
	import { user } from '$lib/stores/auth';
	import { validator } from '@felte/validator-zod';
	import { createForm } from 'felte';
	import { z } from 'zod';
	import FormItem from '../ui/FormItem.svelte';
	import Input from '../ui/Input.svelte';
	import Form from '../ui/Form.svelte';
	import Button from '../ui/Button.svelte';
	import { Check, XIcon } from '@lucide/svelte';
	import { openOTPVerificationPopUp, updateUser } from '$lib/helpers/auth';
	import { t } from '$lib/translations/translations';

	const schema = z.object({
		firstName: z.string(),
		lastName: z.string()
	});

	let { closePopUp } = $props();
	let isLoading: boolean = $state(false);

	function preparePayload() {
		return {
			...($data.phone !== $user?.phone && { phone: $data.phone }),
			data: {
				...($data.firstName !== $user?.user_metadata.firstName && { firstName: $data.firstName }),
				...($data.lastName !== $user?.user_metadata.lastName && { firstName: $data.lastName })
			}
		};
	}

	const { form, errors, data } = createForm({
		extend: validator({ schema }),
		initialValues: {
			firstName: $user?.user_metadata.firstName ?? '',
			lastName: $user?.user_metadata.lastName ?? '',
			phone: $user?.phone ?? ''
		},
		onSubmit: (values) => {
			isLoading = true;

			updateUser(preparePayload())
				.then(() => {
					if (values.phone !== $user?.phone) {
						openOTPVerificationPopUp(values.phone, 'phone_change');
					}
					closePopUp();
				})
				.finally(() => {
					isLoading = false;
				});
		}
	});
</script>

<Form {form}>
	<FormItem label={$t('common.firstName')}>
		<Input bind:value={$data.firstName} />
	</FormItem>
	<FormItem label={$t('common.lastName')}>
		<Input bind:value={$data.lastName} />
	</FormItem>
	<FormItem label={$t('common.mobilePhone')}>
		<Input bind:value={$data.phone} />
	</FormItem>
	<div class="mt-2 flex gap-2">
		<Button type="submit" label={$t('common.confirm')} icon={Check} {isLoading} full />
		<Button label={$t('common.cancel')} preset="tonal" icon={XIcon} full onclick={closePopUp} />
	</div>
</Form>
