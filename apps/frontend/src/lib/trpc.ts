import { createTRPCClient, httpBatchLink } from '@trpc/client'
import { createTRPCOptionsProxy } from '@trpc/tanstack-react-query'
import type { TRPCAppRouter } from '../../../server/src/routes/register.route'

import { TanStackQueryProviderContext } from '@/main'

function getServerUrl() {
  if (import.meta.env.DEV) return 'http://localhost:3000'
  return window.location.origin
}

const trpcClient = createTRPCClient<TRPCAppRouter>({
  links: [httpBatchLink({ url: `${getServerUrl()}/api/trpc` })],
})

/**
 * trpc client instance to be used on frontend with tanstack react query
 */
export const trpc = createTRPCOptionsProxy<TRPCAppRouter>({
  client: trpcClient,
  queryClient: TanStackQueryProviderContext.queryClient,
})
