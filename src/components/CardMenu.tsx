'use client'

import React, { useEffect, useRef, useState } from 'react'
import { BsThreeDots } from "react-icons/bs";
import { AnimatePresence, motion } from 'framer-motion'
import { animation } from '@/utils/animations';
import { useDialogContext } from '@/context/dialogContext';
import { Operations } from '@/types';

interface CardMenuProps {
  type: "COMMENT" | "POST",
  id: string
  setIsEditing?: (param: boolean) => void
  className?: string
}

const CardMenu = ({ type, id, setIsEditing, className }: CardMenuProps) => {
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
    type: "COMMENT" | "POST",
    label: "Editar" | "Excluir",
    onClick: (id: string) => void
  }


  const menuOptions: Array<MenuOption> = [
    {
      type: "COMMENT",
      label: "Editar",
      onClick: (id: string) => {
        setIsEditing!(true)
      }
    },
    {
      type: "COMMENT",
      label: "Excluir",
      onClick: (id: string) => {
        dispatch({ type: Operations.DELETE, payload: { type: "COMMENT", id } })
        setIsOpen(false)
      }
    },
    {
      type: "POST",
      label: "Editar",
      onClick: (id: string) => {
        dispatch({ type: Operations.UPDATE, payload: id })
        setIsOpen(false)
      }
    },
    {
      type: "POST",
      label: "Excluir",
      onClick: (id: string) => {
        dispatch({ type: Operations.DELETE, payload: { type: "POST", id } })
        setIsOpen(false)
      }
    },
  ]

  const typeOptions = menuOptions.filter(option => option.type === type)
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
            className={className}
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

            {typeOptions.map(({ label, onClick }, i) => (
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