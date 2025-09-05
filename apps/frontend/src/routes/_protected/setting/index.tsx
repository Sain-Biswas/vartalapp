import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/setting/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_protected/setting/"!</div>
}
