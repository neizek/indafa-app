<script lang="ts">
	let {
		type = 'text',
		inputmode = 'text',
		placeholder,
		value = $bindable(),
		oninput
	}: {
		type?: 'text' | 'password' | 'email' | 'number' | 'tel';
		inputmode?: 'text' | 'tel' | 'numeric';
		placeholder?: string;
		value: any;
		oninput?: (event: Event & { currentTarget: HTMLInputElement }) => void;
	} = $props();
</script>

<input {type} {inputmode} class="input w-full" {placeholder} bind:value {oninput} />
