<script lang="ts">
	import Cooper from './fonts/Cooper/Preview.svelte';
	import ShantellSans from './fonts/Shantell Sans/Preview.svelte';
	import XkcdScript from './fonts/xkcd-script/Preview.svelte';
	import DepartureMono from './fonts/Departure Mono/Preview.svelte';
	import Jost from './fonts/Jost/Preview.svelte';
	import Bagnard from './fonts/Bagnard/Preview.svelte';
	import YoungSerif from './fonts/Young Serif/Preview.svelte';
	import Zarathustra from './fonts/Zarathustra/Preview.svelte';
	import ExpandedHerbertarian from './fonts/Expanded Herbertarian/Preview.svelte';
</script>

<ul>
	<li>
		<ExpandedHerbertarian />
	</li>
	<li>
		<Zarathustra />
	</li>
	<li>
		<YoungSerif />
	</li>
	<li>
		<Bagnard />
	</li>
	<li>
		<Jost />
	</li>
	<li>
		<Cooper />
	</li>
	<li>
		<ShantellSans />
	</li>
	<li>
		<XkcdScript />
	</li>
	<li>
		<DepartureMono />
	</li>
</ul>

<style>
	ul {
		color: black;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	:global(li > .preview) {
		padding-bottom: 2rem;
	}
</style>
