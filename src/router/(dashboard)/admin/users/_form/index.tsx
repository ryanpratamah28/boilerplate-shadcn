import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(dashboard)/admin/users/_form/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(dashboard)/admin/users/_form/"!</div>
}
