<script lang="ts">
	import '98.css';
	import '$lib/styles/base.css';
	import { SvelteToast } from '@zerodevx/svelte-toast';
</script>

<main class="main flex items-center">
	<slot />
</main>
<SvelteToast options={{ reversed: true, intro: { y: 192 } }} />

<style>
	:root {
		--toastContainerTop: auto;
		--toastContainerRight: auto;
		--toastContainerBottom: 8rem;
		--toastContainerLeft: calc(50vw - 8rem);
	}
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
