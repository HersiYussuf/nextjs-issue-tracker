// seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@example.com',
      image: 'https://example.com/alice.jpg',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Bob',
      email: 'bob@example.com',
      image: 'https://example.com/bob.jpg',
    },
  });

  const issue1 = await prisma.issue.create({
    data: {
      title: 'First Issue',
      description: 'This is the first issue',
      status: 'OPEN',
      assignedToUserId: user1.id,
    },
  });

  const issue2 = await prisma.issue.create({
    data: {
      title: 'Second Issue',
      description: 'This is the second issue',
      status: 'IN_PROGRESS',
      assignedToUserId: user2.id,
    },
  });

  await prisma.account.create({
    data: {
      userId: user1.id,
      type: 'oauth',
      provider: 'google',
      providerAccountId: 'google-alice',
      access_token: 'alice-access-token',
    },
  });

  await prisma.account.create({
    data: {
      userId: user2.id,
      type: 'oauth',
      provider: 'google',
      providerAccountId: 'google-bob',
      access_token: 'bob-access-token',
    },
  });

  await prisma.session.create({
    data: {
      sessionToken: 'session-token-alice',
      userId: user1.id,
      expires: new Date('2023-12-31T23:59:59Z'),
    },
  });

  await prisma.session.create({
    data: {
      sessionToken: 'session-token-bob',
      userId: user2.id,
      expires: new Date('2023-12-31T23:59:59Z'),
    },
  });

  await prisma.verificationToken.create({
    data: {
      identifier: 'alice@example.com',
      token: 'verification-token-alice',
      expires: new Date('2023-12-31T23:59:59Z'),
    },
  });

  await prisma.verificationToken.create({
    data: {
      identifier: 'bob@example.com',
      token: 'verification-token-bob',
      expires: new Date('2023-12-31T23:59:59Z'),
    },
  });
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
