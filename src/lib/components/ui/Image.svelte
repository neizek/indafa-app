<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let {
		src,
		alt,
		ratio = 'video'
	}: {
		src: string;
		alt: string;
		ratio?: 'video' | 'square';
	} = $props();

	let isLoading: boolean = $state(true);
	let imageRef: HTMLImageElement | null = $state(null);

	$effect(() => {
		if (src) {
		}
	});

	// onMount(() => {
	// 	if (imageRef?.complete) {
	// 		isLoading = false;
	// 	}
	// });
</script>

{#key src}
	<img
		in:fade
		{src}
		{alt}
		class={[`aspect-${ratio}`, 'w-full', isLoading ? 'placeholder animate-pulse' : '']}
		bind:this={imageRef}
		onload={() => (isLoading = false)}
	/>
{/key}
