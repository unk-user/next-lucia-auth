'use client';

import { SubmitButton } from '@/components/submit-button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFormState } from 'react-dom';
import { signup } from './action';
import { Divide } from 'lucide-react';
import Link from 'next/link';

export function SignupForm() {
  const [state, formAction] = useFormState(signup, { success: false });

  return (
    <>
      {!state?.success ? (
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Sign up</CardTitle>
            <CardDescription>Create a new account</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={formAction} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  required
                  placeholder="hello@example.con"
                  autoComplete="email"
                  name="email"
                  type="email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  required
                  autoComplete="new-password"
                  name="password"
                  type="password"
                />
              </div>
              {state?.fieldError ? (
                <ul className="list-disc space-y-1 rounded-lg border bg-destructive/10 p-2 text-[0.8rem] font-medium text-destructive">
                  {Object.values(state.fieldError).map((err) => (
                    <li className="ml-4" key={err}>
                      {err}
                    </li>
                  ))}
                </ul>
              ) : state?.formError ? (
                <p className="rounded-lg border bg-destructive/10 p-2 text-[0.8rem] font-medium text-destructive">
                  {state?.formError}
                </p>
              ) : null}
              <SubmitButton className="w-full" aria-label="submit-btn">
                Sign up
              </SubmitButton>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle>You're almost there!</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className='text-base'>
              Please check your email at {state?.email} and click the
              verification link to complete your registration.
            </CardDescription>
          </CardContent>
          <CardFooter>
            <p className="text-sm">
              Back to{' '}
              <Link href="/signin" className="underline">
                login
              </Link>
            </p>
          </CardFooter>
        </Card>
      )}
    </>
  );
}
