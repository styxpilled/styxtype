/**
 * Calls `fit` with the box width and the natural width of each child of `measure`.
 * Runs again on resize, and when the measure box changes because a font changed or loaded.
 */
export function observeFit(
	box: HTMLElement,
	measure: HTMLElement,
	fit: (width: number, natural: number[]) => void
) {
	const run = () => {
		const natural = [...measure.children].map((c) => c.getBoundingClientRect().width);
		if (natural[0]) fit(box.clientWidth, natural);
	};
	const observer = new ResizeObserver(run);
	observer.observe(box);
	observer.observe(measure);
	addEventListener('resize', run);
	return () => {
		observer.disconnect();
		removeEventListener('resize', run);
	};
}
