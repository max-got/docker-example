<script lang="ts">
	import type { PageServerData } from './$types';

	import AddStudent from '$lib/components/AddStudent.svelte';
	import StudentTable from '$lib/components/StudentTable.svelte';
	import { slide } from 'svelte/transition';
	export let data: PageServerData;
</script>

<section class="py-5">
	<div class="window" style="width: 300px">
		<div class="title-bar">
			<p class="title-bar-text">Willkommen in der Docker Vorlesung!</p>
			<div class="title-bar-controls">
				<button aria-label="Minimize" />
				<button aria-label="Maximize" />
				<button aria-label="Close" />
			</div>
		</div>
		<div class="window-body">
			<p>
				Das hier ist das User-Interface für die Studierenden.<br /> Hier ist es möglich, sich in die
				Datenbank einzutragen.
			</p>
		</div>
	</div>
</section>

<section class="py-5">
	<AddStudent />
</section>
{#if data.studenten.length > 0}
	<section class="py-5" transition:slide|local={{ duration: 1000 }}>
		<StudentTable student={data.studenten} />
	</section>
{/if}
