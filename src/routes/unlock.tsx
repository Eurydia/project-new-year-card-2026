import { gridBg } from '@/components/decor/grid-bg'
import { parseMd } from '@/services/md-processor'
import { themeWithDivider } from '@/themes/dynamic'
import { CredentialDataSchema } from '@/types/types'
import { Box, Stack, ThemeProvider } from '@mui/material'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { toast } from 'react-toastify'

export const Route = createFileRoute('/unlock')({
  component: RouteComponent,
  validateSearch: CredentialDataSchema,
  loaderDeps: ({ search }) => ({ search }),
  loader: async ({ deps: { search } }) => {
    // const content = await fetchAndDecryptCard(
    //   search.iv,
    //   decodeURIComponent(search.pw),
    // )
    const raw = await fetch(
      `${import.meta.env.BASE_URL}content/${search.iv}.md`,
    ).then((r) => r.text())
    return {
      content: parseMd(raw),
    }
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.content.matter.title} | Happy New Year 2026` },
    ],
    links: [
      {
        rel: 'icon',
        href: loaderData?.content.matter.favicon,
      },
    ],
  }),
  onError: (e) => {
    toast.error(`Uh oh. ${String(e)}`)
    throw redirect({ to: '/', replace: true })
  },
})

function RouteComponent() {
  const {
    content: { content, matter },
  } = Route.useLoaderData()

  const theme = themeWithDivider(matter.color)

  return (
    <ThemeProvider theme={theme}>
      {gridBg}
      <Stack spacing={4} alignItems={'center'}>
        <Box
          maxWidth={'100%'}
          component={'img'}
          src={matter.thumbnail}
          sx={{
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
          maxWidth={'sm'}
          component={'div'}
          dangerouslySetInnerHTML={{ __html: content }}
        ></Box>
      </Stack>
    </ThemeProvider>
  )
}
