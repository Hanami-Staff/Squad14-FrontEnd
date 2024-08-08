'use client'

import { Backdrop, Button, CardPost } from "@/components"
import { useAppContext } from "@/context/appContext"
import { useDialogContext } from "@/context/dialogContext"
import { usePost } from "@/hooks"
import useUser from "@/hooks/useUser"
import { Operations } from "@/types"
import { getCookie } from "cookies-next"
import { AnimatePresence } from "framer-motion"
import { useEffect } from "react"

const ProfilePage = () => {
  const { isOpen, element, isToastOpen, toast, dispatch } = useDialogContext();
  const { user, posts } = useAppContext()
  const { getPostsByUser } = usePost()
  const { deleteUser } = useUser()


  useEffect(() => {
    try {
      const cookieUser = JSON.parse(getCookie('user')!)
      getPostsByUser(cookieUser.id!)
    } catch {

    }
  }, [])

  return (
    <main className="py-[75px]">
      <div className="flex flex-col gap-2 max-w-[500px] pt-4 px-4 mx-auto">

        <div
          className="space-y-2 border-gray-400 border rounded-md p-2"
        >
          <div>
            <div><b>Nome:</b> {user?.name}</div>
            <div><b>Email:</b> {user?.email}</div>
          </div>

          <div
            className="space-x-2 w-fit mx-auto"
          >
            <Button
              className="bg-emerald-600 hover:bg-emerald-500"
              onClick={() => dispatch({ type: Operations.UPDATE_USER, payload: user?.id! })}
            >
              Editar
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-500"
              /* onClick={() => deleteUser(user?.id!)} */
              onClick={() => dispatch({ type: Operations.DELETE, payload: { type: "USER", id: user?.id! } })}
            >
              Excluir
            </Button>
          </div>
        </div>

        <h1 className="text-center text-3xl font-semibold">
          Minhas postagens
        </h1>

        {posts.map((post, i) => (
          <CardPost
            key={i}
            post={post}
          />
        ))}

        <AnimatePresence>
          {isToastOpen &&
            <>
              {toast}
            </>
          }
        </AnimatePresence>

        <AnimatePresence>
          {isOpen &&
            <Backdrop>
              {element}
            </Backdrop>
          }
        </AnimatePresence>
      </div>
    </main>
  )
}

export default ProfilePage