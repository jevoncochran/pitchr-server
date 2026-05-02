import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const password = process.argv[2];

  if (!password) {
    console.error('Usage: npx ts-node scripts/seed-admin.ts <password>');
    process.exit(1);
  }

  const hash = bcrypt.hashSync(password, 8);

  const user = await prisma.user.upsert({
    where: { email: 'jevon@interconvisuals.com' },
    update: {},
    create: {
      firstName: 'Jevon',
      lastName: 'Cochran',
      email: 'jevon@interconvisuals.com',
      password: hash,
      role: 'ADMIN',
    },
  });

  console.log('Admin user created:', user.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
