<script lang="ts">
	import { observeFit } from './fit.ts';

	const lines = ['Night', 'Market'];
	const lineup = [
		{ name: 'Hollow Pines', time: '18.30' },
		{ name: 'Marta Ilves Trio', time: '20.00' },
		{ name: 'DJ Sunnuntai', time: '22.00' }
	];

	let headline = $state<HTMLElement>();
	let measure = $state<HTMLElement>();
	let size = $state(0);
	let split = $state(true);

	/**
	 * Fit the headline to the width, whatever the display font. A height budget stops tall
	 * stacks; on wide stages one line then gives a larger size than two.
	 */
	$effect(() => {
		if (!headline || !measure) return;
		return observeFit(headline, measure, (box, [single, ...rows]) => {
			const width = box * 0.98;
			const budget = innerHeight * 0.36;
			const one = Math.min((100 * width) / single, budget / 0.88);
			const two = Math.min((100 * width) / Math.max(...rows), budget / 0.88 / 2);
			split = two >= one;
			size = Math.max(one, two);
		});
	});
</script>

<article>
	<header>
		<span>Depot Nights</span>
		<span>3 of 5</span>
	</header>

	<h1 bind:this={headline} style:font-size={size ? `${size}px` : null}>
		{#if split}
			{#each lines as line (line)}<span>{line}</span>{/each}
		{:else}
			{lines.join(' ')}
		{/if}
		<span class="measure" bind:this={measure} aria-hidden="true">
			<span>{lines.join(' ')}</span>
			{#each lines as line (line)}<span>{line}</span>{/each}
		</span>
	</h1>

	<div class="info">
		<div class="when">
			<span>Friday</span>
			<strong>14 June</strong>
			<span>18.00 to 01.00</span>
			<span>Free entry</span>
		</div>

		<p class="intro">
			Food stalls, record sellers and live music in the yard of the old tram depot. Bring cash for
			the stalls and a jacket for after sunset.
		</p>

		<ol class="lineup">
			{#each lineup as act (act.name)}
				<li><span class="name">{act.name}</span><time>{act.time}</time></li>
			{/each}
		</ol>
	</div>

	<footer>Ratapihantie 6. Trams 3 and 9 stop at the gate.</footer>
</article>

<style>
	article {
		display: flex;
		flex-direction: column;
		gap: clamp(1.25rem, 4cqi, 3rem);
		min-height: 100%;
		padding: clamp(1.25rem, 5cqi, 4rem);
		background: var(--t-paper);
		color: var(--t-ink);
		font-family: var(--font-body);
		text-transform: var(--case-body);
		font-feature-settings: var(--features-body);
		font-variation-settings: var(--axes-body);
		font-size: clamp(0.95rem, 0.8rem + 0.5cqi, 1.2rem);
		line-height: 1.5;
	}

	header {
		display: flex;
		justify-content: space-between;
		gap: 1em;
	}

	h1 {
		position: relative;
		display: flex;
		flex-direction: column;
		font-family: var(--font-display);
		text-transform: var(--case-display);
		font-feature-settings: var(--features-display);
		font-variation-settings: var(--axes-display);
		font-size: 18cqi;
		font-weight: 400;
		line-height: 0.88;
		white-space: nowrap;
	}

	.measure {
		position: absolute;
		top: 0;
		left: 0;
		display: flex;
		flex-direction: column;
		align-items: start;
		font-size: 100px;
		visibility: hidden;
		pointer-events: none;
	}

	.info {
		display: grid;
		gap: clamp(1.25rem, 3cqi, 2.5rem);
		margin-top: auto;
	}

	.when {
		display: flex;
		flex-direction: column;
		align-self: start;
		padding: 1em 1.25em;
		background: var(--t-accent);
		color: var(--t-on-accent);

		strong {
			margin-bottom: 0.15em;
			font-family: var(--font-display);
			text-transform: var(--case-display);
			font-feature-settings: var(--features-display);
			font-variation-settings: var(--axes-display);
			font-size: 2.4em;
			font-weight: 400;
			line-height: 1.05;
		}
	}

	.intro {
		max-width: 30em;
	}

	.lineup {
		display: flex;
		flex-direction: column;
		gap: 0.4em;
		list-style: none;

		li {
			display: flex;
			align-items: baseline;
			justify-content: space-between;
			gap: 1em;
		}
	}

	.name {
		font-family: var(--font-display);
		text-transform: var(--case-display);
		font-feature-settings: var(--features-display);
		font-variation-settings: var(--axes-display);
		font-size: 1.5em;
		line-height: 1.15;
	}

	time {
		color: var(--t-muted);
		font-variant-numeric: tabular-nums;
	}

	footer {
		color: var(--t-muted);
	}

	@container (min-width: 40rem) {
		.info {
			grid-template-columns: auto minmax(0, 1fr);
		}

		.when {
			grid-row: span 2;
		}
	}

	@container (min-width: 64rem) {
		.info {
			grid-template-columns: auto minmax(0, 1fr) minmax(0, 1fr);
		}

		.when {
			grid-row: auto;
		}
	}
</style>
