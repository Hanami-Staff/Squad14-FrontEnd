'use client'

import { Operations } from "@/types"
import { createContext, Dispatch, ReactNode, useContext, useReducer } from "react"

type Action =
  | { type: Operations.CREATE | Operations.CLOSE }
  | { type: Operations.UPDATE, payload: string }

interface State {
  isOpen: boolean,
  element: ReactNode,
  isToastOpen: boolean,
  toast: ReactNode
}

interface Context extends State {
  dispatch: Dispatch<Action>
}

const DialogContext = createContext<Context | undefined>(undefined)

export const DialogProvider = ({ children }: { children: ReactNode }) => {
  const initialStates: State = {
    isOpen: false,
    element: null,
    isToastOpen: false,
    toast: null
  }

  const reducer = (state: State, action: Action): State => {
    switch (action.type) {
      case Operations.CREATE:
        return {
          ...state,
          isOpen: true,
          element: <h1 className="text-3xl text-white">CRIAR</h1>
        }
      case Operations.UPDATE:
        return {
          ...state,
          isOpen: true,
          element: <h1 className="text-3xl text-white">ATUALIZAR {action.payload}</h1>
        }

      case Operations.CLOSE:
        return {
          ...state,
          isOpen: false,
          element: null
        }
    }
  }

  const [state, dispatch] = useReducer(reducer, initialStates)

  return (
    <DialogContext.Provider
      value={{
        isOpen: state.isOpen,
        element: state.element,
        isToastOpen: state.isToastOpen,
        toast: state.toast,
        dispatch: dispatch
      }}
    >
      {children}
    </DialogContext.Provider>
  )
}

export const useDialogContext = (): Context => {
  const context = useContext(DialogContext)
  return context!
}