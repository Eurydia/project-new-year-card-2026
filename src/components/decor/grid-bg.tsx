import { GlobalStyles } from '@mui/material'

export const gridBg = (
  <GlobalStyles
    styles={({ palette, spacing, lighten, alpha }) => ({
      '#app': {
        height: '100%',
        backgroundImage: `
          linear-gradient(to right, ${alpha(lighten(palette.divider, 0.7), 0.87)} 1px, transparent 1px),
          linear-gradient(to bottom, ${alpha(lighten(palette.divider, 0.7), 0.87)} 1px, transparent 1px)
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
