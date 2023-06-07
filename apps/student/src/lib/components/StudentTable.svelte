<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { writable } from 'svelte/store';
	import { toast } from '@zerodevx/svelte-toast';
	import { current_user_id } from '$lib/stores/current_user_id';

	export let student: any = [];
	$: student_table_headers = writable(new Set<string>());
	$: student.forEach((student: any) => {
		Object.keys(student).forEach((key) => {
			student_table_headers.update((headers) => headers.add(key));
		});
	});

	async function deleteStudent(id: number) {
		try {
			const response = await fetch(`/api/deleteStudent/${id}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				}
			});

			if (response.ok) {
				invalidateAll();

				toast.push('Student wurde gelöscht', {
					theme: {
						'--toastBackground': '#48bb78',
						'--toastProgressBackground': '#2f855a',
						'--toastBarHeight': 0
					}
				});
			} else {
				toast.push('Student could not be deleted', {
					theme: {
						'--toastBackground': '#f56565',
						'--toastProgressBackground': '#c53030',
						'--toastBarHeight': 0
					}
				});
			}
		} catch (error) {
			console.log(error);
		}
	}
</script>

<div class="sunken-panel max-w-xl">
	<table class="interactive">
		<thead>
			<tr>
				{#each Array.from($student_table_headers) as header}
					<th class="hover:bg-cyan-400">{header}</th>
				{/each}
				<th class="hover:bg-cyan-400">actions</th>
			</tr>
		</thead>
		<tbody>
			{#each student as student}
				<tr class="hover:bg-cyan-600/10">
					{#each Object.values(student) as value}
						{#if value instanceof Date}
							<td
								>{value.toLocaleDateString('de-DE', {
									year: 'numeric',
									month: 'long',
									day: '2-digit',
									hour: '2-digit',
									minute: '2-digit',
									second: '2-digit'
								})}</td
							>
						{:else}
							<td>{value}</td>
						{/if}
					{/each}
					{#if $current_user_id === student.id || $current_user_id === 0}
						<td>
							<button class="hover:bg-red-300" on:click={() => deleteStudent(student.id)}
								>Delete</button
							>
						</td>
					{:else}
						<td> N/A </td>
					{/if}
				</tr>
			{/each}
		</tbody>
	</table>
</div>
<div class="mx-auto mt-12">
	<button on:click={() => current_user_id.set(0)}> Make me Admin :) </button>
</div>
