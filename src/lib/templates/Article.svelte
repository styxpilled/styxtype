<article>
	<header class="mast">
		<span class="paper">The Common Ground</span>
		<span>Vol. 4, No. 31, August 18, 1923</span>
	</header>

	<h1>The Twelve-Hour Day Is Over at Ashford</h1>

	<p class="deck">
		After four years of quiet pressure, the furnace crews go on three shifts of eight hours. The men
		say the fight is not finished.
	</p>

	<p class="byline">By Ruth Kalnins, labor correspondent</p>

	<div class="body">
		<p class="lead">
			For the first time since the Ashford Works opened, the men on the open-hearth furnaces walked
			out of the gate on Monday morning after eight hours, not twelve. Three crews now share the day
			where two shared it before, and the long turn of twenty-four hours, worked every second Sunday
			when the shifts changed over, is gone.
		</p>
		<p>
			The company gave no reason beyond a short notice posted at the time office. In the boarding
			houses along Furnace Street there was little doubt about the cause. Four years have passed
			since the great strike of 1919 was broken, and the men who came back to work never stopped
			asking for the shorter day.
		</p>
		<p>
			Wages are the next question. The hourly rate went up by a quarter, but a man who worked
			eighty-four hours a week now works fifty-six, and many families will take home less. At a
			meeting in the Polish Hall on Saturday, speakers in four languages asked for the same thing:
			an eight-hour day on a full week's pay.
		</p>

		<figure class="quote">
			<blockquote>
				<p>My boy asked me what I do at the mill. I told him I sleep there.</p>
			</blockquote>
			<figcaption>Tomas Wilk, furnace helper, eleven years at Ashford</figcaption>
		</figure>

		<p>
			Mrs. Anna Petrauskas, who keeps a boarding house for eleven men, said her table will now be
			set three times a day instead of two. "They come home in daylight," she said. "Some of them
			have not seen their own street at noon for years."
		</p>
		<p>
			The organizers who were driven out of the valley in 1919 have not come back in the open. But
			the union cards are passing from hand to hand again, and on Saturday the hall was full to the
			doors.
		</p>
	</div>
</article>

<style>
	article {
		min-height: 100%;
		padding: clamp(1.25rem, 6cqi, 5rem);
		background: var(--t-paper);
		color: var(--t-ink);
		font-family: var(--font-body);
		text-transform: var(--case-body);
		font-feature-settings: var(--features-body);
		font-variation-settings: var(--axes-body);
		font-size: clamp(1rem, 0.9rem + 0.3cqi, 1.2rem);
		line-height: 1.6;
	}

	.mast {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		justify-content: space-between;
		gap: 0.25em 1em;
		padding-bottom: 0.5em;
		border-bottom: 4px solid var(--t-ink);
		font-size: 0.85em;
		color: var(--t-muted);
	}

	.paper,
	h1,
	.quote blockquote,
	.lead::first-letter {
		font-family: var(--font-display);
		text-transform: var(--case-display);
		font-feature-settings: var(--features-display);
		font-variation-settings: var(--axes-display);
	}

	.paper {
		font-size: 1.5em;
		line-height: 1.2;
		color: var(--t-ink);
	}

	h1 {
		max-width: 16ch;
		margin-top: clamp(1.5rem, 5cqi, 3.5rem);
		font-size: clamp(2.25rem, 7.5cqi, 6.5rem);
		font-weight: 400;
		line-height: 1;
		text-wrap: balance;
		overflow-wrap: break-word;
	}

	.deck {
		max-width: 32em;
		margin-top: 0.9em;
		font-size: 1.3em;
		line-height: 1.4;
	}

	.byline {
		margin-top: 1.25em;
		padding-bottom: 1.25em;
		border-bottom: 1px solid var(--t-rule);
		font-size: 0.9em;
		color: var(--t-muted);
	}

	.body {
		margin-top: 1.5em;
		max-width: 34em;
		columns: 20em;
		text-wrap: pretty;
		column-gap: 2.5em;
		column-rule: 1px solid var(--t-rule);

		p + p {
			text-indent: 1.5em;
		}
	}

	@container (min-width: 40rem) {
		.body {
			max-width: none;
			text-align: justify;
			hyphens: auto;
		}
	}

	.lead::first-letter {
		float: left;
		margin: 0.08em 0.06em 0 0;
		font-size: 3.4em;
		line-height: 0.85;
		color: var(--t-accent);
	}

	.quote {
		column-span: all;
		margin: 1.5em 0;
		padding: 1em 0;
		border-block: 2px solid var(--t-accent);
		text-align: left;

		blockquote {
			max-width: 22em;
			margin: 0;
			font-size: 1.75em;
			line-height: 1.2;
			color: var(--t-accent);
		}

		figcaption {
			margin-top: 0.75em;
			font-size: 0.9em;
			color: var(--t-muted);
		}
	}
</style>
