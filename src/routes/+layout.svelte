<script lang="ts">
	import '98.css';
	import '$lib/styles/base.css';
</script>

<main class="main">
	<div class="title-bar">
		<p class="title-bar-text">Willkommen in der Docker Vorlesung!</p>
		<div class="title-bar-controls">
			<button aria-label="Minimize" />
			<button aria-label="Maximize" />
			<button aria-label="Close" />
		</div>
	</div>
	<div class="window">
		<slot />
	</div>
</main>

<style>
	.main {
		max-width: 800px;
		width: 100%;
		margin: 0 auto;
		padding: 1rem;
		display: flex;
		flex-direction: column;
		margin: auto !important;
		align-self: center;
	}
</style>
