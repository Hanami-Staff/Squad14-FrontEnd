'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Modal from './Modal'
import { UserSchema, User, UpdateSchema } from '@/types/User'
import useUser from '@/hooks/useUser'
import { Button } from '../buttons'
import { useEffect, useState } from 'react'
import { useAppContext } from '@/context/appContext'

interface RegisterModalProps {
  id?: string | undefined,
  operation: 'Criar' | 'Editar'
}

const RegisterModal = ({ id, operation }: RegisterModalProps) => {
  const { createUser, updateUser, } = useUser()
  const [changePassword, setChangePassword] = useState<boolean>(false)
  const { user } = useAppContext()

  const schema = (changePassword || operation === 'Criar') ? UserSchema : UpdateSchema

  const { handleSubmit, register, formState: { errors }, reset } = useForm({
    mode: 'all',
    criteriaMode: 'all',
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  })

  useEffect(() => {
    if (!changePassword) {
      reset({
        name: user?.name,
        email: user?.email
      })
    }
  }, [changePassword, id])


  const handleSubmitForm: SubmitHandler<User> = (data) => {
    id ? updateUser(id, data) : createUser(data)
  }

  return (
    <Modal
      className='w-[75%] max-w-[760px] mx-4 modal'
    >
      <h1
        className='text-white text-xl font-bold mb-4'
      >
        {operation === 'Criar' ? 'Cadastro' : 'Edição'} de Usuario
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

        {operation === 'Editar' &&
          <Button
            type='button'
            onClick={() => setChangePassword(prev => !prev)}
            className='bg-emerald-600 hover:bg-emerald-500 mx-auto'
          >
            {changePassword ? 'Não mudar senha ' : 'Mudar senha'}
          </Button>
        }

        {(changePassword || operation === 'Criar') &&
          <>
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
                Confirmar senha
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
          </>
        }

        <Button
          className="bg-sky-600 text-white hover:bg-sky-500 self-end"
        >
          {operation === 'Criar' ? 'Cadastrar' : 'Editar'}
        </Button>

      </form>

    </Modal>
  )
}

export default RegisterModal