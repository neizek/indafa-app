<script lang="ts">
	import { showErrorToast } from '$lib/helpers/toaster';
	import { addVehicle } from '$lib/helpers/vehicles';
	import { session } from '$lib/stores/auth';
	import { t } from '$lib/translations/translations';
	import { validator } from '@felte/validator-zod';
	import { Plus, XIcon } from '@lucide/svelte';
	import { createForm } from 'felte';
	import { z } from 'zod';
	import Form from '../ui/Form.svelte';
	import FormItem from '../ui/FormItem.svelte';
	import Input from '../ui/Input.svelte';
	import Button from '../ui/Button.svelte';

	let isLoading = $state(false);

	const schema = z.object({
		licensePlate: z
			.string()
			.nonempty('This field can not be empty')
			.regex(/^[A-Z0-9\s-]{1,9}$/, 'Enter a valid license plate number')
	});

	const { form, errors, data } = createForm({
		extend: validator({ schema }),
		onSubmit: (values) => {
			sendAddVehicleRequest(values.licensePlate);
		}
	});

	let { closePopUp } = $props();

	async function sendAddVehicleRequest(licensePlate: string) {
		if (!$session?.user.id || !licensePlate) {
			return;
		}

		isLoading = true;

		addVehicle(licensePlate, $session.user.id)
			.then(() => {
				closePopUp();
			})
			.catch((error) => showErrorToast({ error }))
			.finally(() => {
				isLoading = false;
			});
	}
</script>

<Form {form}>
	<FormItem label={$t('common.licensePlate')}>
		<Input placeholder="EV7394" bind:value={$data.licensePlate} />
	</FormItem>
	<div class="mt-2 flex justify-between gap-2">
		<Button type="submit" label={$t('common.addVehicle')} icon={Plus} full />
		<Button preset="tonal" icon={XIcon} label={$t('common.cancel')} />
	</div>
</Form>
