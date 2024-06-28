import { useAppContext } from "@/context/appContext"
import { api } from "@/lib/api"
import { Post } from "@/types"
import { sortDate } from "@/utils/dateUtils"

const usePost = () => {
  const { setPosts } = useAppContext()

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

  return {
    getAllPosts,
    getPostById
  }
}

export default usePost