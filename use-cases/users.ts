import { createAccount } from '@/data-access/accounts';
import { createEmailVerificationToken } from '@/data-access/email-verification';
import { createUser, getUserByEmail } from '@/data-access/users';

export async function registerUserUseCase(email: string, password: string) {
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return { error: 'User already exists' };
  }
  const user = await createUser(email);
  await createAccount(user.id, password);

  const emailVerification = await createEmailVerificationToken(user.id);
}
