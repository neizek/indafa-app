<script lang="ts">
	import { number } from 'zod';

	let {
		value,
		label,
		percent
	}: {
		value: number | null;
		label: string;
		percent?: number;
	} = $props();

	let shownPercentage = $state('');

	const badgeColor = (() => {
		if (!percent) {
			shownPercentage = 'N/A';
			return 'preset-tonal-surface';
		}

		if (percent > 0) {
			shownPercentage = `+ ${percent.toFixed(1)}%`;
			return 'preset-tonal-success';
		}

		if (percent < 0) {
			shownPercentage = `${percent.toFixed(1)}%`;
			return 'preset-tonal-error';
		}
	})();
</script>

<div class="flex flex-col items-center gap-2">
	<span class="text-4xl">{value}</span>
	<span class="label-text">{label}</span>
	<div class="badge {badgeColor}">{shownPercentage}</div>
</div>
