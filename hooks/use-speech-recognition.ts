"use client"

import { useState, useEffect, useRef, useCallback } from "react"

interface TranscriptEntry {
  text: string
  confidence: number
  timestamp: Date
  isFinal: boolean
}

interface UseSpeechRecognitionReturn {
  isListening: boolean
  transcript: TranscriptEntry[]
  startListening: () => void
  stopListening: () => void
  clearTranscript: () => void
  isSupported: boolean
  error: string | null
}

export function useSpeechRecognition(): UseSpeechRecognitionReturn {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([])
  const [isSupported, setIsSupported] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    // Check if Web Speech API is supported
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      if (SpeechRecognition) {
        setIsSupported(true)
        recognitionRef.current = new SpeechRecognition()
        recognitionRef.current.continuous = true
        recognitionRef.current.interimResults = true
        recognitionRef.current.lang = "en-US"

        recognitionRef.current.onresult = (event: any) => {
          const results = Array.from(event.results)
          const newTranscripts: TranscriptEntry[] = []

          for (let i = event.resultIndex; i < results.length; i++) {
            const result = results[i] as any
            const transcriptText = result[0].transcript
            const confidence = result[0].confidence || 0.9

            newTranscripts.push({
              text: transcriptText,
              confidence: confidence,
              timestamp: new Date(),
              isFinal: result.isFinal,
            })
          }

          setTranscript((prev) => {
            // Replace interim results or add final results
            const finalTranscripts = prev.filter((t) => t.isFinal)
            const lastInterim = newTranscripts[newTranscripts.length - 1]

            if (lastInterim.isFinal) {
              return [...finalTranscripts, lastInterim]
            } else {
              return [...finalTranscripts, lastInterim]
            }
          })
        }

        recognitionRef.current.onerror = (event: any) => {
          console.error("[] Speech recognition error:", event.error)
          setError(`Speech recognition error: ${event.error}`)
          setIsListening(false)
        }

        recognitionRef.current.onend = () => {
          console.log("[] Speech recognition ended")
          setIsListening(false)
        }
      } else {
        setIsSupported(false)
        setError("Speech recognition is not supported in this browser")
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [])

  const startListening = useCallback(() => {
    if (recognitionRef.current && !isListening) {
      try {
        recognitionRef.current.start()
        setIsListening(true)
        setError(null)
        console.log("[] Speech recognition started")
      } catch (err) {
        console.error("[] Error starting recognition:", err)
        setError("Failed to start speech recognition")
      }
    }
  }, [isListening])

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
      console.log("[] Speech recognition stopped")
    }
  }, [isListening])

  const clearTranscript = useCallback(() => {
    setTranscript([])
  }, [])

  return {
    isListening,
    transcript,
    startListening,
    stopListening,
    clearTranscript,
    isSupported,
    error,
  }
}
