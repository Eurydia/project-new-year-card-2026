import { createTheme } from '@mui/material'
import { MAIN_THEME_OPT } from './main'

export const themeWithDivider = (divider: string) => {
  return createTheme(MAIN_THEME_OPT, { palette: { divider } })
}
