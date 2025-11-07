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

	const schema = z.object({
		firstName: z.string(),
		lastName: z.string()
	});

	let { closePopUp } = $props();
	let isLoading: boolean = $state(false);

	const { form, errors, data } = createForm({
		extend: validator({ schema }),
		initialValues: {
			firstName: $user?.user_metadata.firstName ?? '',
			lastName: $user?.user_metadata.lastName ?? '',
			phone: $user?.phone ?? ''
		},
		onSubmit: (values) => {
			isLoading = true;

			updateUser({
				phone: values.phone,
				data: {
					firstName: values.firstName,
					lastName: values.lastName
				}
			})
				.then(() => {
					if (values.phone !== $user?.phone) {
						openOTPVerificationPopUp(values.phone, 'phone');
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
	<FormItem label="First name">
		<Input bind:value={$data.firstName} />
	</FormItem>
	<FormItem label="Last name">
		<Input bind:value={$data.lastName} />
	</FormItem>
	<FormItem label="Phone">
		<Input bind:value={$data.phone} />
	</FormItem>
	<div class="mt-2 flex gap-2">
		<Button type="submit" label="Confirm" icon={Check} {isLoading} full />
		<Button label="Cancel" preset="tonal" icon={XIcon} full onclick={closePopUp} />
	</div>
</Form>
