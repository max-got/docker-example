<script lang="ts">
	import type { Student } from '$lib/types';
	import {
		Table,
		TableBody,
		TableCaption,
		TableCell,
		TableHead,
		TableHeader,
		TableRow
	} from '$components/ui/table';
	import { writable } from 'svelte/store';

	export let students: Student[];
	export let active_student: Student['id'] | null;

	$: student_store = writable(students);

	$: student_table_headers = writable(new Set<string>());
	$: students.forEach((student) => {
		Object.keys(student).forEach((key) => {
			student_table_headers.update((headers) => headers.add(key));
		});
	});
</script>

<div class="w-full mx-auto">
	<Table>
		<TableCaption>Alle Studenten</TableCaption>
		<TableHeader>
			<TableRow>
				{#each Array.from($student_table_headers) as header, i (i)}
					<TableHead>{header}</TableHead>
				{/each}
			</TableRow>
		</TableHeader>
		<TableBody>
			{#each $student_store as student, i (i)}
				<TableRow
					key={student.id}
					class={`
                        ${active_student === student.id ? 'bg-lime-200' : ''}
                        transition-all
                        duration-500
                        ease-in-out
                    `}
				>
					{#each Object.values(student) as value, i (i)}
						<TableCell>{value}</TableCell>
					{/each}
				</TableRow>
			{/each}
		</TableBody>
	</Table>
</div>
