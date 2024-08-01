import { z } from "zod"

export enum Operations {
  "CREATE",
  "READ",
  "UPDATE",
  "DELETE",
  "CLOSE",
  "TOAST",
  "CLOSE_TOAST",
  "LOGIN",
  "REGISTER"
}


export type ToastProps = {
  type: "OK" | "ERROR",
  message: string
}