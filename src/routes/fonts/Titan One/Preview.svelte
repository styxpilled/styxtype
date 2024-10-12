<script lang="ts">
	import '@fontsource/titan-one';
</script>

<div class="preview">
	<div class="rel">
		<h3 class="outline">Titan One</h3>
		<h3 class="title-text">Titan One</h3>
	</div>
	<p>
		<a href="https://fonts.google.com/specimen/Titan+One">Titan One</a> by
		<a href="https://www.behance.net/erreefe">Rodrigo Fuenzalida</a> is a really fat display type with
		a happy and cheerful personality. It takes most of its essence from hand lettering with big brushes.
		It is designed to be used mainly on headers and short texts.
	</p>
</div>

<style>
	.preview {
		font-family: 'Titan One', 'Wingdings';
		color: #fef7d1;
		background-color: #ffd447;
	}

	h3::selection {
		background-color: #09b1ff89;
	}

	a::selection,
	p::selection {
		background-color: #fe42a0b7;
	}

	a:hover {
		color: #fe42a0;
	}

	.rel {
		position: relative;
	}

	.outline {
		user-select: none;
		-webkit-text-stroke: 22px #fe42a0;
		filter: drop-shadow(0.5rem 0.5rem #09b1ff);
		line-height: 1.2;
		font-size: 10rem;
	}

	.title-text {
		position: absolute;
		top: 0;
		line-height: 1.2;
		color: #fcfcfc;
		font-size: 10rem;
	}

	p {
		text-shadow: 2px 2px black;
	}
</style>
