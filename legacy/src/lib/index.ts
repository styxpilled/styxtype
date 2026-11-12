// place files you want to import through the `$lib` alias in this folder.
export type Metadata = {
	[key: string]: {
		[key: string]: {
			availableFeatures: string[];
			variationAxes: VariationAxes;
			copyright: string | null;
			version: string;
		};
	};
};

type VariationAxes = {
	[key: string]: {
		name: string;
		min: number;
		max: number;
		default: number;
	};
};
