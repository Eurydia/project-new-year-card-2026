import TanStackQueryDevtools from '@/integrations/tanstack-query/devtools'
import { MAIN_THEME } from '@/themes/main'
import {
  Container,
  CssBaseline,
  GlobalStyles,
  ThemeProvider,
} from '@mui/material'
import { TanStackDevtools } from '@tanstack/react-devtools'
import type { QueryClient } from '@tanstack/react-query'
import {
  HeadContent,
  Outlet,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { ToastContainer } from 'react-toastify'
interface MyRouterContext {
  queryClient: QueryClient
}

const globalStyles = (
  <GlobalStyles
    styles={({ palette, alpha, spacing }) => ({
      '#app': {
        height: '100%',
        backgroundImage: `
          linear-gradient(to right, ${alpha(palette.divider, 0.07)} 1px, transparent 1px),
          linear-gradient(to bottom, ${alpha(palette.divider, 0.07)} 1px, transparent 1px)
        `,
        backgroundSize: '64px 64px',
        overflow: 'auto',
      },
      h1: { fontFamily: "'IBM Plex Mono'", fontWeight: 700 },
      blockquote: {
        borderLeftWidth: spacing(1),
        borderLeftStyle: 'solid',
        borderLeftColor: palette.divider,
        marginLeft: 0,
        marginRight: 0,
        marginTop: spacing(8),
        marginBottom: spacing(8),
        paddingLeft: spacing(4),
        paddingRight: spacing(4),
      },
    })}
  />
)

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <HeadContent />
      <ThemeProvider theme={MAIN_THEME}>
        {globalStyles}
        <CssBaseline />
        <Container maxWidth="md" sx={{ paddingY: 4 }}>
          <Outlet />
        </Container>
      </ThemeProvider>
      <ToastContainer position="bottom-left" autoClose={2000} limit={1} />
      <TanStackDevtools
        config={{
          position: 'bottom-right',
        }}
        plugins={[
          {
            name: 'Tanstack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
          TanStackQueryDevtools,
        ]}
      />
    </>
  ),
})
