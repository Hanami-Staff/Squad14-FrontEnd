import { useAppContext } from "@/context/appContext"
import { useDialogContext } from "@/context/dialogContext"
import { api } from "@/lib/api"
import { Operations } from "@/types"
import { Post } from "@/types/Post"
import { sortDate } from "@/utils/dateUtils"

const usePost = () => {
  const { setPosts } = useAppContext()
  const { dispatch } = useDialogContext()

  const createPost = async (post: Post) => {
    api.post('/posts', post)
      .then(() => {
        dispatch({
          type: Operations.TOAST,
          payload: {
            type: 'OK',
            message: 'Postagem criada com sucesso'
          }
        })
      })
      .catch(err => console.error(err.response.data.message))
      .finally(() => getAllPosts())
  }

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

  const updatePost = async (id: string, post: Post) => {
    api.put(`/posts/${id}`, post)
      .then(res => {
        dispatch({ type: Operations.TOAST, payload: { type: "OK", message: res.data } })
      })
      .catch(err => {
        dispatch({ type: Operations.TOAST, payload: { type: "ERROR", message: err.response.data.message } })
      })
      .finally(() => getAllPosts())
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
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost
  }
}

export default usePost