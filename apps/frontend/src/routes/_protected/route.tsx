import { Link, Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import { OrigamiIcon } from 'lucide-react'

import { authClient } from '@/lib/auth'

export const Route = createFileRoute('/_protected')({
  component: protectedLayout,
  beforeLoad: async ({ location }) => {
    const { data: session } = await authClient.getSession()

    if (!session) {
      throw redirect({
        to: '/signin',
        search: {
          redirect: location.href,
        },
      })
    }
  },
})

function protectedLayout() {
  return (
    <div className="flex h-screen">
      <header className="h-full border-t-2 border-border p-2 md:border-t-0 md:border-r-2">
        <Link
          to="/"
          className="grid size-10 place-content-center rounded-sm bg-accent"
        >
          <OrigamiIcon className="size-8" />
        </Link>
      </header>
      <div className="grow">
        <Outlet />
      </div>
    </div>
  )
}
