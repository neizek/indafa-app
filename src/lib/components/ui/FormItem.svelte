<script lang="ts">
	let { children, label } = $props();
</script>

<label class="label">
	<span class="label-text">{label}</span>
	{@render children()}
</label>
