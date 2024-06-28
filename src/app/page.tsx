'use client'

import { Backdrop, Button, CardPost } from "@/components";
import { useDialogContext } from "@/context/dialogContext";
import { Operations } from "@/types";
import { AnimatePresence } from "framer-motion";

export default function Home() {

  const { isOpen, element, dispatch } = useDialogContext()

  const posts = [
    {
      id: "1",
      title: "TESTE",
      content: "TESTE TESTADO",
      createdAt: "2024-05-21T12:17:55.963-03:00"
    },
    {
      id: "2",
      title: "TESTE 2",
      content: "TESTE TESTADO 2",
      createdAt: "2024-05-28T12:17:55.963-03:00"
    },
  ]

  return (
    <main className="h-[1100px] pt-[75px]">

      <div className="flex flex-col gap-2 max-w-[500px] pt-4 px-4 mx-auto">

        <h1 className="text-center text-3xl font-semibold">
          POSTAGENS
        </h1>


        {posts.map((post) => (
          <CardPost
            key={post.id}
            post={post}
          />
        ))}

      </div>


      <AnimatePresence>
        {isOpen &&
          <Backdrop onClick={() => dispatch({ type: Operations.CLOSE })}>
            {element}
          </Backdrop>
        }
      </AnimatePresence>

    </main>
  );
}
