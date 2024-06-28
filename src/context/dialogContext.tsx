'use client'

import { DeleteModal, ReadModal, Toast } from "@/components"
import { Operations, ToastProps } from "@/types"
import { createContext, Dispatch, ReactNode, useContext, useReducer } from "react"

type Action =
  | { type: Operations.CREATE | Operations.CLOSE | Operations.CLOSE_TOAST }
  | { type: Operations.UPDATE | Operations.DELETE | Operations.READ, payload: string }
  | { type: Operations.TOAST, payload: ToastProps }

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
          element: <h1 className="text-3xl text-white z-50">CRIAR</h1>
        }
      case Operations.UPDATE:
        return {
          ...state,
          isOpen: true,
          element: <h1 className="text-3xl text-white z-50">ATUALIZAR {action.payload}</h1>
        }
      case Operations.READ:
        return {
          ...state,
          isOpen: true,
          element: <ReadModal id={action.payload} />
        }
      case Operations.DELETE:
        return {
          ...state,
          isOpen: true,
          element: <DeleteModal id={action.payload} />
        }
      case Operations.TOAST:
        return {
          ...initialStates,
          isToastOpen: true,
          toast: <Toast type={action.payload.type} message={action.payload.message} />
        }
      case Operations.CLOSE_TOAST:
        return {
          ...state,
          toast: null,
          isToastOpen: false
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