'use client'

import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Comment, CommentSchema } from "@/types/Comment"
import { getCookie } from "cookies-next"
import useComment from "@/hooks/useComment"
import { Button } from "../buttons"

interface FormCommentProps {
  postId: string
}

const FormComment = ({ postId }: FormCommentProps) => {
  const { createComment } = useComment()

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

  const handleSubmitForm: SubmitHandler<Comment> = (data) => {
    createComment(postId, data)
    reset({
      content: ''
    })
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
      <Button
        className="bg-emerald-500 hover:bg-emerald-600 h-fit"
      >
        Comentar
      </Button>
    </form>
  )
}

export default FormComment