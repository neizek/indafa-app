<script lang="ts">
	import { currentTheme, Theme, themesOptions, updateTheme } from '$lib/stores/theme';
	import { supportedLocalesOptions, switchLocale } from '$lib/translations';
	import FormItem from '../ui/FormItem.svelte';
	import Selector from '../ui/Selector.svelte';

	let language = $state('en');
	let theme = $state($currentTheme);
</script>

<div class="flex flex-col gap-4">
	<FormItem label="Language">
		<Selector
			options={supportedLocalesOptions}
			bind:value={language}
			onchange={() => switchLocale(language)}
		/>
	</FormItem>
	<FormItem label="Theme">
		<Selector
			options={themesOptions}
			bind:value={theme}
			onchange={(value) => updateTheme(value as Theme)}
		/>
	</FormItem>
</div>
