import { z } from 'zod/v4'

export const CredentialDataSchema = z.object({
  iv: z.string().trim().normalize().nonempty(),
  pw: z.string().trim().normalize().nonempty(),
})

export type CredentialData = z.output<typeof CredentialDataSchema>
