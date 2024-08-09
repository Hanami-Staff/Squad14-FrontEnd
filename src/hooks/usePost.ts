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

  // Função para obter o token do localStorage
  const getToken = () => {
    return localStorage.getItem('token');
  }

  const realoadPosts = async () => {
    pathname === '/' ? getAllPosts() : getPostsByUser(user?.id!)
  }

  const createPost = async (post: Post) => {
    const token = getToken();
    api.post('/posts', post, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
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
    const token = getToken();
    api.get('/posts', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        setPosts(sortDate(res.data) as Array<Post>)
      })
      .catch(err => console.error("ERRO"))
  }

  const getPostsByUser = async (userId: string) => {
    const token = getToken();
    api.get(`/postsByUser/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        const ordenedPosts = sortDate(res.data)
        setPosts(ordenedPosts as Array<Post>)
      })
      .catch(err => console.error(err.response.data.message))
  }

  const getPostById = async (id: string): Promise<Post | undefined> => {
    try {
      const token = getToken();
      const res = await api.get(`/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const post = res.data
      getComments(id)
      return post
    } catch (err) {
      return undefined
    }
  }

  const updatePost = (id: string, post: Post) => {
    const token = getToken();
    api.put(`/posts/${id}`, post, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        dispatch({ type: Operations.TOAST, payload: { type: "OK", message: res.data } })
      })
      .catch(err => {
        dispatch({ type: Operations.TOAST, payload: { type: "ERROR", message: err.response.data.message } })
      })
      .finally(() => realoadPosts())
  }

  const deletePost = async (id: string) => {
    const token = getToken();
    api.delete(`/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
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
