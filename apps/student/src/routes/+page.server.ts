import type { Student } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch }) => {
	try {
		const get_students = async () => {
			const res = await fetch('/api/getStudents');
			if (!res.ok) {
				throw new Error('HTTP Error, service unavailable');
			}
			return await res.json();
		};

		return {
			studenten: (await get_students()) as Student[]
		};
	} catch (error) {
		console.log(error);
		return {
			studenten: []
		};
	}
}) satisfies PageServerLoad;
