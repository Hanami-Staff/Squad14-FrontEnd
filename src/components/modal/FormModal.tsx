'use client'

import { useDialogContext } from "@/context/dialogContext"
import { Post, PostSchema } from "@/types/Post"
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { Operations } from '@/types'
import { usePost } from "@/hooks"
import Button from "../buttons/Button"
import { useEffect } from "react"
import Modal from "./Modal"
import { useAppContext } from "@/context/appContext"

interface FormModalProps {
    id?: string | undefined,
    operation: 'Criar' | 'Editar'
}

const FormModal = ({ id, operation }: FormModalProps) => {
    const { dispatch } = useDialogContext()
    const { user } = useAppContext()
    const { createPost, updatePost, getPostById } = usePost()

    const { handleSubmit, register, formState: {
        errors
    }, reset } = useForm({
        mode: "all",
        criteriaMode: "all",
        resolver: zodResolver(PostSchema),
        defaultValues: {
            userId: user?.id!,
            title: '',
            content: ''
        }
    })

    useEffect(() => {
        if (id) {
            getPostById(id)
                .then(res => {
                    reset({
                        userId: user?.id!,
                        title: res?.title,
                        content: res?.content
                    })
                })
                .catch(err => console.error(err))
        }
    }, [])

    const handleSubmitForm: SubmitHandler<Post> = data => {
        id ? updatePost(id, data) : createPost(data)
        dispatch({ type: Operations.CLOSE })
    }

    return (

        <Modal
            className='w-[75%] max-w-[760px] mx-4 modal'
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
        </Modal>
    )
}

export default FormModal