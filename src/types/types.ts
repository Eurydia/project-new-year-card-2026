import { z } from 'zod/v4'

export const CredentialDataSchema = z.object({
  iv: z.string().trim().normalize().nonempty(),
  pw: z.string().trim().normalize().optional(),
})

export type CredentialData = z.output<typeof CredentialDataSchema>

export const FrontmatterSchema = z.object({
  thumbnail: z.url(),
  color: z.string(),
  title: z.string(),
  favicon: z.url(),
})
