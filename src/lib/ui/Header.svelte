<script lang="ts">
	import { app } from '$lib/state.svelte';
</script>

<div id="header" style="--preview-font-subset: {app.activeFont} Subset;">
	<h1>{app.activeFont}</h1>
	<span>{app.font?.category}</span>
	<span>{app.font?.license}</span>
	<div class="dropdown-content paper" id="mypopover" popover>
		<span>Switch theme:</span>
		{#each ['arcana', 'marathon'] as theme}
			<label class="filled">
				<span>{theme}</span>
				<input type="radio" name="theme" value={theme} bind:group={app.activeTheme} />
			</label>
		{/each}
	</div>
	<div class="logo">
		<button class="dropdown-button" popovertarget="mypopover">STYXTYPE</button>
	</div>
</div>

<style>
	#header {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr;
		grid-template-rows: 1fr;
		padding: 0 1rem;
		font-size: 3rem;
		white-space: pre;
	}

	.logo {
		font-weight: bold;
		text-align: end;
		/* background-color: red; */
		display: block;

		button {
			anchor-name: --my-anchor;
		}
	}

	h1 {
		font-family: var(--preview-font-subset);
	}

	span {
		text-align: center;
	}

	/* .dropdown {
		anchor-name: --my-anchor;
		width: fit-content;
	} */

	.dropdown-content {
		position: fixed;
		position-anchor: --my-anchor;
		top: anchor(bottom);
		margin: 0.5rem 1.5rem;
		left: calc(anchor(start) - 1.5rem);
		width: auto;
		max-width: 100%;
		background-color: var(--c1);
		border: 1px solid black;
		z-index: 20;
		font-size: 2rem;
		display: none;
		flex-direction: column;
		overflow: hidden;
		/* margin: 0; */

		& label {
			display: flex;
			flex-direction: column;
			justify-content: start;
			align-items: center;

			span {
				background: none !important;
			}
		}
	}

	[popover] {
		opacity: 0;
		transition:
			opacity 0.3s,
			display 0.3s step-end allow-discrete;
		display: none;

		&:popover-open {
			opacity: 1;
			display: flex;
			@starting-style {
				opacity: 0;
			}
		}
	}

	@media (max-width: 800px) {
		#header {
			grid-template-columns: 1fr 1fr;
			grid-template-rows: 1fr 1fr;
			font-size: 2rem;
		}

		.logo {
			grid-row: 1;
			grid-column: 2;
		}

		.dropdown-content {
			font-size: 1.4rem;
		}
	}
</style>
