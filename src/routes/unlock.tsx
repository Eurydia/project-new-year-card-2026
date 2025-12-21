import { CredentialDataSchema } from '@/types/types'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/unlock')({
  component: RouteComponent,
  validateSearch: CredentialDataSchema.optional(),
  loaderDeps: ({ search }) => ({ search }),
  loader: async ({ deps }) => {
    console.debug(deps)
  },
  onError: () => {
    throw redirect({ to: '/' })
  },
})

function RouteComponent() {
  return <div>Hello "/unlock"!</div>
}
