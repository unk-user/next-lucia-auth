import prisma from '@/lib/db';
import { type User } from '@prisma/client';

export async function getUser(id: string) {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
}

export async function getUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: {
      email,
    },
    include: {
      Account: true,
    },
  });
}

export async function createUser(
  email: string,
  emailVerified: boolean = false
) {
  return await prisma.user.create({
    data: {
      email,
      emailVerified,
    },
  });
}

export async function updateUser(id: string, data: Partial<User>) {
  return await prisma.user.update({
    where: {
      id,
    },
    data,
  });
}

export async function verifyUser(id: string) {
  return await prisma.user.update({
    where: {
      id,
    },
    data: {
      emailVerified: true,
    },
  });
}

export async function deleteUser(id: string) {
  return await prisma.user.delete({
    where: {
      id,
    },
  });
}
