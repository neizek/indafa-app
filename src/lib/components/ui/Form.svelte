<script lang="ts">
	let { form, children } = $props();
</script>

<form use:form class="flex flex-col gap-2">
	{@render children?.()}
</form>
