import { zodResolver } from '@hookform/resolvers/zod'
import {
  IconAt,
  IconBrandGoogleFilled,
  IconLockFilled,
} from '@tabler/icons-react'
import { Link, createFileRoute } from '@tanstack/react-router'
import { EyeIcon, EyeOffIcon, OrigamiIcon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { authClient } from '@/lib/auth'
import { Avatar, AvatarFallback } from '@/shadcn/ui/avatar'
import { Button } from '@/shadcn/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shadcn/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shadcn/ui/form'
import { Input } from '@/shadcn/ui/input'

export const signupFormSchema = z.object({
  email: z.email({
    error: 'Please enter a valid email.',
  }),
  password: z.string().min(8, {
    error: 'Password must be at least 8 characters long.',
  }),
})

export const Route = createFileRoute('/_auth/signin')({
  component: signInRoute,
  validateSearch: z.object({
    redirect: z.string().optional().catch(''),
  }),
})

function signInRoute() {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [isProcessing, setIsProcessing] = useState<boolean>(false)

  const searchParams = Route.useSearch()

  const form = useForm({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  function toggleVisibility() {
    setIsVisible((prev) => !prev)
  }

  async function onSubmit(values: z.infer<typeof signupFormSchema>) {
    setIsProcessing(true)
    await authClient.signIn
      .email({
        ...values,
        callbackURL: searchParams.redirect || '/chat',
        fetchOptions: {
          onSuccess: () => {
            toast.success('User signin successful')
          },
          onError: () => {
            toast.error('User signin failed.')
          },
        },
      })
      .finally(() => setIsProcessing(false))
  }

  async function socialSignin() {
    setIsProcessing(true)
    await authClient.signIn
      .social({
        provider: 'google',
        callbackURL: searchParams.redirect || '/chat',
        fetchOptions: {
          onSuccess: () => {
            toast.success('User signin successful')
          },
          onError: () => {
            toast.error('User signin failed.')
          },
        },
      })
      .finally(() => setIsProcessing(false))
  }

  return (
    <Card className="gap-0 bg-accent p-0">
      <Card className="min-w-80 md:min-w-96">
        <CardHeader className="text-center">
          <Link to="/">
            <Avatar className="m-auto size-10 rounded-sm">
              <AvatarFallback className="size-10 rounded-sm">
                <OrigamiIcon className="size-8" />
              </AvatarFallback>
            </Avatar>
          </Link>
          <CardTitle>Sign in to Vartalapp</CardTitle>
          <CardDescription>Welcome back! Sign in to continue</CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          placeholder="person@example.com"
                          className="peer ps-9"
                          {...field}
                        />
                      </FormControl>
                      <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                        <IconAt size={16} aria-hidden />
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between">
                      <FormLabel>Password</FormLabel>

                      <Link
                        to="/forgot-password"
                        className="text-xs hover:underline"
                      >
                        forgot your password?
                      </Link>
                    </div>
                    <div className="relative">
                      <FormControl>
                        <Input
                          placeholder="person@example.com"
                          className="peer ps-9 pe-9"
                          type={isVisible ? 'text' : 'password'}
                          {...field}
                        />
                      </FormControl>
                      <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                        <IconLockFilled size={16} aria-hidden />
                      </div>
                      <button
                        className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 transition-[color,box-shadow] outline-none hover:text-foreground focus:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                        type="button"
                        onClick={toggleVisibility}
                        aria-label={
                          isVisible ? 'Hide password' : 'Show password'
                        }
                        aria-pressed={isVisible}
                        aria-controls="password"
                      >
                        {isVisible ? (
                          <EyeOffIcon size={16} aria-hidden="true" />
                        ) : (
                          <EyeIcon size={16} aria-hidden="true" />
                        )}
                      </button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isProcessing}>
                Continue
              </Button>
            </form>
          </Form>
        </CardContent>

        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 px-6">
          <hr className="border-dashed" />
          <span className="text-xs text-muted-foreground">
            Or continue With
          </span>
          <hr className="border-dashed" />
        </div>

        <CardFooter>
          <Button
            className="w-full"
            variant={'outline'}
            onClick={async () => {
              await socialSignin()
            }}
            disabled={isProcessing}
          >
            <IconBrandGoogleFilled />
            Google
          </Button>
        </CardFooter>
      </Card>
      <div className="flex items-center justify-center gap-0.5 p-4">
        <p>Don&apos;t have an account?</p>
        <Button variant={'link'} size={'sm'}>
          <Link to="/signup">Create account</Link>
        </Button>
      </div>
    </Card>
  )
}
