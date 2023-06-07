import express from 'express';
const app = express();
import * as http from 'http';
const server = http.createServer(app);
import { Server } from 'socket.io';
import {
	createStudent,
	deleteStudent,
	getStudent,
	getStudents,
	updateStudent,
} from './db/index.js';
const io = new Server(server, {
	cors: {
		origin: 'http://prof:5053/',
		methods: ['GET', 'POST'],
		credentials: true,
	},
});
import { OPTIONS } from './config.js';

app.use(express.json());

io.on('connection', (socket) => {
	console.log('a user connected');

	socket.on('disconnect', () => {
		console.log('user disconnected');
	});
});

app.get('/health', (req, res) => {
	res.status(200).send({ success: true, message: 'It is working' });
});

app.get('/', (req, res) => {
	res.send('<h1>Hello world</h1>');
});

app.get('/students', (req, res) => {
	try {
		getStudents(req, res);
	} catch (error) {
		console.log(error);
	}
});

app.get('/students/:id', async (req, res) => {
	try {
		await getStudent(req, res);
	} catch (error) {
		console.log(error);
	}
});

app.post('/students', async (req, res) => {
	try {
		const body = req.body;
		const new_student = await createStudent(body);
		io.emit('new_student', new_student);

		res.json(new_student);
	} catch (error) {
		console.log(error);
	}
});

app.put('/students/:id', (req, res) => {
	try {
		updateStudent(req, res);
	} catch (error) {
		console.log(error);
	}
});

app.delete('/students/:id', async (req, res) => {
	try {
		const deleted_student = await deleteStudent(req, res);
		io.emit('deleted_student', deleted_student);

		res.json(deleted_student);
	} catch (error) {
		console.log(error);
	}
});

server.listen({ host: OPTIONS.HOST, port: OPTIONS.PORT }, async () => {
	console.log(`Server running at http://${OPTIONS.HOST}:${OPTIONS.PORT}/`);
});

server.on('error', (e) => {
	if (e.code === 'EADDRINUSE') {
		console.log('Address in use, retrying...');
		setTimeout(() => {
			server.close();
			server.listen(OPTIONS.PORT, OPTIONS.HOST);
		}, 1000);
	}
});
