import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/friend/request')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_protected/friend/request"!</div>
}
