"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Instagram, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NavLink {
  href: string
  label: string
}

interface MobileNavProps {
  links: NavLink[]
}

export function MobileNav({ links }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)

  const closeMenu = () => setIsOpen(false)

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Cerrar menu" : "Abrir menu"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-background border-b shadow-lg z-50">
          <nav className="container py-4 flex flex-col gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="text-sm font-medium py-3 px-4 rounded-md hover:bg-muted transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-4 py-3 px-4 border-t mt-2">
              <a
                href="https://instagram.com/fxautobots"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://t.me/fxautobots"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Telegram"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </nav>
        </div>
      )}
    </div>
  )
}
