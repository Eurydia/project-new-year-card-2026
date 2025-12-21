import { LockOpenRounded } from '@mui/icons-material'
import {
  Button,
  Container,
  OutlinedInput,
  Paper,
  Stack,
  Toolbar,
  useTheme,
} from '@mui/material'
import { useForm } from '@tanstack/react-form'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const nav = useNavigate()
  const { Field, Subscribe, handleSubmit } = useForm({
    defaultValues: {
      iv: 'Oim8lknHjqt9avcxC0QXFw==',
      pw: 'from-your-secret-admirer',
    },
    onSubmit: ({ value }) => {
      nav({
        to: '/unlock',
        search: {
          iv: encodeURIComponent(value.iv),
          pw: encodeURIComponent(value.pw),
        },
      })
    },
  })
  const { palette, spacing } = useTheme()
  return (
    <Container maxWidth="sm" sx={{ paddingTop: 4 }}>
      <form
        onSubmit={(e) => {
          e.stopPropagation()
          e.preventDefault()
          handleSubmit()
        }}
      >
        <Paper
          elevation={0}
          sx={{
            padding: 4,
            backgroundColor: ({ palette }) => palette.primary.main,
            color: ({ palette }) => palette.primary.contrastText,
            boxShadow: ({ palette, spacing }) =>
              `${spacing(1)} ${spacing(1)} ${palette.grey['800']}`,
            borderStyle: 'solid',
            borderWidth: ({ spacing }) => spacing(0.5),
            borderColor: ({ palette }) => palette.grey[800],
          }}
        >
          <Stack spacing={4}>
            <Stack spacing={2}>
              <Field name="iv">
                {({ state: { value }, handleBlur, handleChange }) => {
                  return (
                    <OutlinedInput
                      fullWidth
                      placeholder={'Enter IV'}
                      value={value}
                      onChange={({ target: { value } }) => handleChange(value)}
                      onBlur={handleBlur}
                      slotProps={{
                        root: {
                          sx: {
                            backgroundColor: 'white',
                            boxShadow: `${spacing(1)} ${spacing(1)} ${palette.grey['800']}`,
                          },
                        },
                      }}
                    />
                  )
                }}
              </Field>
              <Field name="pw">
                {({ state: { value }, handleBlur, handleChange }) => {
                  return (
                    <OutlinedInput
                      fullWidth
                      placeholder={'Enter password'}
                      value={value}
                      onChange={({ target: { value } }) => handleChange(value)}
                      onBlur={handleBlur}
                      slotProps={{
                        root: {
                          sx: {
                            backgroundColor: 'white',
                            boxShadow: ({ palette, spacing }) =>
                              `${spacing(1)} ${spacing(1)} ${palette.grey['800']}`,
                          },
                        },
                      }}
                    />
                  )
                }}
              </Field>
            </Stack>
            <Toolbar disableGutters variant="dense">
              <Subscribe selector={({ canSubmit }) => ({ canSubmit })}>
                {({ canSubmit }) => {
                  return (
                    <Button
                      variant="contained"
                      disableElevation
                      disableRipple
                      disabled={!canSubmit}
                      startIcon={<LockOpenRounded />}
                      type="submit"
                      onClick={handleSubmit}
                      sx={{
                        color: palette.secondary.contrastText,
                        backgroundColor: palette.secondary.main,
                        boxShadow: `${spacing(0.5)} ${spacing(0.5)} ${palette.grey['800']}`,
                      }}
                    >
                      Unlock
                    </Button>
                  )
                }}
              </Subscribe>
            </Toolbar>
          </Stack>
        </Paper>
      </form>
    </Container>
  )
}
