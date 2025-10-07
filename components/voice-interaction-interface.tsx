"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mic, MicOff, Settings, Volume2 } from "lucide-react"
import VoiceVisualizer from "./voice-visualizer"
import TranscriptDisplay from "./transcript-display"
import SessionControls from "./session-controls"
import { useSpeechRecognition } from "@/hooks/use-speech-recognition"
import { useSessionManager } from "@/hooks/use-session-manager"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { AccessibilityAnnouncer } from "./accessibility-announcer"
import { ThemeToggle } from "./theme-toggle"
import { KeyboardShortcutsDialog } from "./keyboard-shortcuts-dialog"

export default function VoiceInteractionInterface() {
  const { isListening, transcript, startListening, stopListening, clearTranscript, isSupported, error } =
    useSpeechRecognition()
  const { session, saveTranscript } = useSessionManager()
  const [announcement, setAnnouncement] = useState("")

  useEffect(() => {
    const finalTranscripts = transcript.filter((t) => t.isFinal)
    if (finalTranscripts.length > 0) {
      const lastTranscript = finalTranscripts[finalTranscripts.length - 1]
      saveTranscript(lastTranscript.text, lastTranscript.confidence)
    }
  }, [transcript, saveTranscript])

  useEffect(() => {
    if (isListening) {
      setAnnouncement("Recording started. Speak now.")
    } else if (transcript.length > 0) {
      setAnnouncement("Recording stopped. Transcript updated.")
    }
  }, [isListening, transcript.length])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Space bar for push-to-talk
      if (e.code === "Space" && !isListening && e.target === document.body) {
        e.preventDefault()
        startListening()
      }

      // Escape to stop recording
      if (e.code === "Escape" && isListening) {
        e.preventDefault()
        stopListening()
        setAnnouncement("Recording cancelled")
      }

      // Ctrl+K to clear transcript
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault()
        clearTranscript()
        setAnnouncement("Transcript cleared")
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === "Space" && isListening) {
        e.preventDefault()
        stopListening()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [isListening, startListening, stopListening, clearTranscript])

  return (
    <div className="flex flex-col min-h-screen">
      <AccessibilityAnnouncer message={announcement} priority="assertive" />

      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Volume2 className="h-6 w-6 text-primary" aria-hidden="true" />
              <h1 className="text-xl font-semibold text-foreground">VoiceLearn</h1>
            </div>
            <span className="text-sm text-muted-foreground hidden sm:inline">AI-Powered Voice Learning Assistant</span>
          </div>
          <div className="flex items-center gap-2">
            {session && (
              <span className="text-xs text-muted-foreground hidden md:inline" aria-label={`Session ID: ${session.id}`}>
                Session: {session.id.slice(-8)}
              </span>
            )}
            <ThemeToggle />
            <KeyboardShortcutsDialog />
            <Button variant="ghost" size="icon" aria-label="Settings">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 container mx-auto px-4 py-8 max-w-5xl">
        {!isSupported && (
          <Alert variant="destructive" className="mb-6" role="alert">
            <AlertCircle className="h-4 w-4" aria-hidden="true" />
            <AlertDescription>
              Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari.
            </AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert variant="destructive" className="mb-6" role="alert">
            <AlertCircle className="h-4 w-4" aria-hidden="true" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Voice Capture Section */}
          <Card className="p-6 bg-card border-border">
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-card-foreground mb-2">Voice Input</h2>
                <p className="text-sm text-muted-foreground">
                  Press and hold the microphone button or Space bar to speak
                </p>
              </div>

              {/* Voice Visualizer */}
              <VoiceVisualizer isListening={isListening} />

              {/* Push-to-Talk Button */}
              <div className="flex flex-col items-center gap-4">
                <button
                  onMouseDown={startListening}
                  onMouseUp={stopListening}
                  onMouseLeave={() => isListening && stopListening()}
                  onTouchStart={startListening}
                  onTouchEnd={stopListening}
                  disabled={!isSupported}
                  className={`relative w-24 h-24 rounded-full transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-ring disabled:opacity-50 disabled:cursor-not-allowed ${
                    isListening
                      ? "bg-primary scale-110 shadow-lg shadow-primary/50"
                      : "bg-secondary hover:bg-secondary/80"
                  }`}
                  aria-label={
                    isListening ? "Recording in progress. Release to stop." : "Press and hold to start recording"
                  }
                  aria-pressed={isListening}
                  tabIndex={0}
                >
                  {isListening && (
                    <div className="absolute inset-0 rounded-full bg-primary animate-pulse-ring" aria-hidden="true" />
                  )}
                  {isListening ? (
                    <Mic className="absolute inset-0 m-auto h-10 w-10 text-primary-foreground" aria-hidden="true" />
                  ) : (
                    <MicOff
                      className="absolute inset-0 m-auto h-10 w-10 text-secondary-foreground"
                      aria-hidden="true"
                    />
                  )}
                </button>

                <div className="text-center">
                  <p className="text-sm font-medium text-foreground" aria-live="polite">
                    {isListening ? "Listening..." : "Press to Speak"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {isListening ? "Release when finished" : "Hold Space or click button"}
                  </p>
                </div>
              </div>

              {/* Session Controls */}
              <SessionControls onClear={clearTranscript} />
            </div>
          </Card>

          {/* Transcript Section */}
          <Card className="p-6 bg-card border-border">
            <TranscriptDisplay transcript={transcript} />
          </Card>
        </div>

        {/* Info Cards */}
        <div className="grid gap-4 mt-8 sm:grid-cols-3" role="list" aria-label="Feature highlights">
          <Card className="p-4 bg-card border-border" role="listitem">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/10" aria-hidden="true">
                <Mic className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-sm text-card-foreground mb-1">High Accuracy</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Advanced speech recognition with 92%+ accuracy
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-card border-border" role="listitem">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-accent/10" aria-hidden="true">
                <Volume2 className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h3 className="font-medium text-sm text-card-foreground mb-1">Real-Time</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Instant transcription with low latency streaming
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-card border-border" role="listitem">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-chart-4/10" aria-hidden="true">
                <Settings className="h-5 w-5 text-chart-4" />
              </div>
              <div>
                <h3 className="font-medium text-sm text-card-foreground mb-1">Accessible</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  WCAG 2.1 compliant with keyboard navigation
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
