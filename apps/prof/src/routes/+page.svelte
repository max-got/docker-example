<script lang="ts">
	import type { PageData } from './$types';

	import StudentTable from '$components/custom/StudentTable.svelte';
	import { io } from 'socket.io-client';
	import { onDestroy } from 'svelte';
	import toast from 'svelte-french-toast';
	import type { Student } from '$lib/types';
	const socket = io('http://localhost:3221/', {
		transports: ['websocket']
	});
	export let data: PageData;

	$: students = data.students;

	let active_student: Student['id'] | null;

	$: active_student = null;

	const fetch_new_student = async (id: string) => {
		const res = await fetch(`/api/getStudent/${id}`);

		if (res.ok) {
			const student = await res.json();
			console.log(student);
			return student;
		}

		return null;
	};

	socket.on('new_student', (student: Student) => {
		console.log(student);
		fetch_new_student(String(student.id))
			.then((student) => {
				if (student) {
					toast.success(`Ein neuer Student (${student.id}) hat sich angemeldet.`, {
						position: 'top-right',
						duration: 5000,
						icon: '👋'
					});
					students = [...students, student];

					active_student = student.id;
				}
			})
			.catch((err) => {
				console.error('ERROR:', err);
			});
	});

	socket.on('deleted_student', (student: Student['id']) => {
		console.log(student);
		toast.error(`Ein Student (${student}) hat sich abgemeldet.`, {
			position: 'top-right',
			duration: 5000
		});
		students = students.filter((s) => s.id !== student);
	});

	onDestroy(() => {
		socket.disconnect();
	});
</script>

<div class="m-auto my-8 bg-slate-50 h-fit self-center">
	<h1 class="text-4xl font-bold text-center my-4">Angemeldete Studenten</h1>
	<p class="text-center">Hier kannst du alle Studenten sehen.</p>
	<p class="text-center">Momentan sind {students.length} Studenten angemeldet.</p>
	<hr class="my-4" />

	<StudentTable {students} {active_student} />
</div>
