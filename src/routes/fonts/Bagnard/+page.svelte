<script lang="ts">
	import '@fontsource/bagnard';

	import Characters from '$components/Characters.svelte';
	import Specimen from '$components/Specimen.svelte';
	import Weights from '$components/Weights.svelte';
	import { author, characters, description, license, links, title } from './data';
	import Bird from './theBird.svelte';
	import DropCap from './DropCap.svelte';
</script>

<div class="font col">
	<div class="header">
		<div class="title noise">
			<h2>{title}</h2>
			<h4>by {author.name}</h4>
		</div>
		<div class="info col">
			<div class="links row">
				{#each links as link}
					<h5><a class="btn noise" href={link.href}>{link.label}</a></h5>
				{/each}
			</div>
			<div class="">
				<h5 class="license {license} noise">
					License: {license}
				</h5>
			</div>
		</div>
	</div>
	<Specimen />
	<div class="details row responsive-row space">
		<Weights weights={[{ italic: false, label: 'Regular', value: 400 }]} />
		<p class="flexible">
			{description}
		</p>
	</div>
	<Characters {characters} />
	<div class="mosaic">
		<div class="sheet">
			<div class="background noise-overlay"></div>
			<Bird />
		</div>
		<div class="drop-cap">
			<DropCap />
		</div>
		<div class="blue noise">
			<h3>Alenthiel</h3>
			<h2>A DETAILED HISTORY OF VALINOR</h2>
		</div>
		<div class="bottom">
			<div>
				<h2>Laughing Cavalier</h2>
			</div>
			<p>
				By <a
					href="https://en.wikipedia.org/wiki/en:Frans_Hals"
					class="extiw"
					title="w:en:Frans Hals"><span title="Dutch painter (1580—1666)">Frans Hals</span></a
				>
				-
				<a
					rel="nofollow"
					class="external free"
					href="https://www.oxfordartonline.com/page/wallace-collection-guide"
					>https://www.oxfordartonline.com/page/wallace-collection-guide</a
				>, Public Domain, <a href="https://commons.wikimedia.org/w/index.php?curid=2169368">Link</a>
			</p>
		</div>
	</div>
</div>

<style>
	.font {
		min-height: calc(100dvh - 7rem);
		font-family: 'Bagnard', 'Wingdings';
	}

	.header {
		display: flex;
		justify-content: space-between;
		flex-direction: column;
		gap: 1rem;

		@media (min-width: 1024px) {
			flex-direction: row;
		}
	}

	.title {
		padding: 1rem;
		--background: #423350;
		color: #f7ccb9;
	}

	.info {
		font-family: var(--font-ui);
	}

	.links {
		flex-wrap: wrap;
	}

	.btn.noise {
		--background: #ec3b3b;
		color: whitesmoke;
		transition: background 500ms ease-in-out;
	}

	.btn.noise:hover {
		--background: #f94b4b;
	}

	.license {
		padding-left: 1rem;
		color: white;
		background-color: orange;

		&.SIL {
			background-color: rgb(6, 68, 6);
		}
	}

	p {
		font-size: 1.5rem;
	}

	.mosaic {
		display: grid;

		@media (min-width: 240px) {
			grid-template-columns: minmax(240px, 1fr);
			grid-template-rows: repeat(7, minmax(240px, max-content));
			gap: 2rem 2rem;
			grid-template-areas:
				'bird'
				'drop-cap'
				'blue'
				'bottom';
		}

		@media (min-width: 1024px) {
			grid-template-columns: 2fr 1.5fr 1.5fr;
			grid-template-rows: 1fr 1fr 1fr;
			gap: 2rem 2rem;
			grid-template-areas:
				'bird drop-cap drop-cap'
				'bird blue blue'
				'bottom bottom empty';
		}
	}

	.drop-cap {
		grid-area: drop-cap;
	}

	.blue {
		grid-area: blue;
		--background: #344265;
		padding: 2rem;
		margin-bottom: 1rem;

		& h3 {
			float: left;
			color: #98a3b5;
		}

		& h2 {
			font-size: 5rem;
			color: #e2dbc5;
			text-align: right;
			margin-left: auto;
			max-width: 15ch;
		}
	}

	.bottom {
		grid-area: bottom;
		background: linear-gradient(to left, #000 0%, transparent 50%, transparent 80%, #000000a0 100%),
			url('./cavalier.jpg');
		color: #f5dc91;
		text-align: center;
		display: flex;
		min-height: 32rem;
		justify-content: space-between;
		align-items: center;
		position: relative;
		background-size: 100%;
		background-position: center;
		box-shadow: 0 0 1rem 1rem #f1f1f1 inset;
		transition: background-size 500ms ease-in-out;

		&:hover {
			background-size: 110%;
		}

		& > * {
			max-width: 26rem;
			rotate: -90deg;
		}
	}

	.sheet {
		grid-area: bird;
		position: relative;
	}

	.sheet .background {
		top: 0.5%;
		left: 8%;
		z-index: 5;
	}

	:global(.sheet svg) {
		filter: blur(0.75px);
		width: auto;
		height: auto;
	}

	:global(.sheet svg text) {
		filter: blur(1px);
	}
</style>
