'use client'

import { DeleteModal, FormModal, ReadModal, Toast } from "@/components"
import LoginModal from "@/components/modal/LoginModal"
import RegisterModal from "@/components/modal/RegisterModal"
import { Operations, ToastProps } from "@/types"
import { createContext, Dispatch, ReactNode, useContext, useReducer } from "react"

type Action =
  | { type: Operations.REGISTER | Operations.CREATE | Operations.CLOSE | Operations.CLOSE_TOAST | Operations.LOGIN }
  | { type: Operations.UPDATE | Operations.READ | Operations.UPDATE_USER, payload: string }
  | { type: Operations.DELETE, payload: { type: "POST" | "COMMENT" | "USER", id: string } }
  | { type: Operations.TOAST, payload: ToastProps }

interface State {
  isOpen: boolean,
  element: ReactNode,
  isToastOpen: boolean,
  toast: ReactNode
  isEditing: boolean
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
    toast: null,
    isEditing: false
  }

  const reducer = (state: State, action: Action): State => {
    switch (action.type) {
      case Operations.CREATE:
        return {
          ...state,
          isOpen: true,
          element: <FormModal operation="Criar" />
        }
      case Operations.UPDATE:
        return {
          ...state,
          isOpen: true,
          element: <FormModal operation="Editar" id={action.payload} />
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
          element: <DeleteModal type={action.payload.type} id={action.payload.id} />
        }
      case Operations.REGISTER:
        return {
          ...state,
          isOpen: true,
          element: <RegisterModal operation="Criar" />
        }
      case Operations.UPDATE_USER:
        return {
          ...state,
          isOpen: true,
          element: <RegisterModal operation="Editar" id={action.payload} />
        }
      case Operations.LOGIN:
        return {
          ...state,
          isOpen: true,
          element: <LoginModal />
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
        dispatch: dispatch,
        isEditing: state.isEditing
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