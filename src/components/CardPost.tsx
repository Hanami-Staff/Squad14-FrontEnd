import { formatedDate } from '@/utils/dateUtils'
import React, { HTMLAttributes } from 'react'
import CardMenu from './CardMenu'
import { Operations, Post } from '@/types'
import { useDialogContext } from '@/context/dialogContext'

interface CardPostProps extends HTMLAttributes<HTMLDivElement> {
  post: Post
}

const CardPost = ({ post }: CardPostProps) => {
  const { dispatch } = useDialogContext()
  const { id, title, content, createdAt } = post

  return (
    <div
      className='relative flex flex-col px-4 py-2 w-[100%] max-w-[500px] border rounded-md cursor-pointer transition-all duration-300 hover:shadow-md'
    >

      <CardMenu id={id} />

      <div
        className='h-[125px]'
        onClick={() => dispatch({ type: Operations.READ, payload: id })}
      >

        <h1 className='text-lg font-semibold'>
          {title}
        </h1>

        <p className='line-clamp-3'>
          {content}
        </p>

        <p className='absolute bottom-2 right-4'>
          {formatedDate(createdAt)}
        </p>
      </div>
    </div>
  )
}

export default CardPost