'use client'

import { useDialogContext } from '@/context/dialogContext';
import { Operations, ToastProps } from '@/types'
import { animation } from '@/utils/animations'
import { motion } from 'framer-motion'
import { useEffect } from 'react';
import { BiCheckCircle, BiErrorCircle } from "react-icons/bi";


const Toast = ({ type, message }: ToastProps) => {
  const { dispatch } = useDialogContext()
  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: Operations.CLOSE_TOAST })
    }, 1500)
  }, [])

  return (
    <motion.div
      variants={animation}
      initial='hidden'
      animate='visible'
      exit='exit'
      className={`fixed flex items-center gap-2 right-10 bottom-10 px-4 py-2 border rounded-md ${type == 'OK' ? 'border-emerald-800 bg-emerald-200 text-emerald-800' : 'border-red-800 bg-red-200 text-red-800'}`}
    >

      {type == 'OK' ? <BiCheckCircle size={20} /> : <BiErrorCircle size={20} />}
      {message}
    </motion.div>
  )
}

export default Toast