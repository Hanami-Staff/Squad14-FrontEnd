'use client'

import React, { useEffect, useRef, useState } from 'react'
import { BsThreeDots } from "react-icons/bs";
import { AnimatePresence, motion } from 'framer-motion'
import { animation } from '@/utils/animations';
import { useDialogContext } from '@/context/dialogContext';
import { Operations } from '@/types';

interface CardMenuProps {
  id: string
}

const CardMenu = ({ id }: CardMenuProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)

    return () => {
      document.removeEventListener("mousedown", handler)
    }
  }, [isOpen])

  const { dispatch } = useDialogContext()

  type MenuOption = {
    label: "Editar" | "Excluir",
    onClick: (id: string) => void
  }


  const menuOptions: Array<MenuOption> = [
    {
      label: "Editar",
      onClick: (id: string) => {
        dispatch({ type: Operations.UPDATE, payload: id })
        setIsOpen(false)
      }
    },
    {
      label: "Excluir",
      onClick: (id: string) => {
        dispatch({ type: Operations.DELETE, payload: id })
        setIsOpen(false)
      }
    },
  ]

  return (
    <>
      <div
        className='absolute right-4 top-2'
        ref={menuRef}
        onClick={() => setIsOpen(true)}
      >
        <div
          className='cursor-pointer'
        >
          <BsThreeDots
            size={20}
          />
        </div>

      </div>
      <AnimatePresence>
        {isOpen &&
          <motion.div
            variants={animation}
            initial='hidden'
            animate='visible'
            exit='exit'
            className='flex flex-col bg-white border shadow-sm w-[100px] gap-1 absolute right-4 top-6 rounded-md'
          >

            {menuOptions.map(({ label, onClick }, i) => (
              <button
                key={i}
                onClick={() => onClick(id)}
                className={`hover:bg-slate-200 transition-all duration-300 ${label == 'Excluir' ? 'text-red-500' : ''}`}
              >
                {label}
              </button>
            ))}

          </motion.div>
        }
      </AnimatePresence>
    </>
  )
}

export default CardMenu