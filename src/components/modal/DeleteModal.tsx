'use client'

import { useDialogContext } from "@/context/dialogContext"
import { usePost } from "@/hooks"
import Button from '../buttons/Button'
import { Operations } from '@/types'
import Modal from './Modal'

interface DeleteModalProps {
  id: string
}


const DeleteModal = ({ id }: DeleteModalProps) => {
  const { deletePost } = usePost()
  const { dispatch } = useDialogContext()

  return (
    <Modal
      className='min-w-[300px] w-[30%] max-w-[400px] modal'
    >
      <h1 className='text-lg font-semibold'>
        Deseja deletar essa postagem?
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
          onClick={() => deletePost(id)}
        >
          Deletar
        </Button>
      </div>
    </Modal>
  )
}

export default DeleteModal