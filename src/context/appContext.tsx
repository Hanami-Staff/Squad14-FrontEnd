'use client'

import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react"
import { getCookie } from "cookies-next";
import { Post } from "@/types/Post"
import { User } from "@/types/User"
import { Comment } from "@/types/Comment";

interface Context {
  user: User | null,
  setUser: Dispatch<SetStateAction<User | null>>,
  posts: Array<Post>,
  setPosts: Dispatch<SetStateAction<Array<Post>>>,
  comments: Array<Comment>,
  setComments: Dispatch<SetStateAction<Comment[]>>,
}

const AppContext = createContext<Context | undefined>(undefined)

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<Array<Post>>([])
  const [user, setUser] = useState<User | null>(null)
  const [comments, setComments] = useState<Array<Comment>>([])

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
        comments: comments,
        setComments: setComments,
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