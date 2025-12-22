import '@fontsource/fira-code/300'
import '@fontsource/fira-code/400'
import '@fontsource/fira-code/500'
import '@fontsource/fira-code/600'
import '@fontsource/fira-code/700'
import '@fontsource/ibm-plex-mono/700'
import { createTheme, type ThemeOptions } from '@mui/material'
import { grey } from '@mui/material/colors'

export const MAIN_THEME_OPT = {
  typography: { fontFamily: `'Fira code', monospace` },
  palette: {
    primary: { main: '#ee8ed4ff' },
    secondary: { main: '#7a52f1ff' },
    divider: grey[500],
  },
} satisfies ThemeOptions

export const MAIN_THEME = createTheme(MAIN_THEME_OPT)
