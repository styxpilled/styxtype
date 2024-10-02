<script lang="ts">
	const resources = ['https://www.canva.com/learn/typography-terms/'];
</script>

<ul>
	{#each resources as link}
		<li>
			<a href={link}>{link}</a>
		</li>
	{/each}
</ul>
