import { Lucia, TimeSpan } from 'lucia';

import { PrismaAdapter } from '@lucia-auth/adapter-prisma';
import prisma from './lib/db';
import { User, Session } from '@prisma/client';
import { cookies } from 'next/headers';
import { cache } from 'react';

const adapter = new PrismaAdapter(prisma.session, prisma.user);

export const lucia = new Lucia(adapter, {
  sessionExpiresIn: new TimeSpan(2, 'w'),
  sessionCookie: {
    name: 'session',
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === 'production',
    },
  },
  getUserAttributes: (attributes) => {
    return {
      email: attributes.email,
      emailVerified: attributes.emailVerified,
    };
  },
});

export const uncachedValidateRequest = async (): Promise<
  { user: User; session: Session } | { user: null; session: null }
> => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
  if (!sessionId) {
    return {
      user: null,
      session: null,
    };
  }

  const result = await lucia.validateSession(sessionId);

  try {
    if (result.session && result.session.fresh) {
      const sessionCookie = lucia.createSessionCookie(result.session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
    if (!result.session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
  } catch {
    console.error('Failed to set session cookie');
  }

  return result;
};

export const validateRequest = cache(uncachedValidateRequest);

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: {
      email: string;
      emailVerified: boolean;
    };
  }
}
