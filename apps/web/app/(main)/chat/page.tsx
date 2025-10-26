"use client"

import React, { useCallback, useEffect, useRef, useState } from "react"

type Message = { id: string; role: "user" | "bot"; text: string }

export default function Page() {
  const [messages, setMessages] = useState<Message[]>([])
  const [text, setText] = useState("")
  const [loading, setLoading] = useState(false)
  const listRef = useRef<HTMLDivElement | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" })
    })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  const send = async (content: string) => {
    if (!content.trim()) return
    const userMsg: Message = { id: String(Date.now()), role: "user", text: content.trim() }
    setMessages((m) => [...m, userMsg])
    setText("")
    setLoading(true)
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: content.trim() }),
      })
      if (!res.ok) throw new Error("Network error")
      const data = await res.json()
    console.log(data);
      const botText = typeof data?.message === "string" ? data.message : "No reply."
      const botMsg: Message = { id: String(Date.now() + 1), role: "bot", text: botText }
      setMessages((m) => [...m, botMsg])
    } catch (err) {
      const errMsg: Message = {
        id: String(Date.now() + 2),
        role: "bot",
        text: "Sorry — could not get a reply. Try again.",
      }
      setMessages((m) => [...m, errMsg])
    } finally {
      setLoading(false)
      textareaRef.current?.focus()
    }
  }

  const onSubmit = (e?: React.FormEvent) => {
    e?.preventDefault()
    if (loading) return
    send(text)
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      onSubmit()
    }
  }

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto p-4 gap-4">
      <header className="flex items-center justify-between border-b pb-3">
        <div>
          <h1 className="text-lg font-semibold">Chat Bot</h1>
          <p className="text-sm text-gray-500">{loading ? "Thinking..." : "Ready"}</p>
        </div>
      </header>

      <main
        ref={listRef}
        className="flex-1 overflow-auto p-4 bg-white border rounded-lg shadow-sm space-y-3"
        aria-live="polite"
      >
        {messages.length === 0 && (
          <div className="text-center text-gray-400 mt-8">Say hi — ask anything.</div>
        )}

        {messages.map((m) => (
          <div
            key={m.id}
            className={`max-w-[80%] whitespace-pre-wrap px-4 py-2 rounded-lg ${
              m.role === "user"
                ? "ml-auto bg-sky-600 text-white rounded-br-none"
                : "mr-auto bg-gray-100 text-gray-900 rounded-bl-none"
            }`}
          >
            {m.text}
          </div>
        ))}
      </main>

      <form onSubmit={onSubmit} className="flex gap-3 items-end">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Type a message"
          rows={2}
          className="flex-1 resize-y min-h-[44px] max-h-36 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-300"
        />

        <div className="flex flex-col gap-2">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-sky-700 text-white rounded-md disabled:opacity-60"
          >
            {loading ? "Sending…" : "Send"}
          </button>
          <button
            type="button"
            onClick={() => {
              setMessages([])
              setText("")
              textareaRef.current?.focus()
            }}
            className="text-sm text-gray-500"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  )
}