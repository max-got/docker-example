<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { current_user_id } from '$lib/stores/current_user_id';

	let add_student_form_el: HTMLFormElement;

	let name = '';
	let semester = 0;
	let studiengang = '';

	let loading = false;
	const submit = async (event: Event) => {
		event.preventDefault();
		const data = JSON.stringify({ name, semester, studiengang });
		loading = true;
		const response = await fetch('/api/addStudent', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: data
		});

		if (response.ok) {
			console.log('Student added');
			//get the id of the new student
			const { id } = await response.json();

			current_user_id.set(id);

			invalidateAll();

			//reset the form
			add_student_form_el.reset();
		} else {
			console.log('Error');
		}

		loading = false;
	};
</script>

<form on:submit={submit} bind:this={add_student_form_el}>
	<div class="field-row-stacked" style="width: 200px">
		<label for="text">Name</label>
		<input id="text" type="text" placeholder="Mustermann" bind:value={name} required />
	</div>
	<div class="field-row-stacked" style="width: 200px">
		<label for="semester">Semester</label>
		<input id="semester" type="number" placeholder="1" bind:value={semester} required />
	</div>
	<div class="field-row-stacked" style="width: 200px">
		<label for="studiengang">Studiengang</label>
		<input
			id="studiengang"
			type="text"
			placeholder="Wirtschaftsinformatik"
			bind:value={studiengang}
			required
		/>
	</div>
	<button class="mt-4 w-full" type="submit" disabled={loading}>Submit</button>
</form>
