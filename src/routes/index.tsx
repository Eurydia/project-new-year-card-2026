import { HOME_THEME } from '@/themes/home'
import { HomeView } from '@/views/home'
import { Container, ThemeProvider } from '@mui/material'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <ThemeProvider theme={HOME_THEME}>
      <Container maxWidth="sm">
        <HomeView />
      </Container>
    </ThemeProvider>
  )
}
