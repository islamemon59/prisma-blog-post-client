"use clint"
import { Button } from "@/components/ui/button"
// import { useForm } from "@tanstack/react-form"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  // const form = useForm({
  //   defaultValues: {
      
  //   }
  // })
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="orderForm">
        </form>
      </CardContent>
      <CardFooter className="flex justify-end">
          <Button form="orderForm" type="submit">Submit</Button>

      </CardFooter>
    </Card>
  )
}
