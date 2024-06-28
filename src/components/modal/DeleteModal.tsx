'use client'

import { motion } from 'framer-motion'
import { useDialogContext } from "@/context/dialogContext"
import { usePost } from "@/hooks"
import { animation } from '@/utils/animations'
import Button from '../Button'
import { Operations } from '@/types'

interface DeleteModalProps {
  id: string
}


const DeleteModal = ({ id }: DeleteModalProps) => {
  const { deletePost } = usePost()
  const { dispatch } = useDialogContext()

  return (
    <motion.div
      variants={animation}
      initial='hidden'
      animate='visible'
      exit='exit'
      className='min-w-[300px] max-w-[400px] w-[30%] text-white modal space-y-4'
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
    </motion.div>
  )
}

export default DeleteModal