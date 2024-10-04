<script lang="ts">
	import '@fontsource/bagnard';

	import Characters from '$components/Characters.svelte';
	import Specimen from '$components/Specimen.svelte';
	import Weights from '$components/Weights.svelte';
	import { characterSets } from '$lib';
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
	<div class="details row space">
		<Weights weights={[{ italic: false, label: 'Regular', value: 400 }]} />
		<p>
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
	}

	.title {
		padding: 1rem;
		--background: #423350;
		color: #f7ccb9;
	}

	.info {
		font-family: var(--font-ui);
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
		max-width: 40dvw;
	}

	.mosaic {
		display: grid;
		grid-template-columns: 2fr 1.5fr 1.5fr;
		grid-template-rows: 1fr 1fr 1fr;
		gap: 2rem 2rem;
		grid-template-areas:
			'bird drop-cap drop-cap'
			'bird blue blue'
			'bottom bottom .';
	}

	.drop-cap {
		grid-area: drop-cap;
	}

	.blue {
		grid-area: blue;
		--background: #344265;
		display: flex;
		justify-content: space-between;
		padding: 2rem;
		margin-bottom: 1rem;

		& h3 {
			color: #98a3b5;
		}

		& h2 {
			font-size: 5rem;
			color: #e2dbc5;
			text-align: right;
			max-width: 55%;
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
