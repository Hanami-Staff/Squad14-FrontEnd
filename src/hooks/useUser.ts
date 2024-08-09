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


  const getToken = () => {
    return localStorage.getItem('token');
  }

  const createUser = async (user: User) => {
    api.post("auth/register", user)
      .then(res => {
        dispatch({ type: Operations.CLOSE })
      })
      .catch(err => console.error(err.response.data.message))
  }


  const login = async (user: Login) => {
    api.post("auth/login", user)
      .then(res => {

        localStorage.setItem('token', res.data.token)


        setCookie('user', res.data, {
          sameSite: "strict"
        })

        setError('')
        setUser(res.data)
        dispatch({ type: Operations.CLOSE })
      })
      .catch(err => setError(err.response.data.message))
  }

  const getUserById = async (userId: string) => {
    const token = getToken();
    const res = await api.get(`/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    setUser(res.data)
  }

  const updateUser = async (userId: string, user: User) => {
    const token = getToken();
    api.put(`/user/${userId}`, user, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        dispatch({ type: Operations.TOAST, payload: { type: "OK", message: res.data } })
      })
      .then(() => getUserById(userId))
      .catch(err => {
        dispatch({ type: Operations.TOAST, payload: { type: "ERROR", message: err.response.data.message } })
      })
  }

  const deleteUser = async (userId: string) => {
    const token = getToken();
    api.delete(`/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(() => {
        dispatch({ type: Operations.CLOSE })
        logout()
      })
      .catch(() => { })
  }

  const logout = () => {

    localStorage.removeItem('token');

    router.push('/')
    deleteCookie('user', {
      sameSite: 'strict'
    })
    setUser(null)
  }

  return {
    createUser,
    deleteUser,
    updateUser,
    login,
    logout,
    error
  }
}

export default useUser
