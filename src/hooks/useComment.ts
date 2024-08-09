import { useAppContext } from "@/context/appContext"
import { useDialogContext } from "@/context/dialogContext"
import { api } from "@/lib/api"
import { Operations } from "@/types"
import { Comment } from "@/types/Comment"
import { sortDate } from "@/utils/dateUtils"

const useComment = () => {
  const { setComments } = useAppContext()
  const { dispatch } = useDialogContext()

  // Função para obter o token do localStorage
  const getToken = () => {
    return localStorage.getItem('token');
  }

  const createComment = async (postId: string, comment: Comment) => {
    const token = getToken();
    api.post(`/comments`, comment, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(() => console.log("Comentário adicionado com sucesso!!!"))
      .catch(err => console.error(err.response.data.message))
      .finally(() => getComments(postId))
  }

  const getComments = async (postId: string) => {
    const token = getToken();
    api.get(`/commentsByPost/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        const ordenedComments = sortDate(res.data)
        setComments(ordenedComments as Array<Comment>)
      })
      .catch(err => console.error(err.message.data.message))
  }

  const getCommentById = async (commentId: string): Promise<Comment | undefined> => {
    try {
      const token = getToken();
      const res = await api.get(`/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const comment = res.data
      return comment
    } catch (err) {
      return undefined
    }
  }

  const updateComment = async (postId: string, commentId: string, comment: Comment) => {
    const token = getToken();
    api.put(`/comments/${commentId}`, comment, {
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
      .finally(() => getComments(postId))
  }

  const deleteComment = async (commentId: string) => {
    const token = getToken();
    const comment = await getCommentById(commentId)
    api.delete(`/comments/${commentId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        dispatch({ type: Operations.TOAST, payload: { type: "OK", message: res.data } })
      })
      .finally(() => getComments(comment?.postId!))
  }

  return {
    createComment,
    getComments,
    getCommentById,
    updateComment,
    deleteComment
  }
}

export default useComment
