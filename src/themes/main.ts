import '@fontsource/fira-code'
import { createTheme } from '@mui/material'
export let MAIN_THEME = createTheme({
  typography: { fontFamily: `'Fira code', monospace` },
})

MAIN_THEME = createTheme(MAIN_THEME, {
  colorSchemes: {
    light: {
      palette: {
        primary: MAIN_THEME.palette.augmentColor({
          color: { main: '#ee8ed4ff' },
        }),
        secondary: MAIN_THEME.palette.augmentColor({
          color: { main: '#7a52f1ff' },
        }),
      },
    },
  },
})
