<script lang="ts">
	import '@fontsource/bagnard';

	import Characters from '$components/Characters.svelte';
	import Specimen from '$components/Specimen.svelte';
	import Weights from '$components/Weights.svelte';
	import { characterSets } from '$lib';
	import { author, characters, links, title } from './data';
</script>

<div class="font col">
	<div class="header">
		<div class="title noise">
			<h2>{title}</h2>
			<h4>by {author.name}</h4>
		</div>
		<div class="links row">
			{#each links as link}
				<h5><a class="btn noise" href={link.href}>{link.label}</a></h5>
			{/each}
		</div>
	</div>
	<Specimen />
	<div class="details">
		<Weights weights={[{ italic: false, label: 'Regular', value: 400 }]} />
	</div>
	<Characters {characters} />
</div>

<style>
	.font {
		min-height: calc(100dvh - 7rem);
		font-family: 'Bagnard', 'Wingdings';
		height: 180rem;
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

	.links {
		font-family: var(--font-ui);
	}

	.btn.noise {
		--background: #ec3b3b;
		color: whitesmoke;
	}
</style>
