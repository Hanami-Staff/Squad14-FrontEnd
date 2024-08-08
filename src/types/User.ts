import { z } from "zod"

export const UserSchema = z.object({
  id: z.string().optional(),
  name: z.string()
    .trim()
    .min(1, "Por favor, informe um nome válido.")
    .max(50, "O nome só pode ter no máximo 50 caracteres."),
  email: z.string().email("Email inválido"),
  password: z.string()
    .trim()
    .min(6, "A senha tem que ter no mínimo 6 caracteres.")
    .max(50, "A senha só pode ter no máximo 50 caracteres."),
  confirmPassword: z.string()
    .trim()
    .min(6, "A senha tem que ter no mínimo 6 caracteres.")
    .max(50, "A senha só pode ter no máximo 50 caracteres."),
}).refine(data => data.password === data.confirmPassword, {
  message: "As senha são diferentes",
  path: ["confirmPassword"]
})

export const UpdateSchema = z.object({
  id: z.string().optional(),
  name: z.string()
    .trim()
    .min(1, "Por favor, informe um nome válido.")
    .max(50, "O nome só pode ter no máximo 50 caracteres.").optional(),
  email: z.string().email("Email inválido").optional(),
  password: z.string()
    .trim()
    .min(6, "A senha tem que ter no mínimo 6 caracteres.")
    .max(50, "A senha só pode ter no máximo 50 caracteres.").optional(),
  confirmPassword: z.string()
    .trim()
    .min(6, "A senha tem que ter no mínimo 6 caracteres.")
    .max(50, "A senha só pode ter no máximo 50 caracteres.").optional(),
}).refine(data => data.password === data.confirmPassword, {
  message: "As senha são diferentes",
  path: ["confirmPassword"]
})




export type UpdateUser = z.infer<typeof UpdateSchema>

export type User = z.infer<typeof UserSchema>

export const LoginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string()
    .trim()
    .min(6, "A senha tem que ter no mínimo 6 caracteres.")
    .max(50, "A senha só pode ter no máximo 50 caracteres.")
})

export type Login = z.infer<typeof LoginSchema>