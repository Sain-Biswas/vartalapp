import { IconMessage, IconSettings, IconUsers } from '@tabler/icons-react'
import { Link, Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import { OrigamiIcon } from 'lucide-react'

import { NavUser } from '@/components/system/nav-user'
import { authClient } from '@/lib/auth'
import { Avatar, AvatarFallback } from '@/shadcn/ui/avatar'
import { Button } from '@/shadcn/ui/button'
import { Separator } from '@/shadcn/ui/separator'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shadcn/ui/tooltip'

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
  loader: ({ location }) => {
    return {
      path: location.pathname,
    }
  },
})

function protectedLayout() {
  const path = Route.useLoaderData().path

  const navigate = Route.useNavigate()

  return (
    <div className="flex h-screen flex-col-reverse font-sans md:flex-row">
      <header className="flex-col justify-between border-t-2 border-sidebar-border bg-sidebar p-1 md:flex md:h-screen md:border-t-0 md:border-r-2 md:p-2">
        <div className="hidden flex-col items-center justify-center gap-3 md:flex">
          <Link to="/" className="mb-4">
            <Avatar className="size-10 rounded-sm">
              <AvatarFallback className="size-10 rounded-sm bg-sidebar-primary">
                <OrigamiIcon className="size-8 text-sidebar-primary-foreground" />
              </AvatarFallback>
            </Avatar>
          </Link>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="w-9"
                variant={path.startsWith('/chat') ? 'secondary' : 'ghost'}
              >
                <Link to="/chat" className="flex items-center gap-2">
                  <IconMessage />
                  <p className="sr-only sm:not-sr-only md:sr-only">Chats</p>
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent className="hidden md:block" side="right">
              Chats
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="w-9"
                variant={path.startsWith('/friend') ? 'secondary' : 'ghost'}
              >
                <Link to="/friend" className="flex items-center gap-2">
                  <IconUsers />
                  <p className="sr-only sm:not-sr-only md:sr-only">Friends</p>
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent className="hidden md:block" side="right">
              Friends
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="flex justify-around md:flex-col md:items-center">
          <Tooltip>
            <TooltipTrigger asChild className="md:hidden">
              <Button
                className=""
                variant={path.startsWith('/chat') ? 'secondary' : 'ghost'}
              >
                <Link to="/chat" className="flex items-center gap-2">
                  <IconMessage />
                  <p className="sr-only sm:not-sr-only md:sr-only">Chats</p>
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent className="hidden md:block">Chats</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild className="md:hidden">
              <Button
                className=""
                variant={path.startsWith('/friend') ? 'secondary' : 'ghost'}
              >
                <Link to="/friend" className="flex items-center gap-2">
                  <IconUsers />
                  <p className="sr-only sm:not-sr-only md:sr-only">Friends</p>
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent className="hidden md:block">Friends</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="md:w-9"
                variant={path.startsWith('/setting') ? 'secondary' : 'ghost'}
              >
                <Link to="/setting" className="flex items-center gap-2">
                  <IconSettings />
                  <p className="sr-only sm:not-sr-only md:sr-only">Settings</p>
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent className="hidden md:block" side="right">
              Settings
            </TooltipContent>
          </Tooltip>

          <Separator className="my-3 hidden md:inline" />

          <NavUser navigate={navigate} />
        </div>
      </header>
      <div className="grow">
        <Outlet />
      </div>
    </div>
  )
}
