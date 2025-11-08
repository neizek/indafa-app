import { toaster } from '$lib/stores/toaster';
import type { ErrorToast, Toast } from '$lib/types/toaster';
import { getErrorMessage } from './errors';

function showSuccessToast(data: Toast) {
	toaster.success({
		title: data.title,
		description: data.description,
		closable: true
	});
}

function showErrorToast(data: ErrorToast) {
	toaster.error({
		title: data.title ?? 'Error',
		description: data.description ?? getErrorMessage(data.error),
		closable: true
	});
}

export { showErrorToast, showSuccessToast };
