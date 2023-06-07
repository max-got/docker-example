import type { Student } from '$lib/types';
import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
	const get_students = async () => {
		const res = await fetch('/api/getStudents');
		if (!res.ok) {
			throw new Error('HTTP Error');
		}
		return await res.json();
	};

	return {
		students: (await get_students()) as Student[]
	};
}) satisfies PageLoad;
