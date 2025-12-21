import {
  HeadContent,
  Outlet,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import type { QueryClient } from '@tanstack/react-query'
import TanStackQueryDevtools from '@/integrations/tanstack-query/devtools'
import { Container, CssBaseline, GlobalStyles } from '@mui/material'

interface MyRouterContext {
  queryClient: QueryClient
}

const globalStyles = (
  <GlobalStyles
    styles={({ palette, alpha }) => ({
      '#app': {
        height: '100%',
        backgroundImage: `
          linear-gradient(to right, ${alpha(palette.divider, 0.07)} 1px, transparent 1px),
          linear-gradient(to bottom, ${alpha(palette.divider, 0.07)} 1px, transparent 1px)
        `,
        backgroundSize: '64px 64px',
        overflow: 'auto',
      },
    })}
  />
)

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <HeadContent />
      <CssBaseline />
      {globalStyles}
      <Container maxWidth="md" sx={{ paddingY: 4 }}>
        <Outlet />
      </Container>
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
