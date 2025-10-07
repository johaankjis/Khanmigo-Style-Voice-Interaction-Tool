"use client"

import { useState, useEffect } from "react"
import { graphqlClient, CREATE_SESSION, ADD_TRANSCRIPT } from "@/lib/graphql-client"

interface Session {
  id: string
  createdAt: string
  transcripts: Array<{
    id: string
    text: string
    confidence: number
    timestamp: string
    isFinal: boolean
  }>
}

export function useSessionManager() {
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    createNewSession()
  }, [])

  const createNewSession = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await graphqlClient.mutate<{ createSession: Session }>(CREATE_SESSION)
      setSession(result.createSession)
      console.log("[v0] Created new session:", result.createSession.id)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to create session"
      setError(errorMessage)
      console.error("[v0] Session creation error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const saveTranscript = async (text: string, confidence: number) => {
    if (!session) {
      console.error("[v0] No active session")
      return
    }

    try {
      await graphqlClient.mutate(ADD_TRANSCRIPT, {
        sessionId: session.id,
        text,
        confidence,
      })
      console.log("[v0] Saved transcript to session")
    } catch (err) {
      console.error("[v0] Failed to save transcript:", err)
    }
  }

  return {
    session,
    isLoading,
    error,
    createNewSession,
    saveTranscript,
  }
}
