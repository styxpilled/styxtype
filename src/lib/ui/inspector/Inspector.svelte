<script lang="ts">
	import type { Axis, FontMeta, IndexEntry } from '#lib/catalog.ts';
	import { fontStack } from '#lib/fonts.svelte.ts';
	import { settings, textDefaults } from '#lib/settings.svelte.ts';
	import Select from '#lib/ui/controls/Select.svelte';
	import Slider from '#lib/ui/controls/Slider.svelte';
	import Switch from '#lib/ui/controls/Switch.svelte';
	import Section from './Section.svelte';
	import Tuning from './Tuning.svelte';

	/** `text`: show the Text section, for views that use it. */
	type Props = { font: IndexEntry; meta: FontMeta | undefined; text: boolean };
	let { font, meta, text }: Props = $props();

	let own = $derived(settings.font);
	let faces = $derived(meta?.faces ?? []);
	let hasItalic = $derived(faces.some((f) => f.italic) && faces.some((f) => !f.italic));
	let styleFaces = $derived(faces.filter((f) => f.italic === (hasItalic && own.italic)));
	let face = $derived(styleFaces[0]);

	let defaultWeight = $derived.by(() => {
		const primary = faces.find((f) => f.file === meta?.primary)?.weight;
		return typeof primary === 'number' ? primary : 400;
	});
	let weight = $derived(own.weight ?? defaultWeight);
	let staticWeights = $derived(
		[...new Set(styleFaces.map((f) => f.weight).filter((w) => typeof w === 'number'))].sort(
			(a, b) => a - b
		)
	);

	const axisValue = (a: Axis) => own.axes[a.tag] ?? (a.tag === 'wght' ? weight : a.default);

	// opsz follows the font size unless the user sets it.
	const instanceMatches = (coordinates: Record<string, number>) =>
		(face?.axes ?? []).every(
			(a) => (a.tag === 'opsz' && !(a.tag in own.axes)) || coordinates[a.tag] === axisValue(a)
		);
	let instance = $derived(face?.instances.find((i) => instanceMatches(i.coordinates))?.name ?? '');

	function pickInstance(name: string) {
		const coordinates = face?.instances.find((i) => i.name === name)?.coordinates;
		if (!coordinates) return;
		settings.edit((f) => {
			const opsz = f.axes.opsz;
			f.axes = Object.fromEntries(Object.entries(coordinates).filter(([tag]) => tag !== 'opsz'));
			if (opsz !== undefined) f.axes.opsz = opsz;
		});
	}

	let version = $derived(meta?.version?.match(/\d+(\.\d+)+/)?.[0] ?? meta?.version);
	let sourceHost = $derived(meta?.source ? new URL(meta.source).host.replace(/^www\./, '') : null);
</script>

<div class="inspector">
	<section class="about">
		<h2 style:font-family={fontStack(font.slug)}>{font.name}</h2>
		{#if meta}
			{#if meta.designers.length}
				<p class="designers">
					{#each meta.designers as d, i (d.name)}
						{#if i > 0}{i === meta.designers.length - 1 ? ' and ' : ', '}{/if}
						{#if d.url}<a href={d.url} target="_blank" rel="external noreferrer">{d.name}</a
							>{:else}{d.name}{/if}
					{/each}
				</p>
			{/if}
			{#if meta.description}
				<p class="description">{meta.description}</p>
			{/if}
			<dl>
				<dt>License</dt>
				<dd>
					{#if meta.license.url}
						<a href={meta.license.url} target="_blank" rel="external noreferrer">
							{meta.license.id ?? 'License text'}
						</a>
					{:else}
						{meta.license.id ?? 'Unknown'}
					{/if}
				</dd>
				{#if version}
					<dt>Version</dt>
					<dd class="num">{version}</dd>
				{/if}
				{#if meta.source}
					<dt>Source</dt>
					<dd><a href={meta.source} target="_blank" rel="external noreferrer">{sourceHost}</a></dd>
				{/if}
			</dl>
		{/if}
	</section>

	{#if text}
		<Section title="Text">
			<Slider
				label="Size"
				bind:value={settings.size}
				min={8}
				max={160}
				unit=" px"
				onreset={settings.size !== textDefaults.size
					? () => (settings.size = textDefaults.size)
					: undefined}
			/>
			<Slider
				label="Line height"
				bind:value={settings.lineHeight}
				min={0.8}
				max={2.5}
				step={0.05}
				onreset={settings.lineHeight !== textDefaults.lineHeight
					? () => (settings.lineHeight = textDefaults.lineHeight)
					: undefined}
			/>
			<Slider
				label="Letter spacing"
				bind:value={settings.tracking}
				min={-0.1}
				max={0.3}
				step={0.005}
				unit=" em"
				onreset={settings.tracking !== textDefaults.tracking
					? () => (settings.tracking = textDefaults.tracking)
					: undefined}
			/>
		</Section>
	{/if}

	{#if hasItalic || staticWeights.length > 1 || face?.instances.length}
		<Section title="Style">
			{#if hasItalic}
				<Switch
					label="Italic"
					checked={own.italic}
					onchange={(on) => settings.edit((f) => (f.italic = on))}
				/>
			{/if}
			{#if staticWeights.length > 1}
				<Select
					label="Weight"
					value={String(weight)}
					options={staticWeights.map((w) => ({ value: String(w), label: String(w) }))}
					onchange={(w) => settings.edit((f) => (f.weight = Number(w)))}
				/>
			{/if}
			{#if face?.instances.length}
				<Select
					label="Instance"
					value={instance}
					options={[
						...(instance ? [] : [{ value: '', label: 'Custom' }]),
						...face.instances.map((i) => ({ value: i.name, label: i.name }))
					]}
					onchange={pickInstance}
				/>
			{/if}
		</Section>
	{/if}

	<Tuning
		{meta}
		axes={face?.axes ?? []}
		{own}
		edit={(change) => settings.edit(change)}
		{axisValue}
	/>
</div>

<style>
	.inspector {
		display: grid;
		gap: var(--space-2);
	}

	.about {
		display: grid;
		gap: var(--space-3);
	}

	.inspector > :global(section + section) {
		padding-top: var(--space-2);
		border-top: 1px solid var(--border);
	}

	h2 {
		font-size: 1.75rem;
		font-weight: normal;
		line-height: 1.2;
		color: var(--ink);
		overflow-wrap: anywhere;
	}

	.designers {
		margin-top: calc(-1 * var(--space-2));
		color: var(--text-muted);
	}

	.description {
		font-size: var(--text-sm);
		color: var(--text-muted);
	}

	dl {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: var(--space-1) var(--space-4);
		margin: 0;
		font-size: var(--text-sm);
	}

	dt {
		color: var(--text-muted);
	}

	dd {
		margin: 0;
		overflow-wrap: anywhere;
	}
</style>
