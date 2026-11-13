<script lang="ts">
	import { desktop, mobile } from '#lib/media.svelte.ts';
	import type { Snippet } from 'svelte';

	type Props = {
		brand: Snippet;
		list: Snippet;
		/** Current font with prev/next, shown in the collapsed mobile sheet. */
		peek: Snippet;
		toolbar: Snippet;
		stage: Snippet;
		inspector: Snippet;
	};

	let { brand, list, peek, toolbar, stage, inspector }: Props = $props();

	let listOpen = $state(false);
	let inspectorOpen = $state(false);

	// Drag offset of the list sheet in px while a drag is active.
	let drag = $state<{ start: number; offset: number } | null>(null);
	let sheet = $state<HTMLElement>();

	// The whole sheet head drags and toggles, except its other buttons.
	function onpointerdown(e: PointerEvent) {
		const button = (e.target as Element).closest('button');
		if (button && !button.classList.contains('handle')) return;
		(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
		drag = { start: e.clientY, offset: 0 };
	}

	function onpointermove(e: PointerEvent) {
		if (drag) drag.offset = e.clientY - drag.start;
	}

	function onpointerup() {
		if (!drag || !sheet) return;
		const threshold = sheet.offsetHeight * 0.2;
		if (Math.abs(drag.offset) < 4) listOpen = !listOpen;
		else if (drag.offset < -threshold) listOpen = true;
		else if (drag.offset > threshold) listOpen = false;
		drag = null;
	}

	function onkeydown(e: KeyboardEvent) {
		if (e.key !== 'Escape') return;
		if (inspectorOpen) inspectorOpen = false;
		else if (listOpen) listOpen = false;
	}

	let toolbarHeight = $state(0);

	let inspectorHidden = $derived(!desktop.current && !inspectorOpen);
</script>

<svelte:window {onkeydown} />

<div class="shell" class:list-open={listOpen} class:inspector-open={inspectorOpen}>
	<header class="topbar">
		{@render brand()}
		{@render inspectorButton()}
	</header>

	<aside
		class="panel list"
		class:dragging={drag !== null}
		bind:this={sheet}
		style:--drag={drag ? `${drag.offset}px` : null}
		aria-label="Fonts"
	>
		<div class="list-head">
			{@render brand()}
		</div>
		<div
			class="sheet-head"
			role="presentation"
			{onpointerdown}
			{onpointermove}
			{onpointerup}
			onpointercancel={() => (drag = null)}
		>
			<!-- Pointer taps toggle through the sheet head. A click with detail 0 is a key press. -->
			<button
				class="handle"
				aria-label={listOpen ? 'Collapse font list' : 'Expand font list'}
				aria-expanded={listOpen}
				onclick={(e) => {
					if (e.detail === 0) listOpen = !listOpen;
				}}
			></button>
			{@render peek()}
		</div>
		<div class="list-body" inert={mobile.current && !listOpen}>
			{@render list()}
		</div>
	</aside>

	<main class="panel stage" style:--toolbar-height={toolbarHeight ? `${toolbarHeight}px` : null}>
		<div class="toolbar" bind:offsetHeight={toolbarHeight}>
			<div class="toolbar-scroll">
				{@render toolbar()}
			</div>
		</div>
		<div class="stage-actions">
			{@render inspectorButton()}
		</div>
		<div class="stage-body">
			{@render stage()}
		</div>
	</main>

	<aside class="panel inspector" inert={inspectorHidden} aria-label="Settings">
		<div class="inspector-head">
			<h2>Settings</h2>
			<button class="close" aria-label="Close settings" onclick={() => (inspectorOpen = false)}>
				<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" /></svg>
			</button>
		</div>
		<div class="inspector-body">
			{@render inspector()}
		</div>
	</aside>

	<button
		class="backdrop"
		tabindex="-1"
		aria-hidden="true"
		onclick={() => {
			listOpen = false;
			inspectorOpen = false;
		}}
	></button>
</div>

{#snippet inspectorButton()}
	<button
		class="inspector-toggle"
		aria-expanded={inspectorOpen}
		onclick={() => (inspectorOpen = !inspectorOpen)}
	>
		<svg viewBox="0 0 16 16" aria-hidden="true">
			<path d="M2 4h7M13 4h1M2 12h1M7 12h7" />
			<circle cx="11" cy="4" r="2" />
			<circle cx="5" cy="12" r="2" />
		</svg>
		<span>Settings</span>
	</button>
{/snippet}

<style>
	.shell {
		--gap: var(--space-3);
		--list-width: 17rem;
		--inspector-width: 19rem;
		--peek: 4.5rem;

		display: grid;
		grid-template-columns: var(--list-width) minmax(0, 1fr) var(--inspector-width);
		gap: var(--gap);
		height: 100dvh;
		padding: var(--gap);
	}

	.panel {
		display: flex;
		flex-direction: column;
		min-height: 0;
		overflow: hidden;
	}

	/* Less top space: the lowercase brand has no cap height. */
	.list-head {
		padding: calc(var(--space-4) - 3px) var(--space-4) var(--space-3);
	}

	.list-body,
	.stage-body,
	.inspector-body {
		overflow-y: auto;
		scrollbar-gutter: stable;
		overscroll-behavior: contain;
	}

	.list-body {
		flex: 1;
		padding: 0 var(--space-4) var(--space-4);
	}

	.stage {
		position: relative;
		--stage-pad: var(--space-3);
		/* Keeps scrolled content off the panel's top edge. */
		--stage-margin: var(--space-3);
	}

	.stage-body {
		flex: 1;
		/* The toolbar floats over the top, so content scrolls up beside it. */
		margin-top: var(--stage-margin);
		padding: calc(var(--toolbar-height, 3.5rem) - var(--space-3)) var(--stage-pad) var(--stage-pad);
	}

	.inspector-body {
		flex: 1;
		padding: var(--space-4);
	}

	.inspector-head {
		display: none;
		align-items: center;
		justify-content: space-between;
		padding: var(--space-3) var(--space-3) 0 var(--space-4);

		h2 {
			font-size: var(--text-md);
			font-weight: 600;
		}
	}

	.close {
		display: grid;
		place-items: center;
		width: 2rem;
		height: 2rem;
		border: 0;
		border-radius: var(--radius-control);
		background: none;
		color: var(--text-muted);
		cursor: pointer;

		&:hover {
			background: var(--surface-2);
			color: var(--text);
		}

		svg {
			width: 1rem;
			height: 1rem;
			stroke: currentColor;
			stroke-width: 1.5;
			stroke-linecap: round;
		}
	}

	.toolbar,
	.stage-actions {
		position: absolute;
		top: 0;
		z-index: 2;
		background: var(--surface);
	}

	.stage-actions {
		padding: var(--space-3);
	}

	/* Not scrolling itself, so the inverted corners outside it stay visible. */
	.toolbar {
		left: 0;
		display: flex;
		max-width: 100%;
		border-bottom-right-radius: var(--radius-panel);

		/* Inverted corners: below the left end and right of the top end. */
		&::before,
		&::after {
			content: '';
			position: absolute;
			width: var(--radius-panel);
			height: var(--radius-panel);
			background: radial-gradient(
				circle at 100% 100%,
				transparent calc(var(--radius-panel) - 0.5px),
				var(--surface) calc(var(--radius-panel) + 0.5px)
			);
			pointer-events: none;
		}

		/* Offset to the edges of the scrolling content, not the panel. */
		&::before {
			top: 100%;
			left: var(--stage-pad);
		}

		&::after {
			top: var(--stage-margin);
			left: 100%;
		}
	}

	.toolbar-scroll {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		min-width: 0;
		padding: var(--space-3);
		overflow-x: auto;
		scrollbar-width: none;

		> :global(*) {
			flex-shrink: 0;
		}
	}

	.topbar,
	.sheet-head,
	.stage-actions,
	.backdrop,
	.inspector-toggle {
		display: none;
	}

	.inspector-toggle {
		align-items: center;
		gap: var(--space-2);
		height: 2rem;
		padding: 0 var(--space-3);
		border: 1px solid var(--border);
		border-radius: var(--radius-control);
		background: var(--surface-2);
		font-size: var(--text-sm);
		font-weight: 500;
		cursor: pointer;

		&[aria-expanded='true'] {
			border-color: var(--accent);
			color: var(--accent);
		}

		svg {
			width: 1rem;
			height: 1rem;
			fill: none;
			stroke: currentColor;
			stroke-width: 1.5;
			stroke-linecap: round;
		}
	}

	/* Medium: inspector becomes a drawer over the stage. */
	@media (max-width: 74.99rem) {
		.shell {
			grid-template-columns: var(--list-width) minmax(0, 1fr);
		}

		.stage-actions {
			display: block;
			right: 0;
			border-bottom-left-radius: var(--radius-panel);
		}

		.stage .inspector-toggle {
			display: inline-flex;
		}

		.inspector {
			position: fixed;
			z-index: 20;
			top: var(--gap);
			right: var(--gap);
			bottom: var(--gap);
			width: min(var(--inspector-width), calc(100vw - 2 * var(--gap)));
			translate: calc(100% + var(--gap)) 0;
			transition: translate 220ms ease;
		}

		.inspector-open .inspector {
			translate: 0 0;
		}

		.inspector-head {
			display: flex;
		}

		/* Transparent here: a click outside the drawer closes it. */
		.backdrop {
			display: block;
			position: fixed;
			inset: 0;
			z-index: 15;
			border: 0;
			background: transparent;
			pointer-events: none;
		}

		.inspector-open .backdrop {
			pointer-events: auto;
		}
	}

	/* Mobile: stage fills the screen, list and inspector are bottom sheets. */
	@media (max-width: 47.99rem) {
		.shell {
			grid-template-columns: minmax(0, 1fr);
			grid-template-rows: auto minmax(0, 1fr);
			padding-bottom: calc(var(--peek) + 2 * var(--gap));
		}

		.topbar {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 var(--space-1);

			.inspector-toggle {
				display: inline-flex;
			}
		}

		.stage-actions,
		.list-head {
			display: none;
		}

		.stage {
			--stage-pad: var(--space-1);
		}

		.toolbar {
			border-radius: 0;

			&::before,
			&::after {
				display: none;
			}
		}

		.list,
		.inspector {
			position: fixed;
			z-index: 20;
			left: var(--gap);
			right: var(--gap);
			bottom: var(--gap);
			top: auto;
			width: auto;
			height: min(85dvh, 40rem);
		}

		.list {
			z-index: 10;
			translate: 0 calc(100% - var(--peek) + var(--drag, 0px));
			transition: translate 240ms ease;

			&.dragging {
				transition: none;
			}
		}

		.list-open .list {
			translate: 0 var(--drag, 0px);
		}

		.list-open .list.dragging {
			translate: 0 max(0px, var(--drag, 0px));
		}

		.sheet-head {
			display: flex;
			flex-direction: column;
			align-items: stretch;
			height: var(--peek);
			padding: 0 var(--space-3) var(--space-2);
			cursor: grab;
			touch-action: none;
		}

		.handle {
			flex: none;
			align-self: center;
			width: 3rem;
			height: 1.25rem;
			padding: 0;
			border: 0;
			background: none;
			cursor: grab;

			&::before {
				content: '';
				display: block;
				width: 2.25rem;
				height: 4px;
				margin: 0 auto;
				border-radius: var(--radius-full);
				background: var(--border-strong);
			}
		}

		.inspector {
			translate: 0 calc(100% + var(--gap));
			transition: translate 240ms ease;
		}

		.inspector-open .inspector {
			translate: 0 0;
		}

		.backdrop {
			display: block;
			position: fixed;
			inset: 0;
			z-index: 5;
			border: 0;
			background: rgb(0 0 0 / 0.25);
			opacity: 0;
			pointer-events: none;
			transition: opacity 240ms ease;
		}

		.list-open .backdrop,
		.inspector-open .backdrop {
			opacity: 1;
			pointer-events: auto;
		}

		.inspector-open .backdrop {
			z-index: 15;
		}
	}
</style>
