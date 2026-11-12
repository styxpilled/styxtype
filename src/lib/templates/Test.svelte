<article>
	<header>
		<span class="tag">Timetable change</span>
		<span class="date">From 3 March</span>
	</header>

	<h1>Night ferry to Vaasa</h1>
	<p class="deck">The late crossing leaves forty minutes earlier for the winter season.</p>

	<div class="body">
		<p>
			The ferry now leaves Umeå at 21.20 and arrives in Vaasa shortly after one in the morning,
			local time. Cabins stay open until the ship docks, and breakfast is served on board from half
			past midnight.
		</p>
		<p>
			Travellers with cars should be at the terminal no later than 20.30. Foot passengers can board
			until 21.00. Tickets bought for the old departure are valid without change.
		</p>
	</div>

	<footer>Route 1, Umeå to Vaasa, crossing time 4 h 10 min</footer>
</article>

<style>
	article {
		display: flex;
		flex-direction: column;
		gap: clamp(1rem, 3cqi, 2.5rem);
		min-height: 100%;
		padding: clamp(1.25rem, 6cqi, 5rem);
		background: var(--t-paper);
		color: var(--t-ink);
		font-family: var(--font-body);
		text-transform: var(--case-body);
		font-feature-settings: var(--features-body);
		font-variation-settings: var(--axes-body);
		font-size: clamp(0.95rem, 0.8rem + 0.6cqi, 1.25rem);
		line-height: 1.55;
	}

	header {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		justify-content: space-between;
		gap: 0.5em 1em;
		font-size: 0.85em;
	}

	.tag {
		padding: 0.3em 0.7em;
		background: var(--t-accent);
		color: var(--t-on-accent);
	}

	.date {
		color: var(--t-muted);
	}

	h1 {
		max-width: 12ch;
		font-family: var(--font-display);
		text-transform: var(--case-display);
		font-feature-settings: var(--features-display);
		font-variation-settings: var(--axes-display);
		font-size: clamp(2.5rem, 11cqi, 9rem);
		font-weight: 400;
		line-height: 0.95;
		overflow-wrap: anywhere;
	}

	.deck {
		max-width: 28em;
		font-size: 1.3em;
		line-height: 1.35;
	}

	.body {
		padding-top: clamp(1rem, 3cqi, 2.5rem);
		border-top: 1px solid var(--t-rule);
		max-width: 34em;

		p + p {
			margin-top: 1em;
		}
	}

	@container (min-width: 40rem) {
		.body {
			max-width: none;
			columns: 2;
			column-gap: 2.5em;
		}
	}

	footer {
		margin-top: auto;
		font-size: 0.8em;
		color: var(--t-muted);
	}
</style>
