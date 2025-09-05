import { createFileRoute } from '@tanstack/react-router'

import { authClient } from '@/lib/auth'
import { Button } from '@/shadcn/ui/button'

export const Route = createFileRoute('/_protected/chat/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data, error, isPending } = authClient.useSession()
  const navigate = Route.useNavigate()

  if (isPending) return <div>Loding...</div>

  if (error) return <div>{error.message}</div>

  return (
    <div>
      <p>{data?.user.name}</p>
      <p>{data?.user.email}</p>

      <Button
        onClick={async () => {
          await authClient.signOut({
            fetchOptions: {
              onSuccess: () => {
                navigate({
                  to: '/signin',
                })
              },
            },
          })
        }}
        variant={'destructive'}
      >
        Sign Out
      </Button>
    </div>
  )
}
