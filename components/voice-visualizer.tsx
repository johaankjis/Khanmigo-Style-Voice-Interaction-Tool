"use client"

interface VoiceVisualizerProps {
  isListening: boolean
}

export default function VoiceVisualizer({ isListening }: VoiceVisualizerProps) {
  const bars = Array.from({ length: 40 }, (_, i) => i)

  return (
    <div
      className="relative h-32 bg-secondary rounded-lg overflow-hidden flex items-center justify-center gap-1 px-4"
      role="img"
      aria-label={isListening ? "Audio waveform visualization - actively listening" : "Audio waveform - inactive"}
    >
      {bars.map((bar) => (
        <div
          key={bar}
          className={`w-1 rounded-full transition-all duration-150 ${
            isListening ? "bg-primary animate-wave" : "bg-muted-foreground/30 h-2"
          }`}
          style={{
            height: isListening ? `${Math.random() * 60 + 20}%` : "8px",
            animationDelay: `${bar * 0.05}s`,
          }}
          aria-hidden="true"
        />
      ))}
      {!isListening && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-sm text-muted-foreground">Waiting for audio input...</p>
        </div>
      )}
    </div>
  )
}
