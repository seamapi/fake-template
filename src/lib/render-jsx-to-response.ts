import type React from "react"
import reactDom from "react-dom/server"

export const renderJsxToResponse = async (element: React.ReactNode) => {
  const stream = await reactDom.renderToReadableStream(element)
  return new Response(stream, {
    status: 200,
    headers: {
      "Content-Type": "text/html",
    },
  })
}
