'use client'

import Modal from "./Modal"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Login, LoginSchema } from "@/types/User"
import useUser from "@/hooks/useUser"
import { Button } from "../buttons"

const LoginModal = () => {
  const { login, error } = useUser()

  const { handleSubmit, register, formState: { errors } } = useForm({
    mode: 'all',
    criteriaMode: 'all',
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  })

  const handleSubmitForm: SubmitHandler<Login> = (data) => {
    login(data)
  }
  return (
    <Modal
      className='w-[75%] max-w-[760px] mx-4 modal'
    >
      <h2
        className='text-white text-xl font-bold mb-4'
      >
        Login
      </h2>


      <form
        className='flex flex-col gap-4'
        onSubmit={handleSubmit(handleSubmitForm)}
      >
        <div
          className='flex flex-col gap-2'
        >
          <label
            htmlFor="email"
            className='text-white text-lg'
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register('email')}
          />
          {errors.email &&
            <p className='error'>* {errors.email.message}</p>
          }
        </div>
        <div
          className='flex flex-col gap-2'
        >
          <label
            htmlFor="password"
            className='text-white text-lg'
          >
            Senha
          </label>
          <input
            id="password"
            type="password"
            {...register('password')}
          />
          {errors.password &&
            <p className='error'>* {errors.password.message}</p>
          }
        </div>
        {error && <p className="error">{error}</p>}

        <Button
          className="bg-sky-600 text-white hover:bg-sky-500 self-end"
        >
          Login
        </Button>
      </form>
    </Modal>
  )
}

export default LoginModal