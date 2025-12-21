import { getCard } from '@/api/card'
import { CredentialDataSchema } from '@/types/types'
import { Box, Container, Stack } from '@mui/material'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { toast } from 'react-toastify'

export const Route = createFileRoute('/unlock')({
  component: RouteComponent,
  validateSearch: CredentialDataSchema,
  loaderDeps: ({ search }) => ({ search }),
  loader: async ({ deps: { search } }) => {
    const content = await getCard(search.iv, decodeURIComponent(search.pw))
    return { content }
  },
  head: ({ loaderData }) => ({
    meta: [{ title: loaderData?.content.matter.title ?? 'HYN 2 U!!' }],
  }),
  onError: () => {
    toast.error('Uh oh. ')
    throw redirect({ to: '/' })
  },
})

function RouteComponent() {
  const {
    content: { content, matter },
  } = Route.useLoaderData()

  return (
    <Container maxWidth="md">
      <Stack>
        <Box
          component={'img'}
          src={matter.thumbnail}
          sx={{
            padding: 4,
            backgroundColor: ({ palette }) => palette.primary.main,
            color: ({ palette }) => palette.primary.contrastText,
            boxShadow: ({ palette, spacing }) =>
              `${spacing(1)} ${spacing(1)} ${palette.grey['800']}`,
            borderStyle: 'solid',
            borderWidth: ({ spacing }) => spacing(0.5),
            borderColor: ({ palette }) => palette.grey[800],
          }}
        ></Box>
        <Box
          component={'div'}
          dangerouslySetInnerHTML={{ __html: content }}
        ></Box>
      </Stack>
    </Container>
  )
}
