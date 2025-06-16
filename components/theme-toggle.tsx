"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Montar el componente solo del lado del cliente para evitar errores de hidratación
  useEffect(() => {
    setMounted(true)
  }, [])

  // Si no está montado, mostrar un placeholder para evitar saltos de layout
  if (!mounted) {
    return (
      <Button variant="outline" size="icon" disabled>
        <Sun className="h-5 w-5" />
      </Button>
    )
  }

  // Usar resolvedTheme en lugar de theme para obtener el tema actual real
  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
    console.log("Cambiando tema de", resolvedTheme, "a", resolvedTheme === "dark" ? "light" : "dark")
  }

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme} className="border-muted-foreground/20">
      {resolvedTheme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  )
}
