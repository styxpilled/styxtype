<script lang="ts">
	import type { Axis, FontMeta } from '#lib/catalog.ts';
	import { groupFeatures } from '#lib/features.ts';
	import type { Tuned } from '#lib/settings.svelte.ts';
	import Slider from '#lib/ui/controls/Slider.svelte';
	import Switch from '#lib/ui/controls/Switch.svelte';
	import Section from './Section.svelte';

	type Props = {
		meta: FontMeta | undefined;
		axes: Axis[];
		own: Tuned;
		edit: (change: (t: Tuned) => void) => void;
		axisValue: (axis: Axis) => number;
	};
	let { meta, axes, own, edit, axisValue }: Props = $props();

	let groups = $derived(meta ? groupFeatures(meta.features, meta.feature_names) : []);
</script>

{#if axes.length}
	<Section title="Axes">
		{#snippet action()}
			{#if Object.keys(own.axes).length}
				<button class="reset" onclick={() => edit((t) => (t.axes = {}))}>Reset all</button>
			{/if}
		{/snippet}
		{#each axes as axis (axis.tag)}
			<Slider
				label={axis.name}
				min={axis.min}
				max={axis.max}
				step={axis.max - axis.min > 10 ? 1 : 0.01}
				text={axis.tag === 'opsz' && !(axis.tag in own.axes) ? 'auto' : undefined}
				onreset={axis.tag in own.axes ? () => edit((t) => delete t.axes[axis.tag]) : undefined}
				bind:value={() => axisValue(axis), (v) => edit((t) => (t.axes[axis.tag] = v))}
			/>
		{/each}
	</Section>
{/if}

{#each groups as { group, features } (group)}
	<Section title={group}>
		{#each features as feature (feature.tag)}
			<Switch
				label={feature.name}
				tag={feature.tag}
				checked={own.features[feature.tag] ?? feature.defaultOn}
				onchange={(on) =>
					edit((t) => {
						if (on === feature.defaultOn) delete t.features[feature.tag];
						else t.features[feature.tag] = on;
					})}
			/>
		{/each}
	</Section>
{/each}

<style>
	.reset {
		padding: 0;
		border: 0;
		background: none;
		font-size: var(--text-xs);
		color: var(--accent);
		cursor: pointer;
	}
</style>
