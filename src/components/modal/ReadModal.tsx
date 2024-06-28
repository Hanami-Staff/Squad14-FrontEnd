'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { usePost } from '@/hooks'
import { formatedDateWTime } from '@/utils/dateUtils'
import { Post } from '@/types'
import { animation } from '@/utils/animations'

interface ReadModalProps {
  id: string
}

const ReadModal = ({ id }: ReadModalProps) => {
  const { getPostById } = usePost()
  const [post, setPost] = useState<Post>()

  useEffect(() => {
    getPostById(id)
      .then(res => setPost(res))
      .catch(err => console.error(err))
  }, [])

  return (
    <motion.div
      variants={animation}
      initial='hidden'
      animate='visible'
      exit='exit'
      className='max-w-[760px] w-[100%] h-[90%] text-white modal'
    >
      <h2 className="text-3xl font-semibold border-b border-white/25 leading-relaxed">
        {post?.title}
      </h2>
      <p className='my-3 text-sm text-right'>
        {formatedDateWTime(post?.createdAt)}
      </p>
      <p>
        {post?.content}
      </p>
    </motion.div>
  )
}

export default ReadModal