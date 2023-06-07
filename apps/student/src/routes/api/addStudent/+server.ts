import type { RequestHandler } from './$types';

export const POST = (async ({ request }) => {
	try {
		const body = await request.json();
		console.log(body);

		if (!body) {
			return new Response('bad request', { status: 400 });
		}

		const res = await fetch(`http://server:3221/students`, {
			method: 'POST',
			body: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (!res.ok) {
			throw new Error('HTTP Error');
		}

		const response = await res.json();

		return new Response(JSON.stringify(response), { status: 200 });
	} catch (error) {
		const err = error as Error;
		return new Response(
			JSON.stringify({
				error: err.message || 'unknown error'
			}),
			{
				status: 500
			}
		);
	}
}) satisfies RequestHandler;
