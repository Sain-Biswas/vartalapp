import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import { z } from 'zod'

import { ModeToggleGroup } from '@/integrations/themes/mode-toggle-group'
import { authClient } from '@/lib/auth'

export const Route = createFileRoute('/_auth')({
  component: RouteComponent,
  validateSearch: z.object({
    redirect: z.string().optional().catch(''),
  }),
  beforeLoad: async ({ search }) => {
    const { data: session } = await authClient.getSession()

    if (session) {
      throw redirect({
        to: search.redirect ?? '/chat',
      })
    }
  },
})

function RouteComponent() {
  return (
    <main className="flex min-h-screen w-screen flex-col p-4 font-mono">
      <section id="home" className="flex grow items-center justify-center">
        <Outlet />
      </section>
      <footer className="flex justify-between">
        <div className="flex items-center">
          <p>&copy; Vartalapp 2025</p>
        </div>
        <ModeToggleGroup />
      </footer>
    </main>
  )
}
