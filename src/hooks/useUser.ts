
import { useState } from "react"
import { deleteCookie, setCookie } from "cookies-next"
import { useAppContext } from "@/context/appContext"
import { Operations } from "@/types"
import { User, Login } from "@/types/User"
import { useRouter } from 'next/navigation'
import { api } from "@/lib/api"
import { useDialogContext } from "@/context/dialogContext"

const useUser = () => {
  const router = useRouter()
  const { dispatch } = useDialogContext()
  const { setUser } = useAppContext()
  const [error, setError] = useState('')

  const createUser = (user: User) => {
    api.post("/user", user)
      .then(res => {
        dispatch({ type: Operations.CLOSE })
      })
      .catch(err => console.error(err.response.data.message))
  }

  const login = (user: Login) => {
    api.post("/login", user)
      .then(res => {
        setCookie('user', res.data, {
          sameSite: "strict"
        })
        setError('')
        setUser(res.data)
        dispatch({ type: Operations.CLOSE })
      })
      .catch(err => setError(err.response.data.message))
  }

  const logout = () => {
    router.push('/')
    deleteCookie('user', {
      sameSite: 'strict'
    })
    setUser(null)
  }

  return {
    createUser,
    login,
    logout,
    error
  }
}

export default useUser