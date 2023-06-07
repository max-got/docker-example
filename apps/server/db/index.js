import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getStudents = async (req, res) => {
	const students = await prisma.student.findMany();
	res.json(students);
};

export const getStudent = async (req, res) => {
	const student = await prisma.student.findUnique({
		where: {
			id: Number(req.params.id),
		},
	});
	res.json(student);
};

export const createStudent = async (body) => {
	try {
		const { name, semester, studiengang } = body;
		const student = await prisma.student.create({
			data: {
				name,
				semester,
				studiengang,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		});
		return student;
	} catch (error) {
		console.log(error);
	}
};

export const updateStudent = async (req, res) => {
	const student = await prisma.student.update({
		where: {
			id: Number(req.params.id),
		},
		data: {
			...req.body,
		},
	});
	res.json(student);
};

export const deleteStudent = async (req, res) => {
	try {
		const search_student = await prisma.student.findUnique({
			where: {
				id: Number(req.params.id),
			},
		});
		if (!search_student) {
			res.status(404).json({ message: 'Student not found' });
		}

		const delete_student = await prisma.student.delete({
			where: {
				id: Number(req.params.id),
			},
		});
		return Number(req.params.id);
	} catch (error) {
		console.log(error);
	}
};
