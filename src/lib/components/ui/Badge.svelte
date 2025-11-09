<script lang="ts">
	let { label, preset, clases = '' } = $props();
</script>

<div class="{clases} badge preset-tonal-{preset}">
	{label}
</div>
