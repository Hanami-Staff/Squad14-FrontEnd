'use client'

import { Post } from "@/types"
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react"

interface Context {
  posts: Array<Post>,
  setPosts: Dispatch<SetStateAction<Array<Post>>>
}

const AppContext = createContext<Context | undefined>(undefined)

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<Array<Post>>([])

  return (
    <AppContext.Provider
      value={{
        posts: posts,
        setPosts: setPosts
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