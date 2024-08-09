'use client'

import React, { useEffect, useState } from 'react'
import { usePost } from '@/hooks'
import { formatedDateWTime } from '@/utils/dateUtils'
import { Post } from '@/types/Post'
import Modal from './Modal'
import { useAppContext } from '@/context/appContext'
import FormComment from '../forms/FormComment'
import { LoginButton } from '../buttons'
import CardComment from '../cards/CardComment'

interface ReadModalProps {
  id: string
}

const ReadModal = ({ id }: ReadModalProps) => {
  const { comments, user } = useAppContext()
  const { getPostById } = usePost()
  const [post, setPost] = useState<Post>()

  useEffect(() => {
    getPostById(id)
      .then(res => setPost(res))
      .catch(err => console.error(err))
  }, [])

  return (
    <Modal
      className='max-w-[760px] w-[75%] h-[90%] text-white modal overflow-y-auto'
    >
      <h2 className="text-3xl font-semibold border-b border-white/25 leading-relaxed">
        {post?.title}
      </h2>
      <div
        className="flex items-center justify-between my-3"
      >
        <p
          className="text-sm"
        >
          Postado por: {post?.username}
        </p>
        <p
          className="text-sm"
        >
          {formatedDateWTime(post?.createdAt)}
        </p>
      </div>
      <div
        className="h-[40%] mb-4"
      >
        <p>
          {post?.content}
        </p>
      </div>
      <div

      >
        <h2
          className="text-2xl font-semibold border-b border-white/25 leading-relaxed mb-3"
        >
          Comentários ({comments.length})
        </h2>

        {user ?
          <FormComment
            postId={id}
          />
          :
          <div
            className="flex items-center justify-center"
          >
            <LoginButton
              className="w-fit mx-auto mb-3"
            >
              Logar para comentar
            </LoginButton>
          </div>
        }

        <div
          className="flex flex-col gap-2"
        >
          {comments.map((comment) => (
            <CardComment
              key={comment.id}
              comment={comment}
            />
          ))}
        </div>
      </div>
    </Modal>
  )
}

export default ReadModal