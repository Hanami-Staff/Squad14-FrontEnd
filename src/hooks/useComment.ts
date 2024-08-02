import { useAppContext } from "@/context/appContext"
/* import { useDialogContext } from "@/context/dialogContext" */
import { api } from "@/lib/api"
import { Comment } from "@/types/Comment"
import { sortDate } from "@/utils/dateUtils"

const useComment = () => {
  const { setComments } = useAppContext()
  /* const { dispatch } = useDialogContext() */

  const createComment = (postId: string, comment: Comment) => {
    api.post(`/comments`, comment)
      .then(() => console.log("Comentário adicionado com sucesso!!!"))
      .catch(err => console.error(err.response.data.message))
      .finally(() => getComments(postId))
  }

  const getComments = (postId: string) => {
    api.get(`/commentsByPost/${postId}`)
      .then(res => {
        const ordenedComments = sortDate(res.data)
        setComments(ordenedComments as Array<Comment>)
      })
      .catch(err => console.error(err.message.data.message))
  }

  /*  const deleteComment = (commentId: string) => {
     console.log("Comentario deletado");
 
   } */

  return {
    createComment,
    getComments,
    /* deleteComment */
  }
}

export default useComment