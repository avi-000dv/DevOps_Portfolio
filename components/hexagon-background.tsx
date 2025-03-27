"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

export default function HexagonBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Hexagon properties
    const hexSize = 30
    const hexSpacing = 70
    const hexagons: { x: number; y: number; size: number; opacity: number; color: string }[] = []

    // Create hexagons
    const createHexagons = () => {
      hexagons.length = 0
      const cols = Math.ceil(canvas.width / hexSpacing) + 2
      const rows = Math.ceil(canvas.height / hexSpacing) + 2

      const isDark = resolvedTheme === "dark"

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const offsetX = j % 2 === 0 ? 0 : hexSpacing / 2
          const x = i * hexSpacing + offsetX - hexSpacing
          const y = j * hexSpacing - hexSpacing

          const darkColors = [
            "rgba(168, 85, 247, 0.2)", // purple
            "rgba(34, 211, 238, 0.2)", // cyan
            "rgba(59, 130, 246, 0.2)", // blue
          ]

          const lightColors = [
            "rgba(168, 85, 247, 0.1)", // purple
            "rgba(34, 211, 238, 0.1)", // cyan
            "rgba(59, 130, 246, 0.1)", // blue
          ]

          const colors = isDark ? darkColors : lightColors

          hexagons.push({
            x,
            y,
            size: hexSize * (0.5 + Math.random() * 0.5),
            opacity: isDark ? 0.05 + Math.random() * 0.1 : 0.03 + Math.random() * 0.07,
            color: colors[Math.floor(Math.random() * colors.length)],
          })
        }
      }
    }

    // Draw hexagon
    const drawHexagon = (x: number, y: number, size: number, color: string) => {
      ctx.beginPath()
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i
        const xPos = x + size * Math.cos(angle)
        const yPos = y + size * Math.sin(angle)

        if (i === 0) {
          ctx.moveTo(xPos, yPos)
        } else {
          ctx.lineTo(xPos, yPos)
        }
      }
      ctx.closePath()
      ctx.fillStyle = color
      ctx.fill()
      const isDark = resolvedTheme === "dark"
      ctx.strokeStyle = isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.03)"
      ctx.stroke()
    }

    // Animation
    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      hexagons.forEach((hexagon) => {
        // Subtle movement
        hexagon.y += 0.1

        // Reset position if off-screen
        if (hexagon.y > canvas.height + hexSize) {
          hexagon.y = -hexSize
        }

        drawHexagon(hexagon.x, hexagon.y, hexagon.size, hexagon.color)
      })

      animationFrame = requestAnimationFrame(animate)
    }

    createHexagons()
    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationFrame)
    }
  }, [resolvedTheme])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />
}

