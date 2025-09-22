"use client"

import * as React from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"

export function Toaster() {
  return (
    <ToastPrimitives.Provider swipeDirection="right">
      <ToastPrimitives.Viewport className="fixed bottom-0 right-0 z-50 m-4 flex w-96 max-w-full flex-col gap-2" />
    </ToastPrimitives.Provider>
  )
}
