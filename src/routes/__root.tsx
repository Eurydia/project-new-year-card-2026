import TanStackQueryDevtools from '@/integrations/tanstack-query/devtools'
import { MAIN_THEME } from '@/themes/main'
import { Container, CssBaseline, ThemeProvider } from '@mui/material'
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

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <HeadContent />
      <ThemeProvider theme={MAIN_THEME}>
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
