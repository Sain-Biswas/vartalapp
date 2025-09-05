import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/chat/$conversation')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_protected/chat/$conversation"!</div>
}
