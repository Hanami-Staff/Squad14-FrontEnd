'use client'

import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react"
import { getCookie } from "cookies-next";
import { Post } from "@/types/Post"
import { User } from "@/types/User"

interface Context {
  user: User | null,
  setUser: Dispatch<SetStateAction<User | null>>,
  posts: Array<Post>,
  setPosts: Dispatch<SetStateAction<Array<Post>>>
}

const AppContext = createContext<Context | undefined>(undefined)

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<Array<Post>>([])
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    try {
      const cookieUser = JSON.parse(getCookie('user')!)
      setUser(cookieUser)
    } catch (error) {
    }
  }, [])

  return (
    <AppContext.Provider
      value={{
        posts: posts,
        setPosts: setPosts,
        user: user,
        setUser: setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = (): Context => {
  const context = useContext(AppContext)
  return context!
}