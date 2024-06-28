'use client'

import { HTMLAttributes } from "react"
import { motion } from 'framer-motion'
import { animation } from "@/utils/animations"

interface BackdropProps extends HTMLAttributes<HTMLDivElement> { }

const Backdrop = ({ onClick, children }: BackdropProps) => {

  return (
    <motion.div
      variants={animation}
      initial='hidden'
      animate='visible'
      exit='exit'
      className='fixed inset-0 z-40 flex items-center justify-center'
    >

      <div
        className="fixed inset-0 z-40 bg-black/50"
        onClick={onClick}
      >

      </div>
      <div className="z-50">
        {children}
      </div>

    </motion.div>
  )
}

export default Backdrop