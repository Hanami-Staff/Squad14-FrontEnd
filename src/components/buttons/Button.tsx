'use client'

import { ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> { }

const Button = ({ children, onClick, className, type }: ButtonProps) => {
  return (
    <button
      type={type}
      className={`${className} px-4 py-2 w-fit rounded-md transition-all duration-300 text-white`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button