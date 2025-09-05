import { TanStackDevtools } from '@tanstack/react-devtools'
import {
  Link,
  Outlet,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'

import { OrigamiIcon } from 'lucide-react'
import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'

import type { QueryClient } from '@tanstack/react-query'

import { ModeToggleGroup } from '@/integrations/themes/mode-toggle-group'
import { Avatar, AvatarFallback } from '@/shadcn/ui/avatar'
import { Button } from '@/shadcn/ui/button'
import { Toaster } from '@/shadcn/ui/sonner'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <Outlet />
      <TanStackDevtools
        config={{
          position: 'bottom-left',
        }}
        plugins={[
          {
            name: 'Tanstack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
          TanStackQueryDevtools,
        ]}
      />
      <Toaster />
    </>
  ),
  notFoundComponent: () => (
    <main className="flex min-h-screen w-screen flex-col items-center justify-center gap-2 p-4">
      <header className="flex w-full items-center justify-start gap-2">
        <Avatar className="size-10 rounded-sm bg-muted">
          <AvatarFallback>
            <OrigamiIcon className="size-8" />
          </AvatarFallback>
        </Avatar>
        <h3>Vartalapp</h3>
      </header>
      <section
        id="message"
        className="grid grow place-content-center text-center font-mono"
      >
        <div className="mb-6 flex items-center justify-center gap-4">
          <div className="text-2xl font-black">404 - NOT FOUND</div>
          <div className="h-12 w-px border-1 border-border" />
          <p className="m-0">This page could not be found</p>
        </div>
        <small className="mb-2">
          You&apos;ve wandered into the wrong spot.
        </small>
        <small>
          But hey, no worries — let&apos;s get you back on track&#33;
        </small>
        <Button variant="link" size="default" className="group mt-6">
          <Link
            to="/"
            className="border-b-2 border-dashed border-foreground group-hover:border-0"
          >
            Return to home page &rarr;
          </Link>
        </Button>
      </section>
      <footer className="flex w-full items-center justify-end">
        <ModeToggleGroup />
      </footer>
    </main>
  ),
})
