<script lang="ts" module>
	import type { IndexEntry } from '#lib/catalog.ts';

	/** With `font`, the item shows the font's name preview in place of the label. */
	export type MenuItem = {
		label: string;
		font?: IndexEntry;
		current?: boolean;
		onselect: () => void;
	};
</script>

<script lang="ts">
	let { label, empty = '' }: { label: string; empty?: string } = $props();

	let menu = $state<HTMLElement>();
	let items = $state<MenuItem[]>([]);
	let point = $state({ x: 0, y: 0 });

	export function open(x: number, y: number, list: MenuItem[]) {
		if (!menu) return;
		items = list;
		point = { x, y };
		if (!menu.matches(':popover-open')) menu.showPopover();
		requestAnimationFrame(() => {
			if (!menu) return;
			// Keep the menu inside the viewport.
			const rect = menu.getBoundingClientRect();
			point = {
				x: Math.max(4, Math.min(x, innerWidth - rect.width - 4)),
				y: Math.max(4, Math.min(y, innerHeight - rect.height - 4))
			};
			menu.querySelector<HTMLElement>('[role=menuitem]')?.focus();
		});
	}

	function select(item: MenuItem) {
		item.onselect();
		menu?.hidePopover();
	}

	function onkeydown(e: KeyboardEvent) {
		if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
		e.preventDefault();
		const buttons = [...(menu?.querySelectorAll<HTMLElement>('[role=menuitem]') ?? [])];
		const i = buttons.indexOf(document.activeElement as HTMLElement);
		const next = (i + (e.key === 'ArrowDown' ? 1 : -1) + buttons.length) % buttons.length;
		buttons[next]?.focus();
	}
</script>

<div
	bind:this={menu}
	class="menu panel"
	popover
	role="menu"
	aria-label={label}
	tabindex="-1"
	style:left="{point.x}px"
	style:top="{point.y}px"
	{onkeydown}
>
	{#each items as item (item.label)}
		<button
			role="menuitem"
			class:font={item.font}
			aria-current={item.current}
			aria-label={item.label}
			onclick={() => select(item)}
		>
			{#if item.font}
				<svg aria-hidden="true" style:width="{item.font.name_width}em">
					<use href="/fonts/names.svg#{item.font.slug}" />
				</svg>
			{:else}
				{item.label}
			{/if}
		</button>
	{:else}
		<p class="label">{empty}</p>
	{/each}
</div>

<style>
	.menu {
		position: fixed;
		inset: auto;
		min-width: 9rem;
		max-width: min(18rem, calc(100vw - 8px));
		max-height: min(24rem, calc(100dvh - 8px));
		margin: 0;
		padding: var(--space-1);
		/* Item radius plus padding, so the corners stay concentric. */
		border-radius: calc(var(--radius-chip) + var(--space-1));
		overflow-y: auto;
		color: var(--text);
	}

	button {
		display: block;
		width: 100%;
		padding: var(--space-1) var(--space-2);
		border: 0;
		border-radius: var(--radius-chip);
		background: none;
		font-size: var(--text-sm);
		text-align: left;
		color: inherit;
		cursor: pointer;

		&:hover,
		&:focus-visible {
			background: var(--surface-2);
			outline: none;
		}

		&[aria-current='true'] {
			color: var(--accent);
		}

		&.font {
			font-size: 1.125rem;
			color: var(--ink);

			&[aria-current='true'] {
				background: var(--accent-soft);
			}
		}

		svg {
			display: block;
			height: 1.25em;
			fill: currentColor;
		}
	}

	p {
		padding: var(--space-1) var(--space-2);
	}
</style>
