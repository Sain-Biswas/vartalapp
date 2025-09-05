import { IconExclamationCircleFilled, IconLogout } from '@tabler/icons-react'
import type { UseNavigateResult } from '@tanstack/react-router'

import { authClient } from '@/lib/auth'
import { Avatar, AvatarFallback, AvatarImage } from '@/shadcn/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/shadcn/ui/dropdown-menu'
import { Skeleton } from '@/shadcn/ui/skeleton'

interface NavUserProps {
  navigate: UseNavigateResult<''>
}

export function NavUser({ navigate }: NavUserProps) {
  const { data: session, error, isPending } = authClient.useSession()

  if (isPending) return <Skeleton className="size-9 md:size-10" />

  if (error)
    return (
      <Avatar className="size-9 rounded-sm md:size-10">
        <AvatarFallback className="size-9 rounded-sm md:size-10">
          <IconExclamationCircleFilled className="size-8" />
        </AvatarFallback>
      </Avatar>
    )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="size-9 rounded-sm md:size-10">
          <AvatarImage src={session?.user.image || undefined} />
          <AvatarFallback className="size-9 rounded-sm md:size-10">
            {session?.user.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel className="flex gap-4 font-mono">
          <Avatar className="size-12 rounded-sm">
            <AvatarImage src={session?.user.image || undefined} />
            <AvatarFallback className="size-12 rounded-sm bg-primary text-3xl">
              {session?.user.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-lg">{session?.user.name}</p>
            <span className="text-sm">{session?.user.email}</span>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          variant="destructive"
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
        >
          Sign Out
          <DropdownMenuShortcut>
            <IconLogout />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
