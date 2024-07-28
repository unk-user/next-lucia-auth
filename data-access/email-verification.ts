import prisma from '@/lib/db';
import { generateIdFromEntropySize } from 'lucia';
import { TimeSpan, createDate } from 'oslo';

export async function createEmailVerificationToken(userId: string) {
  const token = generateIdFromEntropySize(25);
  return await prisma.emailVerification.create({
    data: {
      userId,
      token,
      tokenExpiresAt: createDate(new TimeSpan(2, 'h')),
    },
  });
}

export async function getEmailVErificationByToken(userId: string) {
  return await prisma.emailVerification.findFirst({
    where: {
      userId,
    },
  });
}

export async function deleteVerifyEmailToken(id: string) {
  await prisma.emailVerification.delete({
    where: {
      id,
    },
  });
}
