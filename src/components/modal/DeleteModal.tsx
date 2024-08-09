'use client'

import { useDialogContext } from "@/context/dialogContext"
import { usePost } from "@/hooks"
import Button from '../buttons/Button'
import { Operations } from '@/types'
import Modal from './Modal'
import useComment from "@/hooks/useComment"
import { useEffect, useState } from "react"
import useUser from "@/hooks/useUser"

interface DeleteModalProps {
  id: string,
  postId?: string,
  type: "POST" | "COMMENT" | "USER"
}


const DeleteModal = ({ id, type }: DeleteModalProps) => {
  const { deletePost } = usePost()
  const { deleteComment } = useComment()
  const { deleteUser } = useUser()
  const { dispatch } = useDialogContext()

  const [modalElements, setModalElements] = useState({
    title: '',
    onClick: (id: string) => { }
  });


  useEffect(() => {
    switch (type) {
      case "POST":
        setModalElements({
          title: 'Deseja deletar essa postagem?',
          onClick: () => deletePost(id)
        })
        break
      case "COMMENT":
        setModalElements({
          title: 'Deseja deletar esse comentario?',
          onClick: () => deleteComment(id)
        })
        break
      case "USER":
        setModalElements({
          title: 'Deseja deletar esse usuario?',
          onClick: () => deleteUser(id)
        })
        break
    }
  }, [])

  return (
    <Modal
      className='min-w-[300px] w-[30%] max-w-[400px] modal text-white'
    >
      <h1 className='text-lg font-semibold'>
        {modalElements.title}
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
          onClick={() => modalElements.onClick(id)}
        >
          Deletar
        </Button>
      </div>
    </Modal>
  )
}

export default DeleteModal