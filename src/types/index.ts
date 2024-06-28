export enum Operations {
  "CREATE",
  "READ",
  "UPDATE",
  "DELETE",
  "CLOSE",
  "TOAST",
  "CLOSE_TOAST"
}

export type Post = {
  id: string,
  title: string,
  content: string,
  createdAt: string
}