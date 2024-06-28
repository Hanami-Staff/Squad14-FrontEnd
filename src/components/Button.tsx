'use client'

import { HTMLAttributes } from "react"

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> { }

const Button = ({ children, onClick, className }: ButtonProps) => {
  return (
    <button
      className={`${className} px-4 py-2 w-fit rounded-md transition-all duration-300 text-white`}
    >
      {children}
    </button>
  )
}

export default Button