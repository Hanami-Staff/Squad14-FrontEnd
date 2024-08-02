import { User } from "@/types/User";

export const verifyUser = (cookieUser: User, userId: string) => {
  if (cookieUser === null) return false
  if (cookieUser.id !== userId) return false
  return true
}