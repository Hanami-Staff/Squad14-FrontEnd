'use client'

import { HTMLAttributes } from 'react'
import { motion } from "framer-motion"
import { animation } from '@/utils/animations'

interface ModalProps extends HTMLAttributes<HTMLDivElement> { }

const Modal = ({ children, className }: ModalProps) => {
  return (
    <motion.div
      variants={animation}
      initial='hidden'
      animate='visible'
      exit='exit'
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default Modal