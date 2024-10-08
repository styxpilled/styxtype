<script lang="ts">
	import '@fontsource-variable/shantell-sans/full.css';

	import '@fontsource/merriweather/300.css';
	import '@fontsource/merriweather/400.css';
	import '@fontsource/merriweather/700.css';
	import '@fontsource/merriweather/900.css';
	import '@fontsource/merriweather/300-italic.css';
	import '@fontsource/merriweather/400-italic.css';
	import '@fontsource/merriweather/700-italic.css';
	import '@fontsource/merriweather/900-italic.css';

	// Sorkin Type, Eben Sorkin
	// https://github.com/SorkinType/Merriweather/

	let weight = $state(400);
	let min = 300;
	let max = 900;
</script>

<div class="preview noise-light" style:font-weight={weight}>
	<h3>Merriweather</h3>
	<p>
		Merriweather was designed to be a text face that is pleasant to read on screens. It features a
		very large x height, slightly condensed letterforms, a mild diagonal stress, sturdy serifs and
		open forms.
	</p>
	<label>
		<span class="label">Weight:</span><span>{weight}</span>
		<input type="range" bind:value={weight} {min} {max} step="100" />
	</label>
</div>

<style>
	.preview {
		font-family: 'Merriweather', 'Wingdings';
		color: #ecf0da;

		--background: #557663;
	}
</style>
