import type { CSSSlider } from './types';

export const characterSets = {
	latinBasic:
		'!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~'
};

export const variationStyle = (properties: CSSSlider[]) => {
	let out = `font-variation-settings:`;

	for (let i = 0; i < properties.length; i++) {
		const property = properties[i];
		out += `"${property.cssProperty}" ${property.value}`;
		if (i < properties.length - 1) {
			out += ', ';
		}
	}
	out += ';';

	return out;
};
