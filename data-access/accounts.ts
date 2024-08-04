import prisma from '@/lib/db';
import crypto from 'node:crypto';

export async function hashPassword(plainTextPassword: string, salt: string) {
  return new Promise<string>((resolve, reject) => {
    crypto.pbkdf2(
      plainTextPassword,
      salt,
      10000,
      64,
      'sha512',
      (err, derivedKey) => {
        if (err) reject(err);
        resolve(derivedKey.toString('hex'));
      }
    );
  });
}

export async function createAccount(userId: string, password: string) {
  const salt = crypto.randomBytes(128).toString('base64');
  const hash = await hashPassword(password, salt);
  return await prisma.account.create({
    data: {
      userId,
      password: hash,
      salt,
      accountType: 'EMAIL',
    },
  });
}

export async function createAccountViaGithub(userId: string, githubId: number) {
  return await prisma.account.create({
    data: {
      userId,
      githubId,
      accountType: 'GITHUB',
    },
  });
}

export async function getAccountByUserId(userId: string) {
  return await prisma.account.findUnique({
    where: {
      userId,
    },
  });
}

export async function getAccountByGithubId(githubId: number) {
  return await prisma.account.findUnique({
    where: {
      githubId,
    },
  });
}

export async function updatePassword(userId: string, password: string) {
  const salt = crypto.randomBytes(128).toString('base64');
  const hash = await hashPassword(password, salt);
  return await prisma.account.update({
    where: {
      userId,
    },
    data: {
      password: hash,
      salt,
    },
  });
}
