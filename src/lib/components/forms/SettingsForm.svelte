<script lang="ts">
	import { currentTheme, Theme, themesOptions, updateTheme } from '$lib/stores/theme';
	import { supportedLocalesOptions, switchLocale, locale } from '$lib/translations/translations';
	import { CircleQuestionMark } from '@lucide/svelte';
	import Button from '../ui/Button.svelte';
	import FormItem from '../ui/FormItem.svelte';
	import Selector from '../ui/Selector.svelte';

	let language = $state($locale);
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
	<FormItem label="Others">
		<Button preset="ghost" icon={CircleQuestionMark} label="Rules and policy" full />
	</FormItem>
</div>
