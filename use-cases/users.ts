import { createAccount } from '@/data-access/accounts';
import { createEmailVerificationToken } from '@/data-access/email-verification';
import { createUser, getUserByEmail } from '@/data-access/users';
import { sendVerificationEmail } from '@/emails/verification-email';

export async function registerUserUseCase(email: string, password: string) {
  const existingUser = await getUserByEmail(email);
  if(!existingUser) {
    const user = await createUser(email);
    await 
  }
  
  if (existingUser && existingUser.emailVerified) {
    throw new Error('User already exists and is verified');
  }
  


  const user = await createUser(email);
  const account = await createAccount(user.id, password);

  return { id: user.id };
}
