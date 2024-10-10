<script lang="ts">
</script>

<header class="noise row responsive-row">
	<div>
		<a href="/">styxtype</a>
	</div>
	<nav>
		<ul class="row wrap">
			<li>
				<a href="/">serif</a>
			</li>
			<li>
				<a href="/">sans-serif</a>
			</li>
			<li>
				<a href="/">display</a>
			</li>
			<li>
				<a href="/">monospace</a>
			</li>
		</ul>
	</nav>
	<nav class="right">
		<ul class="row wrap">
			<li>
				<a href="/">pairings</a>
			</li>
			<li>
				<a href="/">resources</a>
			</li>
			<li>
				<a href="/">battle</a>
			</li>
		</ul>
	</nav>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
		view-transition-name: header;
		padding-left: 1rem;
		min-height: 4rem;
		width: calc(100dvw - 1.5rem);
		--background: lightskyblue;
		color: black;

		text-transform: uppercase;
		font-size: 1.5rem;
		font-weight: 500;

		& > * {
			display: flex;
			flex: 1;
			align-items: center;
		}
	}

	ul.row.responsive-row {
		gap: 1rem;

		@media (min-width: 512px) {
			flex-direction: row;
		}
	}

	.right {
		justify-content: flex-end;
	}
</style>
