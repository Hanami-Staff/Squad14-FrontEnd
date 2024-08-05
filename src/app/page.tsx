'use client'

import { Backdrop, CardPost } from "@/components";
import { useAppContext } from "@/context/appContext";
import { useDialogContext } from "@/context/dialogContext";
import { usePost } from "@/hooks";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";

export default function Home() {

  const { isOpen, element, isToastOpen, toast } = useDialogContext()
  const { posts } = useAppContext()
  const { getAllPosts } = usePost()

  useEffect(() => {
    getAllPosts()
  }, [])

  return (
    <main className="pt-[75px]">

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


    </main>
  );
}
