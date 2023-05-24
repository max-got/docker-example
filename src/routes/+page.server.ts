import type { PageServerLoad } from './$types';
import 'dotenv/config';
import { NODE_ENV } from '$env/static/private';

export const load = (async () => {
	return {
		port: process.env.VITE_NODE_ENV_DOCKER !== 'false' ? 5050 : 5173,
		env: process.env.VITE_NODE_ENV_DOCKER !== 'false' ? process.env.VITE_NODE_ENV_DOCKER : NODE_ENV
	};
}) satisfies PageServerLoad;
