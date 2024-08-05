import { useAppContext } from "@/context/appContext"
import { useDialogContext } from "@/context/dialogContext"
import { api } from "@/lib/api"
import { Operations } from "@/types"
import { Post } from "@/types/Post"
import { sortDate } from "@/utils/dateUtils"
import useComment from "./useComment"
import { usePathname } from "next/navigation"

const usePost = () => {
  const { setPosts, user } = useAppContext()
  const { dispatch } = useDialogContext()
  const { getComments } = useComment()
  const pathname = usePathname()

  const realoadPosts = async () => {
    pathname === '/' ? getAllPosts() : getPostsByUser(user?.id!)
  }

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
      .finally(() => realoadPosts())
  }

  const getAllPosts = async () => {
    api.get('/posts')
      .then(res => {
        setPosts(sortDate(res.data) as Array<Post>)
      })
      .catch(err => console.error("ERRO"))
  }

  const getPostsByUser = async (userId: string) => {
    api.get(`/postsByUser/${userId}`)
      .then(res => {
        const ordenedPosts = sortDate(res.data)
        setPosts(ordenedPosts as Array<Post>)
      })
      .catch(err => console.error(err.response.data.message))
  }

  const getPostById = async (id: string): Promise<Post | undefined> => {
    try {
      const res = await api.get(`/posts/${id}`)
      const post = res.data
      getComments(id)
      return post
    } catch (err) {
      return undefined
    }
  }

  const updatePost = (id: string, post: Post) => {
    api.put(`/posts/${id}`, post)
      .then(res => {
        dispatch({ type: Operations.TOAST, payload: { type: "OK", message: res.data } })
      })
      .catch(err => {
        dispatch({ type: Operations.TOAST, payload: { type: "ERROR", message: err.response.data.message } })
      })
      .finally(() => realoadPosts())
  }



  const deletePost = async (id: string) => {
    api.delete(`/posts/${id}`)
      .then(res => {
        dispatch({ type: Operations.TOAST, payload: { type: "OK", message: res.data } })
      })
      .catch(err => {
        dispatch({ type: Operations.TOAST, payload: { type: "ERROR", message: err.response.data.message } })
      })
      .finally(() => realoadPosts())
  }

  return {
    createPost,
    getAllPosts,
    getPostsByUser,
    getPostById,
    updatePost,
    deletePost
  }
}

export default usePost