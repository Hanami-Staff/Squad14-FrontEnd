import { Post } from "@/types"

export const formatedDate = (date: string): string => {
  return new Date(date).toLocaleString('pt-BR', {
    dateStyle: 'short'
  })
}

export const formatedDateWTime = (date: string | undefined): string | undefined => {
  return date! ? new Date(date).toLocaleString('pt-BR') : undefined
}


export const sortDate = (posts: Array<Post>): Array<Post> => {
  return posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}