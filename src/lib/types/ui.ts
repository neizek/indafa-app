import type { Component, IconProps } from '@lucide/svelte';

export type AcceptedSelectOptionValues = string | number | Date | null;

export interface SelectOption {
	value: AcceptedSelectOptionValues;
	label: string;
	caption?: string;
	icon?: Component<IconProps>;
	disabled?: boolean;
}
