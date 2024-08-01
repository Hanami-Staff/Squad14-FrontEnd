import { z } from "zod"

export const PostSchema = z.object({
  id: z.string().optional(),
  userId: z.string(),
  username: z.string().optional(),
  title: z.string()
    .trim()
    .min(1, "Por favor, informe um título válido.")
    .max(50, "O titulo só pode ter no máximo 50 caracteres."),
  content: z.string()
    .trim()
    .min(1, "Por favor, informe um conteúdo válido.")
    .max(150, "O conteúdo só pode ter no máximo 150 caracteres.")
  ,
  createdAt: z.string().optional()
})

export type Post = z.infer<typeof PostSchema>