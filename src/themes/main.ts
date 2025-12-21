import '@fontsource/fira-code/300'
import '@fontsource/fira-code/400'
import '@fontsource/fira-code/500'
import '@fontsource/fira-code/600'
import '@fontsource/fira-code/700'
import '@fontsource/ibm-plex-mono/700'
import { createTheme } from '@mui/material'
export const MAIN_THEME = createTheme({
  typography: { fontFamily: `'Fira code', monospace` },
  colorSchemes: {
    light: {
      palette: {
        primary: { main: '#ee8ed4ff' },
        secondary: { main: '#7a52f1ff' },
      },
    },
  },
})
