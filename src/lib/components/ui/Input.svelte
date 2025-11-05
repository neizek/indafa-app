<script lang="ts">
	let {
		type,
		placeholder,
		value = $bindable()
	}: {
		type: 'text' | 'password' | 'email';
		placeholder?: string;
		value: any;
	} = $props();
</script>

<input {type} class="input w-full" {placeholder} bind:value />
