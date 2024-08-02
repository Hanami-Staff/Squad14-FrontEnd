'use client'
import { Comment } from '@/types/Comment'
import { formatedDateWTime } from '@/utils/dateUtils'
import React, { useState } from 'react'
import { useAppContext } from '@/context/appContext'
import { verifyUser } from '@/utils/userUtils'
import CardMenu from '../CardMenu'
import FormComment from '../forms/FormComment'

interface CardCommentProps {
  comment: Comment
}

const CardComment = ({ comment }: CardCommentProps) => {
  const { content, createdAt, userId, id, username, postId } = comment
  const { user } = useAppContext()
  const [isEditing, setIsEditing] = useState<boolean>(false)


  return (
    <div
      className='relative space-y-2  border border-1 border-white/15 py-1 px-2 rounded-md hover:border-white/30 hover:shadow-md transition-all duration-300'
    >
      <p
        className='text-xs'
      >
        {username} - {formatedDateWTime(createdAt)}
      </p>
      {
        isEditing ?
          <FormComment
            id={id}
            postId={postId}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
          />
          :
          <p>
            {content}
          </p>

      }
      <div
        className='text-black'
      >
        {verifyUser(user!, userId!) && <CardMenu setIsEditing={setIsEditing} type='COMMENT' id={id!} />}

      </div>
    </div>
  )
}

export default CardComment