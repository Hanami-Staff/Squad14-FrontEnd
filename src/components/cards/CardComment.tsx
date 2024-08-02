'use client'
import { Comment } from '@/types/Comment'
import { formatedDateWTime } from '@/utils/dateUtils'
import React, { useState } from 'react'
import { useAppContext } from '@/context/appContext'
import { useDialogContext } from '@/context/dialogContext'
import { verifyUser } from '@/utils/userUtils'
import CardMenu from '../CardMenu'

interface CardCommentProps {
  comment: Comment
}

const CardComment = ({ comment }: CardCommentProps) => {
  const { content, createdAt, userId, id, username } = comment
  const { user } = useAppContext()
  const { dispatch, isEditing } = useDialogContext()
  const [state, setState] = useState<string>(content)

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
          <input
            className='text-black'
            onChange={e => setState(e.target.value)}
            value={state}
          />
          :
          <p>
            {content}
          </p>

      }
      <div
        className='text-black'
      >
        {verifyUser(user!, userId!) && <CardMenu id={id!} />}

      </div>
    </div>
  )
}

export default CardComment