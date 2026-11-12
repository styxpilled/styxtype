import type { Attachment } from 'svelte/attachments';

const holdTime = 500;
const slop = 10;

/**
 * Calls `open` with a screen point on right-click, the menu key, or a touch long press.
 * Android also sends `contextmenu` on long press; iOS does not, so a timer covers it.
 */
export function menuTrigger(open: (x: number, y: number) => void): Attachment<HTMLElement> {
	return (node) => {
		let timer: ReturnType<typeof setTimeout> | undefined;
		let start = { x: 0, y: 0 };
		let held = false;

		const cancel = () => clearTimeout(timer);

		const oncontextmenu = (e: MouseEvent) => {
			e.preventDefault();
			cancel();
			// The menu key sends no pointer position.
			if (e.button === -1 || (e.clientX === 0 && e.clientY === 0)) {
				const rect = node.getBoundingClientRect();
				open(rect.left + rect.width / 2, rect.bottom);
			} else {
				open(e.clientX, e.clientY);
			}
		};

		const onpointerdown = (e: PointerEvent) => {
			held = false;
			if (e.pointerType !== 'touch') return;
			start = { x: e.clientX, y: e.clientY };
			timer = setTimeout(() => {
				held = true;
				open(start.x, start.y);
			}, holdTime);
		};

		const onpointermove = (e: PointerEvent) => {
			if (Math.hypot(e.clientX - start.x, e.clientY - start.y) > slop) cancel();
		};

		// A long press must not also select the item.
		const onclick = (e: MouseEvent) => {
			if (!held) return;
			held = false;
			e.preventDefault();
			e.stopImmediatePropagation();
		};

		node.addEventListener('contextmenu', oncontextmenu);
		node.addEventListener('pointerdown', onpointerdown);
		node.addEventListener('pointermove', onpointermove);
		node.addEventListener('pointerup', cancel);
		node.addEventListener('pointercancel', cancel);
		node.addEventListener('click', onclick, true);
		return () => {
			cancel();
			node.removeEventListener('contextmenu', oncontextmenu);
			node.removeEventListener('pointerdown', onpointerdown);
			node.removeEventListener('pointermove', onpointermove);
			node.removeEventListener('pointerup', cancel);
			node.removeEventListener('pointercancel', cancel);
			node.removeEventListener('click', onclick, true);
		};
	};
}
