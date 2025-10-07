"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Keyboard } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function KeyboardShortcutsDialog() {
  const shortcuts = [
    { key: "Space", description: "Hold to start/stop recording" },
    { key: "Esc", description: "Stop recording" },
    { key: "Ctrl + K", description: "Clear transcript" },
    { key: "Ctrl + E", description: "Export transcript" },
    { key: "Tab", description: "Navigate between controls" },
    { key: "Enter", description: "Activate focused button" },
  ]

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="View keyboard shortcuts">
          <Keyboard className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Keyboard Shortcuts</DialogTitle>
          <DialogDescription>Use these shortcuts to navigate and control the voice interface</DialogDescription>
        </DialogHeader>
        <div className="space-y-3 mt-4">
          {shortcuts.map((shortcut, index) => (
            <div key={index} className="flex items-center justify-between gap-4 py-2">
              <span className="text-sm text-foreground">{shortcut.description}</span>
              <Badge variant="outline" className="font-mono text-xs">
                {shortcut.key}
              </Badge>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
