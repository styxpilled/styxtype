export const typedKeys = <T extends object>(obj: T): [keyof T] => {
	return Object.keys(obj) as [keyof T];
};

export const focus = (t: HTMLElement) => {
	// We need to manage hover state ourselves to ensure the animation plays back correctly on hoverout
	// const t = e.target as typeof e.currentTarget;
	if (!t) return;
	if (t.classList.contains('active')) {
		t.classList.remove('hover');
		return;
	}
	const anims = t.getAnimations({ subtree: true });
	for (const anim of anims) {
		anim.reverse();
		anim.addEventListener('finish', () => {
			t.classList.remove('hover');
		});
	}
};
