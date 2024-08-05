'use client'

import { Operations } from "@/types"
import { useAppContext } from "@/context/appContext"
import Link from "next/link"
import { Button, LoginButton } from "./buttons"
import { useDialogContext } from "@/context/dialogContext"
import useUser from "@/hooks/useUser"

const Navbar = () => {
  const { dispatch } = useDialogContext()
  const { user } = useAppContext()
  const { logout } = useUser()
  return (
    <header
      className="bg-slate-300 px-4 fixed inset-x-0 shadow-md z-20"
    >
      <div
        className="max-w-[1200px] mx-auto h-[75px] flex items-center justify-between"
      >
        <Link
          href={'/'}
          className="font-bold text-3xl"
        >
          Squad14
        </Link>

        <div
          className="flex items-center gap-4"
        >
          {!user ?
            <>
              <LoginButton>
                Login
              </LoginButton>
              <Button
                className="bg-sky-600 text-white hover:bg-sky-500"
                onClick={() => dispatch({ type: Operations.REGISTER })}
              >
                Cadastrar
              </Button>
            </>
            :
            <>
              {/* <Button
                className="bg-red-600 text-white hover:bg-red-500"
                onClick={() => logout()}
              >
                Logout
              </Button> */}
              <div
                className="flex flex-col"
              >
                <p
                  className="font-semibold text-center"
                >
                  Olá, {user.name}
                </p>
                <div
                  className="space-x-4"
                >

                  <Link
                    href={`/user/${user.name}`}
                    className="hover:underline"
                  >
                    Meu perfil
                  </Link>
                  <span>|</span>
                  <button
                    onClick={() => logout()}
                  >
                    Sair
                  </button>
                </div>
              </div>
              <Button
                className="bg-emerald-600 text-white hover:bg-emerald-500"
                onClick={() => dispatch({ type: Operations.CREATE })}
              >
                Criar
              </Button>
            </>
          }
        </div>
      </div>
    </header>
  )
}

export default Navbar