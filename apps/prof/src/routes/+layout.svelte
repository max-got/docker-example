<script lang="ts">
	import '../app.postcss';
	import { Toaster } from 'svelte-french-toast';
</script>

<main class="min-h-screen flex bg-slate-400">
	<slot />
</main>
<Toaster />
