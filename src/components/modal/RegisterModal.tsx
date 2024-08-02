'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Modal from './Modal'
import { UserSchema, User } from '@/types/User'
import { useDialogContext } from '@/context/dialogContext'
import useUser from '@/hooks/useUser'
import { Button } from '../buttons'

const RegisterModal = () => {
  const { dispatch } = useDialogContext()
  const { createUser } = useUser()

  const { handleSubmit, register, formState: { errors }, reset } = useForm({
    mode: 'all',
    criteriaMode: 'all',
    resolver: zodResolver(UserSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  })

  const handleSubmitForm: SubmitHandler<User> = (data) => {
    createUser(data)
  }

  return (
    <Modal
      className='w-[75%] max-w-[760px] mx-4 modal'
    >
      <h1
        className='text-white text-xl font-bold mb-4'
      >
        Cadastro de Usuario
      </h1>

      <form
        className='flex flex-col gap-4'
        onSubmit={handleSubmit(handleSubmitForm)}
      >
        <div
          className='flex flex-col gap-2'
        >
          <label
            htmlFor="name"
            className='text-white text-lg'
          >
            Nome
          </label>

          <input
            id='name'
            type="text"
            {...register('name')}
          />
          {errors.name &&
            <p className='error'>* {errors.name.message}</p>
          }
        </div>
        <div
          className='flex flex-col gap-2'
        >
          <label
            htmlFor="email"
            className='text-white text-lg'
          >
            E-Mail
          </label>

          <input
            id='email'
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
            id='password'
            type="password"
            {...register('password')}
          />
          {errors.password &&
            <p className='error'>* {errors.password.message}</p>
          }
        </div>
        <div
          className='flex flex-col gap-2'
        >
          <label
            htmlFor="confirmPassword"
            className='text-white text-lg'
          >
            Corfirmar senha
          </label>

          <input
            id="confirmPassword"
            type="password"
            {...register('confirmPassword')}
          />
          {errors.confirmPassword &&
            <p className='error'>* {errors.confirmPassword.message}</p>
          }
        </div>
        <Button
          className="bg-sky-600 text-white hover:bg-sky-500 self-end"
        >
          Cadastrar
        </Button>
      </form>
    </Modal>
  )
}

export default RegisterModal