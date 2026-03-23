import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.findFirst({ where: { role: 'ADMIN' } });

  if (!admin) {
    console.log('No admin user found. Make sure your user has role ADMIN.');
    return;
  }

  const result = await prisma.lead.updateMany({
    where: { assignedToId: null },
    data: { assignedToId: admin.id },
  });

  console.log(
    `Assigned ${result.count} leads to ${admin.firstName} ${admin.lastName} (${admin.email})`,
  );
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
