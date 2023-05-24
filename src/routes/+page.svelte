<script lang="ts">
	import type { PageServerData } from './$types';
	import docker from '$lib/assets/docker.png';
	import node from '$lib/assets/node.svg';
	export let data: PageServerData;
</script>

<div>
	<div class="wrap">
		<h3>{data.env}</h3>
		{#if data.env === 'docker'}
			<img class="logo" src={docker} alt="docker" />
		{:else}
			<img class="logo" src={node} alt="node" />
		{/if}
	</div>
	<div class="status-bar">
		<p class="status-bar-field">Env: {data.env}</p>
		<p class="status-bar-field">Port: {data.port}</p>
		<p class="status-bar-field">CPU Usage: 110%</p>
	</div>
</div>

<style>
	.wrap {
		display: flex;
		width: 100%;
		justify-content: space-around;
	}

	.logo {
		width: 100px;
		height: 100px;
	}
</style>
