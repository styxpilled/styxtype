<script lang="ts">
	import '@fontsource-variable/josefin-sans';
	import '@fontsource-variable/josefin-sans/wght-italic.css';
	let weight = $state(400);
	let min = 100;
	let max = 900;

	const colors = ['#ec1c00', '#f5b500', '#006021', '#ab0d44', '#435b9e'];
</script>

<div class="preview" style:font-weight={weight}>
	<h3>
		Josefin Sans
		<!-- {#each 'Josefin Sans'.split('') as char, i}
			<span style="color: {colors[i % colors.length]}">{char}</span>
		{/each} -->
	</h3>
	<p>
		<em><a href="https://indestructibletype.com/Jost">Josefin Sans</a></em> by
		<em><a href="https://indestructibletype.com">Santiago Orozco</a></em> is inspired by geometric sans
		serifs of the 1920 like Futura.
	</p>
	<label>
		<span class="label">Weight:</span><span>{weight}</span>
		<input type="range" bind:value={weight} {min} {max} />
	</label>
</div>

<style>
	.preview {
		font-family: 'Josefin Sans Variable', 'Wingdings';
		color: whitesmoke;
		background: repeating-linear-gradient(
				45deg,
				#717ed7,
				#717ed7 8px,
				transparent 8px,
				transparent 100px
			),
			repeating-linear-gradient(-45deg, #606dbc, #606dbc 8px, transparent 8px, transparent 100px),
			repeating-linear-gradient(
				45deg,
				transparent,
				transparent 16px,
				#262224 16px,
				#262224 24px,
				transparent 24px,
				transparent 100px
			),
			repeating-linear-gradient(
				-45deg,
				transparent,
				transparent 16px,
				#332e31 16px,
				#332e31 24px,
				transparent 24px,
				transparent 100px
			),
			linear-gradient(to bottom, #c474b5, #c474b5);
		/* background-attachment: fixed; */
		min-height: 25rem;
	}

	h3 {
		letter-spacing: -0.5rem;
	}
</style>
