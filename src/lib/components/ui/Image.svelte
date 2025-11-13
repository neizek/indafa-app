<script lang="ts">
	import { fade } from 'svelte/transition';

	let {
		src,
		alt,
		cover = 'object-cover',
		ratio = 'aspect-video'
	}: {
		src: string;
		alt: string;
		cover?: 'object-cover' | 'object-contain';
		ratio?: 'aspect-video' | 'aspect-square';
	} = $props();

	let isLoading: boolean = $state(true);
	let imageRef: HTMLImageElement | null = $state(null);
</script>

{#key src}
	<img
		in:fade
		{src}
		{alt}
		class={[ratio, 'w-full', cover, isLoading ? 'placeholder animate-pulse text-[0px]' : '']}
		bind:this={imageRef}
		onload={() => (isLoading = false)}
	/>
{/key}
