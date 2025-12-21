import { CredentialDataSchema } from '@/types/types'
import { LockOpenRounded, WarningAmberRounded } from '@mui/icons-material'
import {
  Button,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Toolbar,
} from '@mui/material'
import { useForm } from '@tanstack/react-form'
import { useNavigate } from '@tanstack/react-router'
import type { FC } from 'react'

export const HomeView: FC = () => {
  const nav = useNavigate()
  const { Field, Subscribe, handleSubmit } = useForm({
    defaultValues: {
      iv: '',
      pw: '',
    },
    validators: {
      onMount: CredentialDataSchema,
      onBlur: CredentialDataSchema,
      onChange: CredentialDataSchema,
      onSubmit: CredentialDataSchema,
    },
    onSubmit: ({ value }) => {
      nav({ to: '/unlock', search: value })
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.stopPropagation()
        e.preventDefault()
        handleSubmit()
      }}
    >
      <Paper
        variant="outlined"
        sx={{
          padding: 4,
          boxShadow: ({ palette, spacing }) =>
            `${spacing(1.5)} ${spacing(1.5)} ${palette.grey['800']}`,
        }}
      >
        <Stack spacing={2}>
          <Field name="iv">
            {({ state: { value }, handleBlur, handleChange }) => {
              const error = value.trim().length === 0
              return (
                <TextField
                  fullWidth
                  required
                  placeholder={'Enter IV'}
                  value={value}
                  onChange={({ target: { value } }) => handleChange(value)}
                  onBlur={handleBlur}
                  error={error}
                  helperText={'Required'}
                  slotProps={{
                    input: {
                      endAdornment: error && (
                        <InputAdornment position="end">
                          <WarningAmberRounded color="warning" />
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              )
            }}
          </Field>
          <Field name="pw">
            {({ state: { value }, handleBlur, handleChange }) => {
              const error = value.trim().length === 0
              return (
                <TextField
                  fullWidth
                  required
                  placeholder={'Enter password'}
                  value={value}
                  onChange={({ target: { value } }) => handleChange(value)}
                  onBlur={handleBlur}
                  error={error}
                  helperText={error && 'required'}
                  slotProps={{
                    input: {
                      endAdornment: error && (
                        <InputAdornment position="end">
                          <WarningAmberRounded color="warning" />
                        </InputAdornment>
                      ),
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
                >
                  Unlock
                </Button>
              )
            }}
          </Subscribe>
        </Toolbar>
      </Paper>
    </form>
  )
}
