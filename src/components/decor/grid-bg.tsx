import { GlobalStyles } from '@mui/material'

export const gridBg = (
  <GlobalStyles
    styles={({ palette, spacing, lighten, alpha }) => ({
      '#app': {
        height: '100%',
        backgroundImage: `
          linear-gradient(to right, ${alpha(lighten(palette.divider, 0.8), 0.4)} 5px, transparent 5px),
          linear-gradient(to bottom, ${alpha(lighten(palette.divider, 0.8), 0.4)} 5px, transparent 5px)
        `,
        backgroundSize: '96px 96px',
        overflow: 'auto',
      },
      h1: {
        fontFamily: "'IBM Plex Mono'",
        fontWeight: 700,
      },
      'h1 > strong': {
        textDecorationLine: 'underline',
        textDecorationStyle: 'double',
        textDecorationColor: palette.divider,
      },
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
