<script lang="ts">
	let {
		type = 'text',
		inputmode = 'text',
		placeholder,
		value = $bindable()
	}: {
		type?: 'text' | 'password' | 'email' | 'number';
		inputmode?: 'text' | 'tel' | 'numeric';
		placeholder?: string;
		value: any;
	} = $props();
</script>

<input {type} {inputmode} class="input w-full" {placeholder} bind:value />
