<script lang="ts">
</script>

<header class="noise">
	<div>
		<a href="/">styxtype</a>
	</div>
	<nav>
		<ul>
			<li>
				<a href="/serif">serif</a>
			</li>
			<li>
				<a href="/sans-serif">sans-serif</a>
			</li>
			<li>
				<a href="/serif">display</a>
			</li>
			<li>
				<a href="/sans-serif">monospace</a>
			</li>
		</ul>
	</nav>
	<nav>
		<ul>
			<li>
				<a href="/serif">pairings</a>
			</li>
			<li>
				<a href="/resources">resources</a>
			</li>
			<li>
				<a href="/battle">battle</a>
			</li>
		</ul>
	</nav>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
		padding: 0 1rem;
		height: 4rem;
		--background: lightskyblue;
		/* background-color: lightskyblue; */
		color: black;

		text-transform: uppercase;
		font-size: 1.5rem;
		font-weight: 500;

		& > * {
			display: flex;
			align-items: center;
		}
	}

	ul {
		display: flex;
		gap: 1rem;
	}
</style>
