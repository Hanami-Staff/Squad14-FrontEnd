'use client'

import { useDialogContext } from "@/context/dialogContext"
import Button from "./Button"
import { Operations } from "@/types"

const Navbar = () => {
  const { dispatch } = useDialogContext()
  return (
    <header
      className="bg-slate-300 px-4 fixed inset-x-0 shadow-md z-20"
    >
      <div
        className="max-w-[1200px] mx-auto h-[75px] flex items-center justify-between"
      >
        <h2 className="text-2xl font-semibold">
          Squad14
        </h2>

        <Button
          className="bg-green-600 hover:bg-green-500"
          onClick={() => dispatch({ type: Operations.CREATE })}
        >
          Criar
        </Button>

      </div>
    </header>
  )
}

export default Navbar