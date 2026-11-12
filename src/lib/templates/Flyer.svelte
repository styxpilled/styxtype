<script lang="ts">
	import { observeFit } from './fit.ts';

	const headline = 'Organize!';
	const demands = ['An Eight-Hour Day', 'A Living Wage', 'Double Overtime Pay'];

	let box = $state<HTMLElement>();
	let measure = $state<HTMLElement>();
	let size = $state(0);

	$effect(() => {
		if (!box || !measure) return;
		return observeFit(box, measure, (width, [natural]) => {
			size = Math.min((100 * width * 0.98) / natural, innerHeight * 0.26);
		});
	});
</script>

<article>
	<div class="frame">
		<p class="to">To the Men and Women of the Hartwell Mills</p>

		<h1 bind:this={box} style:font-size={size ? `${size}px` : null}>
			{headline}
			<span class="measure" bind:this={measure} aria-hidden="true"><span>{headline}</span></span>
		</h1>

		<div class="meeting">
			<p class="call">A Mass Meeting</p>
			<p>
				will be held at <strong>Turner Hall</strong>, Front Street,<br />
				Saturday Evening, March 9th, 1912, at 8 o'clock
			</p>
		</div>

		<p class="body">
			Fellow Workers: For fifty-six hours a week you tend the looms, and your wages will not keep a
			family through the winter. Alone, any one of you can be turned out at the gate. Together, the
			mills cannot run a single day without you. Come and hear how the workers of other towns have
			won the shorter day and an honest wage.
		</p>

		<ul class="demands">
			{#each demands as demand (demand)}
				<li>{demand}</li>
			{/each}
		</ul>

		<p class="tongues">Speakers in English, Italian, Polish and French</p>

		<p class="slogan">An injury to one is an injury to all.</p>

		<footer>Union printing, Labor Press, 14 Mill Street</footer>
	</div>
</article>

<style>
	article {
		min-height: 100%;
		padding: clamp(0.75rem, 3cqi, 2.5rem);
		background: var(--t-paper);
		color: var(--t-ink);
		font-family: var(--font-body);
		text-transform: var(--case-body);
		font-feature-settings: var(--features-body);
		font-variation-settings: var(--axes-body);
		font-size: clamp(0.95rem, 0.8rem + 0.5cqi, 1.2rem);
		line-height: 1.45;
		text-align: center;
	}

	.frame {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: clamp(1rem, 3cqi, 2.25rem);
		min-height: 100%;
		padding: clamp(1.25rem, 5cqi, 4rem) clamp(1rem, 5cqi, 4rem);
		border: 2px solid var(--t-rule);
	}

	.to,
	.call,
	.demands,
	.slogan {
		font-family: var(--font-display);
		text-transform: var(--case-display);
		font-feature-settings: var(--features-display);
		font-variation-settings: var(--axes-display);
	}

	.to {
		max-width: 22em;
		font-size: 1.35em;
		line-height: 1.2;
	}

	h1 {
		position: relative;
		align-self: stretch;
		font-family: var(--font-display);
		text-transform: var(--case-display);
		font-feature-settings: var(--features-display);
		font-variation-settings: var(--axes-display);
		font-size: 16cqi;
		font-weight: 400;
		line-height: 1;
		white-space: nowrap;
		color: var(--t-accent);
	}

	.measure {
		position: absolute;
		top: 0;
		left: 0;
		display: flex;
		align-items: start;
		font-size: 100px;
		visibility: hidden;
		pointer-events: none;
	}

	.call {
		font-size: 2.2em;
		line-height: 1.1;
	}

	.body {
		max-width: 34em;
	}

	.demands {
		display: flex;
		flex-direction: column;
		align-self: stretch;
		list-style: none;
		font-size: 1.5em;
		line-height: 1.15;
		border-block: 2px solid var(--t-rule);

		li {
			padding: 0.4em 0;
		}

		li + li {
			border-top: 1px solid var(--t-rule);
		}
	}

	.tongues {
		color: var(--t-muted);
	}

	.slogan {
		max-width: 16em;
		padding: 0.35em 0.8em;
		background: var(--t-accent);
		color: var(--t-on-accent);
		font-size: 1.6em;
		line-height: 1.2;
	}

	footer {
		margin-top: auto;
		font-size: 0.85em;
		color: var(--t-muted);
	}

	@container (min-width: 32rem) {
		.body {
			text-align: justify;
			hyphens: auto;
		}
	}

	@container (min-width: 48rem) {
		.demands {
			flex-direction: row;

			li {
				flex: 1;
				padding: 0.5em 0.75em;
			}

			li + li {
				border-top: 0;
				border-left: 1px solid var(--t-rule);
			}
		}
	}
</style>
