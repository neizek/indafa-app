<script lang="ts">
	let {
		label,
		clases = ''
	}: {
		label: string;
		clases: string;
	} = $props();
</script>

<div class="{clases} badge">
	{label}
</div>
