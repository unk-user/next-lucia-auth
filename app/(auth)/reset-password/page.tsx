import { validateRequest } from "@/lib/validateRequest";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { redirect } from "next/navigation";



export default async function ForgotPasswordPage() {
  const { user } = await validateRequest()
  
  if(user) redirect('/dashboard');

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Forgot password?</CardTitle>
      </CardHeader>
      <CardDescription>
        Password reset link will be sent to your email.
      </CardDescription>
    </Card>
  )
}