import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
	const max = await prisma.student.upsert({
		where: {
			id: 1,
		},
		update: {},
		create: {
			name: 'Max Mustermann',
			semester: 1,
			studiengang: 'Informatik',
			createdAt: new Date(),
			updatedAt: new Date(),
		},
	});
	const alice = await prisma.student.upsert({
		where: {
			id: 2,
		},
		update: {},
		create: {
			name: 'Alice',
			semester: 2,
			studiengang: 'Informatik',
			createdAt: new Date(),
			updatedAt: new Date(),
		},
	});

	console.log({ alice, max });
}
main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
