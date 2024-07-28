import prisma from '@/lib/db';
import crypto from 'crypto';

async function hashPassword(plainTextPassword: string, salt: string) {
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

export async function createAccountViaGithub(userId: string, githubId: string) {
  return await prisma.account.create({
    data: {
      userId,
      githubId,
      accountType: 'GITHUB',
    },
  });
}

export async function getAccountByUserId(userId: string) {
  return await prisma.account.findFirst({
    where: {
      userId,
    },
  });
}

export async function getAccountByGithubId(githubId: string) {
  return await prisma.account.findFirst({
    where: {
      githubId,
    },
  });
}
