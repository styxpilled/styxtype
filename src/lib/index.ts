import type { CSSSlider, Font, Setting } from './types';

export const characterSets = {
	latinBasic:
		'!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~'
};

export const formatDescription = (font: Font) => {
	return font.description
		.replace('%TITLE%', font.href ? `<a href="${font.href}">${font.title}</a>` : font.title)
		.replace(
			'%AUTHOR%',
			font.author.href ? `<a href="${font.author.href}">${font.author.name}</a>` : font.author.name
		);
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

export const fontSettings = (settings: Setting[]) => {
	let out = 'font-feature-settings: ';
	let incr = 0;
	for (let i = 0; i < settings.length; i++) {
		const setting = settings[i];
		if (setting.checked) {
			if (incr !== 0) {
				out += ', ';
			}
			incr++;
			out += `"${setting.value}"`;
		}
	}
	out += ';';

	return out;
};
