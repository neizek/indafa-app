import type { IconProps } from '@lucide/svelte';
import type { Component } from 'svelte';

export type AcceptedSelectOptionValues = string | number | Date | null;

export interface SelectOption {
	value: AcceptedSelectOptionValues;
	label: string;
	caption?: string;
	icon?: Component<IconProps>;
	disabled?: boolean;
}
