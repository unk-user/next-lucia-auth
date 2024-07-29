import { Html, Button, Text } from '@react-email/components';
import * as React from 'react';
import { sendEmail } from './send-email';

export default function VerificationEmail({ token }: { token: string }) {
  return (
    <Html>
      <Text>this is your token: {token}</Text>
      <Button
        href=""
        style={{
          backgroundColor: 'black',
          padding: '10px',
          borderRadius: '2px',
          color: 'white',
        }}
      >
        Verify Email
      </Button>
    </Html>
  );
}

export async function sendVerificationEmail(
  to: string,
  subject: string,
  token: string
) {
  await sendEmail(to, subject, <VerificationEmail token={token} />);
}
