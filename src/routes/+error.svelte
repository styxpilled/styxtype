<script>
	import { page } from '$app/stores';
</script>

<div class="error">
	<h1>
		{$page.status}
	</h1>
	{#if $page.error?.message}
		<h2>
			{$page.error.message}
		</h2>
	{/if}
	<div>
		{#if $page.status === 404}
			<p>Could not find ~{$page.url.pathname}!</p>
			<p>If you came here from a broken link, let us know on GitHub!</p>
			<p>If not, have you tried going to a site that exists instead of one that doesn't?</p>
			<p><a href="/">Let's go home...</a></p>
		{:else}
			Something went wrong... Tell us about it on Github!
		{/if}
	</div>
</div>

<style>
	.error {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1rem;
	}

	h1 {
		font-weight: 700;
	}

	p {
		font-size: 1.5rem;
		text-align: center;
	}

	a {
		border-bottom: 2px solid currentColor;
		color: rgb(75, 161, 253);
		text-decoration: none;
	}

	a:hover {
		border-bottom: 6px double currentColor;
	}
</style>
