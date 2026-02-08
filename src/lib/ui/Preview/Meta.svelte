<script lang="ts">
	import { typedKeys } from '$lib/helpers';
	import { app } from '$lib/state.svelte';

	let { faces, featureSettings = $bindable(), settings = $bindable() } = $props();
</script>

<div id="preview-settings">
	<div id="description" class="paper">
		<p>{app.font?.description}</p>
	</div>
	<ul id="feature-settings" class="paper">
		{#each Object.keys(faces) as faceName}
			{@const face = faces[faceName]}
			{#each typedKeys(settings) as settingName}
				{@const setting = settings[settingName]}
				<label>
					{settingName}
					<input
						type="range"
						min={setting.min}
						max={setting.max}
						step={setting?.step || 1}
						bind:value={setting.value}
					/>
				</label>
			{/each}
			{#each face.availableFeatures as feature}
				<label>
					<input
						type="checkbox"
						name="{app.activeFont}-features"
						value={feature}
						bind:group={featureSettings[app.activeFont].features}
					/>
					{feature}
				</label>
			{/each}
			{#each Object.keys(face.variationAxes) as axisName}
				{@const axis = face.variationAxes[axisName]}
				<form>
					<label>
						{axisName}
						<input
							type="range"
							name="{app.activeFont}-axis"
							min={axis.min}
							max={axis.max}
							oninput={(e) => {
								featureSettings[app.activeFont].axes[axisName] = (
									e.target as typeof e.currentTarget
								).value;
							}}
						/>
					</label>
					<button
						type="reset"
						onclick={() => {
							featureSettings[app.activeFont].axes[axisName] = 'null';
						}}
					>
						Reset
					</button>
				</form>
			{/each}
		{/each}
	</ul>
</div>

<style>
	#feature-settings {
		display: flex;
		flex-direction: column;
	}

	#preview-settings {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		margin-right: 1rem;

		& > * {
			padding: 1rem;
		}
	}

	#description {
		width: 20rem;
	}
</style>
