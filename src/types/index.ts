import { z } from "zod"

export enum Operations {
  "CREATE",
  "READ",
  "UPDATE",
  "DELETE",
  "CLOSE",
  "TOAST",
  "CLOSE_TOAST"
}


export type ToastProps = {
  type: "OK" | "ERROR",
  message: string
}

export const PostSchema = z.object({
  id: z.string().optional(),
  title: z.string().trim().min(1, 'Informe um titulo válido').max(255, 'O máximo de caracteres foi atingido'),
  content: z.string().trim().min(1, 'Informe um conteúdo válido').max(255, 'O máximo de caracteres foi atingido'),
  createdAt: z.string().optional()
})


export type Post = z.infer<typeof PostSchema>