import { z } from "zod"

export const CommentSchema = z.object({
  id: z.string().optional(),
  user: z.string().optional(),
  userId: z.string().optional(),
  username: z.string().optional(),
  postId: z.string(),
  content: z.string()
    .trim()
    .min(1, "Por favor, informe um comentário válido.")
    .max(150, "O comentário só pode ter no máximo 150 caracteres."),
  createdAt: z.string().optional()
})


export type Comment = z.infer<typeof CommentSchema>