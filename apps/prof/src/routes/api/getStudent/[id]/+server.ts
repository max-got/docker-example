import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
	try {
		const { id } = params;

		const res = await fetch(`http://server:3221/students/${id}`);

		if (!res.ok) {
			throw new Error('HTTP Error');
		}

		return new Response(JSON.stringify(await res.json()), {
			headers: {
				'content-type': 'application/json'
			}
		});
	} catch (error) {
		console.log(error);

		return new Response('Internal Server Error', {
			status: 500
		});
	}
};
