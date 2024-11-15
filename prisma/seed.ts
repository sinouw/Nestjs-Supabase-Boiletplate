import { PrismaClient } from '@prisma/client';
import { professions } from './seed-data/professions';
import { plans } from './seed-data/plans';
import { interests } from './seed-data/interests';

const prisma = new PrismaClient();

async function seedProfessions() {
    for (const profession of professions) {
        const result = await prisma.profession.upsert({
            where: { name: profession.name },
            update: profession,
            create: profession,
        });
        console.log(`Created profession: ${result.name}`);
    }
}

async function seedPlans() {
    for (const plan of plans) {
        const result = await prisma.plan.upsert({
            where: { name: plan.name },
            update: plan,
            create: plan,
        });
        console.log(`Created plan: ${result.name}`);
    }
}

async function seedInterests() {
    for (const interest of interests) {
        const result = await prisma.interest.upsert({
            where: { name: interest.name },
            update: interest,
            create: interest,
        });
        console.log(`Created interest: ${result.name}`);
    }
}

async function main() {
    console.log('🌱 Starting seeding...');

    await seedProfessions();
    await seedPlans();
    await seedInterests();

    console.log('🌱 Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    }); 