"use client"

import { Button } from "@/components/ui/button"
import { Download, Trash2, Pause, Play } from "lucide-react"
import { useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface SessionControlsProps {
  onClear?: () => void
}

export default function SessionControls({ onClear }: SessionControlsProps) {
  const [isPaused, setIsPaused] = useState(false)

  return (
    <div className="space-y-3 pt-4 border-t border-border">
      <h3 className="text-sm font-medium text-card-foreground">Session Controls</h3>
      <div className="grid grid-cols-3 gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsPaused(!isPaused)}
          className="flex items-center gap-2"
          aria-label={isPaused ? "Resume session" : "Pause session"}
        >
          {isPaused ? (
            <>
              <Play className="h-4 w-4" />
              <span className="hidden sm:inline">Resume</span>
            </>
          ) : (
            <>
              <Pause className="h-4 w-4" />
              <span className="hidden sm:inline">Pause</span>
            </>
          )}
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 bg-transparent"
          aria-label="Export transcript"
        >
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline">Export</span>
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 text-destructive hover:text-destructive bg-transparent"
              aria-label="Clear transcript"
            >
              <Trash2 className="h-4 w-4" />
              <span className="hidden sm:inline">Clear</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Clear Transcript?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete all transcript entries from this session. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={onClear}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Clear All
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}
