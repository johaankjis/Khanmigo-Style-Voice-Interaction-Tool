"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"
import { useState, useEffect, useRef } from "react"

interface TranscriptEntry {
  text: string
  confidence: number
  timestamp: Date
  isFinal: boolean
}

interface TranscriptDisplayProps {
  transcript: TranscriptEntry[]
}

export default function TranscriptDisplay({ transcript }: TranscriptDisplayProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new transcript entries are added
  useEffect(() => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }, [transcript])

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return "text-chart-4 bg-chart-4/10 border-chart-4/20"
    if (confidence >= 0.7) return "text-chart-2 bg-chart-2/10 border-chart-2/20"
    return "text-chart-1 bg-chart-1/10 border-chart-1/20"
  }

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch (err) {
      console.error("[v0] Failed to copy text:", err)
    }
  }

  const exportTranscript = () => {
    const fullText = transcript
      .filter((t) => t.isFinal)
      .map((t) => `[${t.timestamp.toLocaleTimeString()}] ${t.text}`)
      .join("\n\n")

    const blob = new Blob([fullText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `transcript-${new Date().toISOString().split("T")[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const totalWords = transcript.reduce((acc, entry) => acc + entry.text.split(" ").length, 0)
  const avgConfidence =
    transcript.length > 0 ? transcript.reduce((acc, entry) => acc + entry.confidence, 0) / transcript.length : 0

  return (
    <div className="space-y-4 h-full flex flex-col">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-card-foreground mb-2">Live Transcript</h2>
          <p className="text-sm text-muted-foreground">Real-time speech-to-text with confidence scores</p>
        </div>
        {transcript.length > 0 && (
          <Button variant="outline" size="sm" onClick={exportTranscript} className="shrink-0 bg-transparent">
            Export
          </Button>
        )}
      </div>

      <ScrollArea ref={scrollRef} className="flex-1 h-[400px] rounded-lg border border-border bg-secondary/50 p-4">
        {transcript.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">No transcript yet</p>
              <p className="text-xs text-muted-foreground">Start speaking to see your words appear here</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {transcript.map((entry, index) => (
              <div
                key={index}
                className={`group p-3 rounded-lg transition-all ${
                  entry.isFinal ? "bg-card border border-border" : "bg-muted/50 border border-dashed border-border"
                }`}
                role="article"
                aria-label={`Transcript entry ${index + 1}`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span
                    className="text-xs text-muted-foreground"
                    aria-label={`Timestamp: ${entry.timestamp.toLocaleTimeString()}`}
                  >
                    {entry.timestamp.toLocaleTimeString()}
                  </span>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={`text-xs ${getConfidenceColor(entry.confidence)}`}>
                      {Math.round(entry.confidence * 100)}%
                    </Badge>
                    {entry.isFinal && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => copyToClipboard(entry.text, index)}
                        aria-label="Copy transcript text"
                      >
                        {copiedIndex === index ? (
                          <Check className="h-3 w-3 text-chart-4" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </Button>
                    )}
                  </div>
                </div>
                <p className="text-sm text-card-foreground leading-relaxed text-pretty">{entry.text}</p>
                {!entry.isFinal && (
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex gap-1">
                      <div
                        className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      />
                      <div
                        className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      />
                      <div
                        className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground italic">Processing...</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </ScrollArea>

      <div className="grid grid-cols-3 gap-4 pt-2 border-t border-border">
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-1">Segments</p>
          <p className="text-lg font-semibold text-foreground">{transcript.length}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-1">Words</p>
          <p className="text-lg font-semibold text-foreground">{totalWords}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-1">Avg Confidence</p>
          <p className="text-lg font-semibold text-foreground">{Math.round(avgConfidence * 100)}%</p>
        </div>
      </div>
    </div>
  )
}
