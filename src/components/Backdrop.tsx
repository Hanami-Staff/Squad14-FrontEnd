'use client'

import { HTMLAttributes, useEffect } from "react"
import { motion } from 'framer-motion'
import { animation } from "@/utils/animations"
import { useDialogContext } from "@/context/dialogContext"
import { Operations } from "@/types"

interface BackdropProps extends HTMLAttributes<HTMLDivElement> { }

const Backdrop = ({ children }: BackdropProps) => {
  const { isOpen, dispatch } = useDialogContext()

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto'
  }, [isOpen])

  return (
    <div className='fixed inset-0 z-40 flex items-center justify-center'>

      <motion.div
        variants={animation}
        initial='hidden'
        animate='visible'
        exit='exit'
        className="fixed inset-0 z-40 bg-black/50 "
        onClick={() => dispatch({ type: Operations.CLOSE })}
      />

      {children}

    </div>
  )
}

export default Backdrop