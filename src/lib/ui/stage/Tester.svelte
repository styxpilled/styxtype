<script lang="ts" module>
	// Module state, so the text stays when the view or font changes.
	let line = $state('Handgloves & Quixotic 1234');
	let paragraph = $state(
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
	);
</script>

<script lang="ts">
	import { settings } from '#lib/settings.svelte.ts';

	const sizes = [96, 64, 40, 28, 20, 14];
</script>

<div class="tester">
	<section aria-label="Waterfall">
		{#each sizes as size (size)}
			<label class="row">
				<span class="size num">{size}</span>
				<input
					type="text"
					bind:value={line}
					spellcheck="false"
					autocomplete="off"
					aria-label="Test text at {size} px"
					style:font-size="{size}px"
				/>
			</label>
		{/each}
	</section>

	<section>
		<textarea
			bind:value={paragraph}
			spellcheck="false"
			aria-label="Test paragraph"
			style:font-size="{settings.size}px"
			style:line-height={settings.lineHeight}
			style:letter-spacing="{settings.tracking}em"></textarea>
	</section>
</div>

<style>
	.tester {
		--size-col: 2.5rem;
		display: grid;
		/* Without minmax, nowrap lines make the column wider than the stage. */
		grid-template-columns: minmax(0, 1fr);
		gap: var(--space-6);
		padding-bottom: var(--space-7);
	}

	section + section {
		padding-top: var(--space-6);
		border-top: 1px solid var(--border);
	}

	.row {
		display: grid;
		grid-template-columns: var(--size-col) minmax(0, 1fr);
		align-items: baseline;
	}

	.size {
		font-family: var(--font-ui);
		font-size: var(--text-xs);
		color: var(--text-faint);
	}

	input,
	textarea {
		width: 100%;
		padding: 0;
		border: 0;
		border-radius: 0;
		background: none;
		font-family: inherit;
		color: var(--ink);
		outline: none;
	}

	input {
		line-height: 1.3;
		border-bottom: 1px solid transparent;

		&:focus-visible {
			border-bottom-color: var(--accent);
		}
	}

	textarea {
		display: block;
		max-width: 36em;
		min-height: 6lh;
		field-sizing: content;
		resize: none;
		padding-left: var(--space-3);
		border-left: 1px solid var(--border-strong);

		&:focus-visible {
			border-left-color: var(--accent);
		}
	}
</style>
