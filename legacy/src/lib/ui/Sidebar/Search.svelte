<script lang="ts">
	let { searchFilter = $bindable() } = $props();
</script>

<div id="search" class="paper">
	<div id="font-search-container" class="">
		<input
			type="text"
			name="font-search"
			id="font-search"
			placeholder="Search"
			bind:value={searchFilter}
		/>
	</div>
	<label id="eye">
		eye
		<input type="checkbox" name="" id="" />
	</label>
</div>

<style>
	#search {
		position: sticky;
		top: 0;
		padding: 0.5rem;
		padding-left: 1rem;
		width: 100%;
		height: min-content;
		/* background-color: red; */
		z-index: 5;
		font-size: 2rem;
		background: linear-gradient(to bottom, #0e0e0c57, transparent);
		color: whitesmoke;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	#font-search {
		border-radius: 0.5rem;
		padding: 0 0.5rem;
		/* backdrop-filter: blur(2px); */
		margin: 0.5rem;
		flex: 1;
		width: 0;
		background: none;
		z-index: 2;
		/* background-color: red; */
	}

	#font-search-container {
		position: relative;
		display: flex;
		max-width: 30rem;
		margin-right: 1rem;
		--surface: #0e0e0c;
		flex-shrink: 1;
		flex: 1;
		width: 0;
		&::after {
			content: '';
			position: absolute;
			height: calc(100% - 16px);
			width: 100%;
			top: 50%;
			transform: translate(0, -50%);
			left: 0;
			border-radius: 0.5rem;
			outline: 4px solid #0e0e0caa;
			outline-offset: 4px;
			background-clip: content-box;
			background: radial-gradient(ellipse at 50% 50%, #2d2b28ee 0%, #0e0e0cee 90%);
			/* background:
				linear-gradient(var(--surface)), url('/images/grunge2.jpg'), url('/images/rust.jpg'); */
			filter: url(#noise-small) blur(0.65px);
			pointer-events: none;
			z-index: 1;
		}
	}

	label {
		display: none;

		& > input {
			height: 0;
			width: 0;
		}

		&::before,
		&::after {
			display: none !important;
		}
	}

	@media (max-width: 800px) {
		label {
			display: block;
		}
	}
</style>
