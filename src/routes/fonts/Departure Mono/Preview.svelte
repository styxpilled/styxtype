<svelte:head>
	<link rel="stylesheet" href="/font-source/departure-mono/index.css" />
</svelte:head>

<div class="preview">
	<h3>Departure Mono</h3>
	<p>
		<a href="https://departuremono.com/">Departure Mono</a> by
		<a href="https://www.helenazhang.com/">Helena Zhang</a> is a monospaced pixel font inspired by the
		constraints of early command-line and graphical user interfaces, the tiny pixel fonts of the late
		90s/early 00s, and sci-fi concepts from film and television.
	</p>
	<pre>
│ Flight  │ Destination ↑           │ Departing  │ Gate  │
├─────────┼─────────────────────────┼────────────┼───────┤
│ LH789   │ EUR Europa 1            │ 13:45      │ Z23   │
<span class="active">│ XX123   │ KBA Kuiper Alpha        │ 08:00      │ 22    │</span>
│ AF321   │ MAR Mars Landing        │ 09:15      │ 12    │
│ UA567   │ NTK New Tokyo           │ 11:20      │ C8    │
│ QF678   │ ZMB Zvezda Moonbase     │ 20:00      │ 17    │
  </pre>
</div>

<style>
	.preview {
		font-family: 'Departure Mono', 'Wingdings';
		color: #eee;
		background-color: #444;
		border-radius: 0;
		font-size: 22px;
	}

	h3 {
		font-size: 110px;
		letter-spacing: -10px;
	}

	pre {
		margin-top: 2rem;
		font-family: 'Departure Mono', 'Wingdings';
		line-height: 1.25;
	}

	.active {
		animation: blink 1.5s infinite steps(1);
	}

	@keyframes blink {
		0% {
			background-color: #444;
		}
		50% {
			background-color: #8aa788;
		}
		100% {
			background-color: #444;
		}
	}

	*::selection {
		background-color: #8aa788;
	}

	a:hover {
		color: #8aa788;
	}

	a:hover::selection {
		color: #eee;
	}
</style>
