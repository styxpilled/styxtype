import type { Attachment } from 'svelte/attachments';

const holdTime = 500;
const slop = 10;

/**
 * Calls `open` with a screen point on right-click, the menu key, or a touch long press.
 * With `hold`, a touch long press calls `hold` instead of `open`.
 * Android also sends `contextmenu` on long press; iOS does not, so a timer covers it.
 */
export function menuTrigger(
	open: (x: number, y: number) => void,
	hold?: () => void
): Attachment<HTMLElement> {
	return (node) => {
		let timer: ReturnType<typeof setTimeout> | undefined;
		let start = { x: 0, y: 0 };
		let held = false;
		let touching = false;

		const cancel = () => clearTimeout(timer);
		const end = () => {
			cancel();
			touching = false;
		};

		const press = () => {
			cancel();
			if (held) return;
			held = true;
			if (hold) {
				navigator.vibrate?.(10);
				hold();
			} else {
				open(start.x, start.y);
			}
		};

		const oncontextmenu = (e: MouseEvent) => {
			e.preventDefault();
			if (touching) {
				press();
				return;
			}
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
			touching = e.pointerType === 'touch';
			if (!touching) return;
			start = { x: e.clientX, y: e.clientY };
			timer = setTimeout(press, holdTime);
		};

		const onpointermove = (e: PointerEvent) => {
			if (Math.hypot(e.clientX - start.x, e.clientY - start.y) > slop) end();
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
		node.addEventListener('pointerup', end);
		node.addEventListener('pointercancel', end);
		node.addEventListener('click', onclick, true);
		return () => {
			cancel();
			node.removeEventListener('contextmenu', oncontextmenu);
			node.removeEventListener('pointerdown', onpointerdown);
			node.removeEventListener('pointermove', onpointermove);
			node.removeEventListener('pointerup', end);
			node.removeEventListener('pointercancel', end);
			node.removeEventListener('click', onclick, true);
		};
	};
}
