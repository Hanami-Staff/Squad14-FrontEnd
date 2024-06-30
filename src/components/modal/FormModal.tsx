'use client'

import { useDialogContext } from "@/context/dialogContext"
import { Post, PostSchema } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { Operations } from '@/types'
import { motion } from 'framer-motion'
import { usePost } from "@/hooks"
import { animation } from '@/utils/animations'
import Button from "../Button"



interface FormModalProps {
    id?: string | undefined,
    operation: 'Criar' | 'Editar'
}



const FormModal = ({ id, operation }: FormModalProps) => {
    const { dispatch } = useDialogContext()
    const { createPost } = usePost()

    const { handleSubmit, register, formState: {
        errors
    }, reset } = useForm({
        mode: "all",
        criteriaMode: "all",
        resolver: zodResolver(PostSchema),
        defaultValues: {
            title: '',
            content: ''
        }
    })

    const handleSubmitForm: SubmitHandler<Post> = data => {
        dispatch({
            type: Operations.CLOSE
        })
        createPost(data)
    }

    return (

        <motion.div
            variants={animation}
            initial='hidden'
            animate='visible'
            exit='exit'
            className='w-[75%] max-w-[790px] modal'
        >
            <h1
                className='text-white text-xl font-bold mb-4'
            >
                {operation} postagem
            </h1>

            <form
                onSubmit={handleSubmit(handleSubmitForm)}
                className='flex flex-col gap-4'
            >
                <div
                    className="flex flex-col gap-2">

                    <label
                        htmlFor="title"
                        className='text-white text-lg'
                    >
                        Título
                    </label>

                    <input
                        type="text"
                        id='title'
                        maxLength={50}
                        className='py-1 px-2 rounded-md'
                        {...register('title')}
                    />

                    {errors.title &&
                        <p
                            className='error'
                        >{errors.title.message}</p>
                    }
                </div>

                <div
                    className="flex flex-col gap-2">

                    <label
                        htmlFor="content"
                        className='text-white text-lg'
                    >
                        Conteúdo
                    </label>

                    <textarea
                        id='contet'
                        maxLength={255}
                        rows={3}
                        className='py-1 px-2 rounded-md resize-none'
                        {...register('content')}
                    />

                    {errors.content &&
                        <p
                            className='error'
                        >{errors.content.message}</p>
                    }
                </div>


                <div
                    className='flex justify-end gap-2'
                >
                    <Button
                        className='btn-cancel'
                        onClick={e => {
                            e.preventDefault()
                            dispatch({ type: Operations.CLOSE })
                        }}
                    >
                        Cancelar
                    </Button>

                    <Button
                        className='btn-confirm'
                    >
                        {operation}
                    </Button>
                </div>
            </form>
        </motion.div>
    )
}

export default FormModal