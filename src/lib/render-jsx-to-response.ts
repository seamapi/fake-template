import type { ReactNode } from "react"
import reactDom from "react-dom/server"

export const renderJsxToResponse = async (element: ReactNode) => {
  const stream = await reactDom.renderToReadableStream(element)
  return new Response(stream, {
    status: 200,
    headers: {
      "Content-Type": "text/html",
    },
  })
}
