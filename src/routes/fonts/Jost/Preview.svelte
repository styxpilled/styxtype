<script lang="ts">
	import '@fontsource-variable/jost';
	let weight = $state(400);
	let min = 100;
	let max = 900;
</script>

<div class="preview noise" style:font-weight={weight}>
	<h3>Jost<span style="color: #c83737;">*</span></h3>
	<p>
		<em><a href="https://indestructibletype.com/Jost">Jost*</a></em> by
		<em><a href="https://indestructibletype.com">Owen Earl</a></em> is a spiritual successor to the famous
		Futura typeface.
	</p>
	<p>Wes Anderson, anyone?</p>
	<label>
		<span class="label">Weight:</span><span>{weight}</span>
		<input type="range" bind:value={weight} {min} {max} />
	</label>
</div>

<style>
	.preview {
		display: flex;
		flex-direction: column;
		align-items: center;

		font-family: 'Jost Variable', 'Wingdings';
		color: #333333;

		/* --background: whitesmoke;
		border-radius: 1rem;
		border: 2px solid var(--background);
		font-size: 1.5rem; */
		font-size: 1.5rem;

		& > * {
			text-align: center;
		}
	}

	h3 {
		font-size: 8rem;
	}

	p,
	label {
		max-width: 50dvw;
	}

	a:hover {
		color: #c83737;
	}
</style>
