<script lang="ts">
	let timeOfDay = $state(10);
	const todMin = 6;
	const todmax = 18;

	let distance = $state(0.75);
	const distMin = 0;
	const distMax = 3;
</script>

<svelte:head>
	<link rel="stylesheet" href="/font-source/Gnomon/index.css" />
</svelte:head>

<div class="preview">
	<div class="title">
		<h3 class="shadow" style:font-variation-settings={`"DIST" ${distance}, "TOTD" ${timeOfDay}`}>
			GNOMON*
		</h3>
		<h3 style:font-variation-settings={`"DIST" 0, "TOTD" 6`}>GNOMON*</h3>
	</div>
	<p>
		<a href="https://indestructibletype.com/Gnomon">GNOMON*</a> is an experimental typeface by
		<a href="https://indestructibletype.com">Owen Earl</a>, taking advantage
	</p>
	<label>
		<span class="label">Time of Day:</span><span class="static">{timeOfDay}</span>
		<input type="range" bind:value={timeOfDay} min={todMin} max={todmax} step="0.05" />
	</label>
	<label>
		<span class="label">Distance:</span><span class="static">{distance}</span>
		<input type="range" bind:value={distance} min={distMin} max={distMax} step="0.05" />
	</label>
</div>

<style>
	.preview {
		font-family: 'Gnomon Simple', 'Wingdings';
		background-color: #ffaacc;
		color: white;
	}

	.title {
		position: relative;
		font-size: 8rem;
		height: 8rem;
		width: 8ch;
	}

	h3 {
		top: 0;
		/* left: calc(50% - 3ch); */
		position: absolute;
		font-size: 8rem;
		line-height: 1;
	}

	.shadow {
		color: #ff0066;
		font-variation-settings:
			'DIST' 100,
			'TOTD' 500;
	}

	.static {
		display: inline-block;
		width: 4ch;
	}

	label {
		color: #ff0066;
	}
</style>
