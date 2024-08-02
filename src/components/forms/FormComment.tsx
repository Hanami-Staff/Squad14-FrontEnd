'use client'

import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Comment, CommentSchema } from "@/types/Comment"
import { getCookie } from "cookies-next"
import useComment from "@/hooks/useComment"
import { Button } from "../buttons"
import { useEffect } from "react"


interface FormCommentProps {
  id?: string | undefined,
  postId: string,
  isEditing?: boolean,
  setIsEditing?: (param: boolean) => void
}

const FormComment = ({ id, postId, isEditing, setIsEditing }: FormCommentProps) => {
  const { createComment, getCommentById, updateComment } = useComment()
  const user = JSON.parse(getCookie('user')!)

  const { handleSubmit, register, formState: { errors }, reset } = useForm({
    mode: 'all',
    criteriaMode: 'all',
    resolver: zodResolver(CommentSchema),
    defaultValues: {
      userId: user.id,
      postId: postId,
      content: ''
    }
  })

  useEffect(() => {
    if (id) {
      getCommentById(id)
        .then(res => {
          reset({
            userId: user.id,
            postId: postId,
            content: res?.content
          })
        })
        .catch(err => console.error(err))
    }
  }, [])

  const handleSubmitForm: SubmitHandler<Comment> = (data) => {
    id ? updateComment(postId, id, data) : createComment(postId, data)
    setIsEditing!(false)
  }

  return (
    <form
      className="flex flex-col md:flex-row  items-center gap-4 mb-4"
      onSubmit={handleSubmit(handleSubmitForm)}
    >
      <div
        className="w-full"
      >
        <input
          type="text"
          placeholder="Adicionar um comentário"
          className="bg-transparent outline-none border-b w-full border-white border-1 border-opacity-20 focus:border-opacity-50 transition-all duration-300 pb-1 my-3"
          {...register('content')}
        />
        {errors.content &&
          <p className='error'>* {errors.content.message}</p>
        }
      </div>

      {
        (isEditing && id !== undefined) &&
        <Button
          className="bg-gray-500 hover:bg-gray-600 h-fit"
          onClick={() => setIsEditing!(false)}
        >
          Cancelar
        </Button>
      }

      <Button
        className="bg-emerald-500 hover:bg-emerald-600 h-fit"
      >
        {id !== undefined ? 'Editar' : 'Comentar'}
      </Button>
    </form>
  )
}

export default FormComment