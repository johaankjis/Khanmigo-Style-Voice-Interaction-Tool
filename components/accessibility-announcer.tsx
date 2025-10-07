"use client"

import { useEffect, useRef } from "react"

interface AccessibilityAnnouncerProps {
  message: string
  priority?: "polite" | "assertive"
}

export function AccessibilityAnnouncer({ message, priority = "polite" }: AccessibilityAnnouncerProps) {
  const announcerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (message && announcerRef.current) {
      // Clear and re-announce to ensure screen readers pick it up
      announcerRef.current.textContent = ""
      setTimeout(() => {
        if (announcerRef.current) {
          announcerRef.current.textContent = message
        }
      }, 100)
    }
  }, [message])

  return (
    <div
      ref={announcerRef}
      role="status"
      aria-live={priority}
      aria-atomic="true"
      className="sr-only"
      aria-relevant="additions text"
    />
  )
}
