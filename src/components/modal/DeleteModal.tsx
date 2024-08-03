'use client'

import { useDialogContext } from "@/context/dialogContext"
import { usePost } from "@/hooks"
import Button from '../buttons/Button'
import { Operations } from '@/types'
import Modal from './Modal'
import useComment from "@/hooks/useComment"

interface DeleteModalProps {
  id: string,
  postId?: string,
  type: "POST" | "COMMENT"
}


const DeleteModal = ({ id, type }: DeleteModalProps) => {
  const { deletePost } = usePost()
  const { deleteComment } = useComment()
  const { dispatch } = useDialogContext()



  return (
    <Modal
      className='min-w-[300px] w-[30%] max-w-[400px] modal text-white'
    >
      <h1 className='text-lg font-semibold'>
        Deseja deletar {type === "POST" ? 'essa postagem' : 'esse comentario'}?
      </h1>

      <div className="flex gap-2 justify-end">
        <Button
          className='btn-cancel'
          onClick={() => dispatch({ type: Operations.CLOSE })}
        >
          Cancelar
        </Button>
        <Button
          className='btn-delete'
          onClick={() => type === "POST" ? deletePost(id) : deleteComment(id)}
        >
          Deletar
        </Button>
      </div>
    </Modal>
  )
}

export default DeleteModal