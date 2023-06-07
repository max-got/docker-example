import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, params }) => {
	try {
		if (request.headers.get('content-type') !== 'application/json') {
			return new Response('bad request', { status: 400 });
		}

		//get id from params
		const { id } = params;

		if (!id) {
			return new Response('bad request', { status: 400 });
		}

		// do something

		const res = await fetch(`http://server:3221/students/${id}`, {
			method: 'DELETE'
		});
		if (!res.ok) {
			throw new Error('HTTP Error');
		}

		const response = await res.json();
		console.log(response);

		return new Response('ok', { status: 200 });
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
};
