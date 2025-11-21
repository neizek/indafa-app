<script lang="ts">
	import Input from './Input.svelte';
	let { value = $bindable(), onchange }: { value: Date; onchange: () => void } = $props();

	let localValue = $state(value.toISOString().slice(0, 10));

	function onInput() {
		value = new Date(localValue);
		onchange();
	}
</script>

<Input type="date" bind:value={localValue} oninput={onInput} />
