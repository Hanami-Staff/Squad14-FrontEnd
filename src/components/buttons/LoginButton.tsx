import { Operations } from '@/types'
import React, { HTMLAttributes } from 'react'
import Button from './Button'
import { useDialogContext } from '@/context/dialogContext'

interface LoginButtonProps extends HTMLAttributes<HTMLButtonElement> { }

const LoginButton = ({ className, children }: LoginButtonProps) => {
  const { dispatch } = useDialogContext()
  return (
    <Button
      className={`${className} bg-sky-600 text-white hover:bg-sky-500`}
    //onClick={() => dispatch({ type: Operations.LOGIN })}
    >
      {children}
    </Button>
  )
}

export default LoginButton
