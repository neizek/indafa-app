<script lang="ts">
	import { getErrorMessage } from '$lib/helpers/errors';
	import { showErrorToast } from '$lib/helpers/toaster';
	import { addVehicle } from '$lib/helpers/vehicles';
	import { session } from '$lib/stores/auth';
	import { validator } from '@felte/validator-zod';
	import { Car, LoaderCircle } from '@lucide/svelte';
	import { createForm } from 'felte';
	import { z } from 'zod';

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

<form class="input-group grid-cols-[auto_1fr_auto]" use:form>
	<div class="ig-cell preset-tonal">
		<Car size={16} />
	</div>
	<input class="btn" type="text" name="licensePlate" />

	{#if isLoading}
		<button class="ig-btn preset-filled" disabled>
			<LoaderCircle size={16} class="animate-spin" />
		</button>
	{:else}
		<button type="submit" class="ig-btn preset-filled">Add</button>
	{/if}
</form>
{#if $errors.licensePlate}
	<span>{$errors.licensePlate[0]}</span>
{/if}
