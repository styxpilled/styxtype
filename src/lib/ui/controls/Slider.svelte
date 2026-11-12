<script lang="ts">
	type Props = {
		label: string;
		value: number;
		min: number;
		max: number;
		step?: number;
		unit?: string;
		/** Replaces the shown value, for example 'auto'. */
		text?: string;
		/** Shows a reset button. */
		onreset?: () => void;
	};

	let {
		label,
		value = $bindable(),
		min,
		max,
		step = 1,
		unit = '',
		text,
		onreset
	}: Props = $props();

	const id = $props.id();
	let fill = $derived(((value - min) / (max - min)) * 100);
</script>

<div class="slider">
	<label for={id}>{label}</label>
	<span class="value">
		{#if onreset}
			<button class="reset" onclick={onreset} aria-label="Reset {label}">Reset</button>
		{/if}
		<output for={id} class="num">{text ?? `${value}${unit}`}</output>
	</span>
	<input {id} type="range" {min} {max} {step} bind:value style:--fill="{fill}%" />
</div>

<style>
	.slider {
		display: grid;
		grid-template-columns: 1fr auto;
		align-items: baseline;
		row-gap: var(--space-1);
	}

	label {
		font-size: var(--text-sm);
	}

	.value {
		display: flex;
		align-items: baseline;
		gap: var(--space-2);
	}

	output {
		font-size: var(--text-sm);
		color: var(--text-muted);
	}

	.reset {
		padding: 0;
		border: 0;
		background: none;
		font-size: var(--text-xs);
		color: var(--accent);
		cursor: pointer;
	}

	input {
		grid-column: 1 / -1;
		width: 100%;
		height: 1.25rem;
		margin: 0;
		background: transparent;
		appearance: none;
		cursor: pointer;
	}

	/* The track is a hairline, like a baseline. */
	input::-webkit-slider-runnable-track {
		height: 1px;
		background: linear-gradient(
			to right,
			var(--accent) var(--fill),
			var(--border-strong) var(--fill)
		);
	}

	input::-moz-range-track {
		height: 1px;
		background: var(--border-strong);
	}

	input::-moz-range-progress {
		height: 1px;
		background: var(--accent);
	}

	input::-webkit-slider-thumb {
		appearance: none;
		width: 0.75rem;
		height: 0.75rem;
		margin-top: calc(-0.375rem + 0.5px);
		border-radius: var(--radius-full);
		background: var(--surface);
		border: 1.5px solid var(--accent);
		box-shadow: var(--shadow-control);
	}

	input::-moz-range-thumb {
		width: 0.75rem;
		height: 0.75rem;
		border-radius: var(--radius-full);
		background: var(--surface);
		border: 1.5px solid var(--accent);
		box-shadow: var(--shadow-control);
	}

	input:focus-visible {
		outline-offset: 0;
		border-radius: var(--radius-chip);
	}
</style>
