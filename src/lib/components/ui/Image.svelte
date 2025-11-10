<script lang="ts">
	import { fade } from 'svelte/transition';

	let {
		src,
		alt,
		ratio = 'aspect-video'
	}: {
		src: string;
		alt: string;
		ratio?: 'aspect-video' | 'aspect-square';
	} = $props();

	let isLoading: boolean = $state(true);
	let imageRef: HTMLImageElement | null = $state(null);

	$effect(() => {
		if (src) {
		}
	});
</script>

{#key src}
	<img
		in:fade
		{src}
		{alt}
		class={[ratio, 'w-full', isLoading ? 'placeholder animate-pulse' : '']}
		bind:this={imageRef}
		onload={() => (isLoading = false)}
	/>
{/key}
