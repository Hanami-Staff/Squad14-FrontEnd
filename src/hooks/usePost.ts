import { useAppContext } from "@/context/appContext"
import { useDialogContext } from "@/context/dialogContext"
import { api } from "@/lib/api"
import { Operations, Post } from "@/types"
import { sortDate } from "@/utils/dateUtils"

const usePost = () => {
  const { setPosts } = useAppContext()
  const { dispatch } = useDialogContext()

  const getAllPosts = async () => {
    api.get('/posts')
      .then(res => {
        setPosts(sortDate(res.data))
      })
      .catch(err => console.error("ERRO"))
  }

  const getPostById = async (id: string): Promise<Post | undefined> => {
    try {
      const res = await api.get(`/posts/${id}`)
      const post = res.data
      return post
    } catch (err) {
      return undefined
    }
  }

  const deletePost = async (id: string) => {
    api.delete(`/posts/${id}`)
      .then(res => {
        dispatch({ type: Operations.TOAST, payload: { type: "OK", message: res.data } })
      })
      .catch(err => {
        dispatch({ type: Operations.TOAST, payload: { type: "ERROR", message: err.response.data.message } })
      })
      .finally(() => getAllPosts())
  }

  return {
    getAllPosts,
    getPostById,
    deletePost
  }
}

export default usePost