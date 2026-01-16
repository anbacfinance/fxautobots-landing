"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, Clock, Youtube, BookOpen, Download, Settings, Zap, Eye, Instagram, MessageCircle } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

// Estructura de tutoriales - Edita aquí para agregar tus videos
const tutoriales = {
  general: [
    {
      id: "intro-mt5",
      title: "Introducción a MetaTrader 5",
      description: "Aprende los conceptos básicos de MT5 antes de instalar cualquier bot",
      youtubeId: "",
      duracion: "10:00",
      categoria: "Básico",
    },
    {
      id: "configurar-vps",
      title: "Cómo configurar un VPS para trading",
      description: "Guía completa para mantener tus bots corriendo 24/7",
      youtubeId: "",
      duracion: "15:00",
      categoria: "Avanzado",
    },
  ],
  akira: [
    {
      id: "akira-instalacion",
      title: "Instalación de AKIRA Bot",
      description: "Guía paso a paso para instalar AKIRA en tu MT5",
      youtubeId: "",
      duracion: "12:00",
      categoria: "Instalación",
    },
    {
      id: "akira-configuracion",
      title: "Configuración óptima de AKIRA",
      description: "Aprende a configurar los parámetros de AKIRA para máximo rendimiento",
      youtubeId: "",
      duracion: "18:00",
      categoria: "Configuración",
    },
  ],
  deus: [
    {
      id: "deus-instalacion",
      title: "Instalación de DEUS Bot",
      description: "Guía paso a paso para instalar DEUS en tu MT5",
      youtubeId: "",
      duracion: "12:00",
      categoria: "Instalación",
    },
    {
      id: "deus-configuracion",
      title: "Configuración óptima de DEUS",
      description: "Aprende a configurar los parámetros de DEUS para máximo rendimiento",
      youtubeId: "",
      duracion: "20:00",
      categoria: "Configuración",
    },
  ],
  scalper: [
    {
      id: "scalper-instalacion",
      title: "Instalación de SCALPER Bot",
      description: "Guía paso a paso para instalar SCALPER en tu MT5",
      youtubeId: "",
      duracion: "10:00",
      categoria: "Instalación",
    },
    {
      id: "scalper-configuracion",
      title: "Configuración óptima de SCALPER",
      description: "Aprende a configurar los parámetros para scalping efectivo",
      youtubeId: "",
      duracion: "15:00",
      categoria: "Configuración",
    },
  ],
  atlas: [
    {
      id: "atlas-instalacion",
      title: "Instalación de ATLAS Funding Bot",
      description: "Guía paso a paso para instalar ATLAS en tu MT5",
      youtubeId: "",
      duracion: "12:00",
      categoria: "Instalación",
    },
    {
      id: "atlas-configuracion",
      title: "Configuración para pruebas de fondeo",
      description: "Configura ATLAS para pasar tus pruebas de fondeo exitosamente",
      youtubeId: "",
      duracion: "25:00",
      categoria: "Configuración",
    },
    {
      id: "atlas-mantenimiento",
      title: "Mantener cuenta fondeada con ATLAS",
      description: "Estrategias para mantener tu cuenta fondeada a largo plazo",
      youtubeId: "",
      duracion: "20:00",
      categoria: "Avanzado",
    },
  ],
}

const botColors: Record<string, { bg: string; text: string; border: string; badge: string }> = {
  general: {
    bg: "from-gray-500/20 to-gray-600/10",
    text: "text-gray-500 dark:text-gray-400",
    border: "border-gray-500/30",
    badge: "bg-gray-500/20 text-gray-600 dark:text-gray-300",
  },
  akira: {
    bg: "from-red-500/20 to-red-600/10",
    text: "text-red-500 dark:text-red-400",
    border: "border-red-500/30",
    badge: "bg-red-500/20 text-red-600 dark:text-red-300",
  },
  deus: {
    bg: "from-cyan-500/20 to-cyan-600/10",
    text: "text-cyan-500 dark:text-cyan-400",
    border: "border-cyan-500/30",
    badge: "bg-cyan-500/20 text-cyan-600 dark:text-cyan-300",
  },
  scalper: {
    bg: "from-green-500/20 to-green-600/10",
    text: "text-green-500 dark:text-green-400",
    border: "border-green-500/30",
    badge: "bg-green-500/20 text-green-600 dark:text-green-300",
  },
  atlas: {
    bg: "from-amber-500/20 to-amber-600/10",
    text: "text-amber-500 dark:text-amber-400",
    border: "border-amber-500/30",
    badge: "bg-amber-500/20 text-amber-600 dark:text-amber-300",
  },
}

function VideoCard({
  tutorial,
  botKey,
}: {
  tutorial: (typeof tutoriales.general)[0]
  botKey: string
}) {
  const colors = botColors[botKey]
  const hasVideo = tutorial.youtubeId !== ""

  return (
    <Card
      className={`bg-gradient-to-br ${colors.bg} ${colors.border} border overflow-hidden group hover:scale-[1.02] transition-all duration-300`}
    >
      <CardContent className="p-0">
        {/* Thumbnail / Video */}
        <div className="relative aspect-video bg-black/50 dark:bg-black/50">
          {hasVideo ? (
            <iframe
              src={`https://www.youtube.com/embed/${tutorial.youtubeId}`}
              title={tutorial.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-muted/50">
              <div
                className={`w-16 h-16 rounded-full bg-background/50 flex items-center justify-center ${colors.text}`}
              >
                <Play className="w-8 h-8 ml-1" />
              </div>
              <span className="text-muted-foreground text-sm">Video próximamente</span>
            </div>
          )}

          {/* Duración */}
          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {tutorial.duracion}
          </div>
        </div>

        {/* Info */}
        <div className="p-4 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-foreground leading-tight">{tutorial.title}</h3>
            <Badge className={`${colors.badge} shrink-0 text-xs`}>{tutorial.categoria}</Badge>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">{tutorial.description}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default function TutorialesPage() {
  const [activeTab, setActiveTab] = useState("general")

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center">
              <Image src="/images/fxautobots-logo.png" alt="FXAutoBots Logo" width={40} height={40} className="mr-2" />
              <span className="font-bold text-xl">FXAutoBots</span>
            </Link>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/#features" className="text-sm font-medium hover:text-primary">
              Características
            </Link>
            <Link href="/#testimonials" className="text-sm font-medium hover:text-primary">
              Testimonios
            </Link>
            <Link href="/#pricing" className="text-sm font-medium hover:text-primary">
              Precios
            </Link>
            <Link href="/#brokers" className="text-sm font-medium hover:text-primary">
              Brokers
            </Link>
            <Link href="/backtest" className="text-sm font-medium hover:text-primary">
              Backtesting
            </Link>
            <Link href="/tutoriales" className="text-sm font-medium text-primary">
              Tutoriales
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-3">
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
            <ThemeToggle />
            <Button asChild>
              <Link href="/#pricing">Comprar Bot</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 border-b bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <Badge className="bg-red-500/20 text-red-500 dark:text-red-400 mb-4">
            <BookOpen className="w-3 h-3 mr-1" />
            Centro de Aprendizaje
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Tutoriales de <span className="text-red-500">Instalación</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Guías paso a paso para instalar y configurar cada uno de nuestros bots de trading. Aprende a sacar el máximo
            provecho de tu inversión.
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-8 mt-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">{Object.values(tutoriales).flat().length}</div>
              <div className="text-sm text-muted-foreground">Tutoriales</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">4</div>
              <div className="text-sm text-muted-foreground">Bots cubiertos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">24/7</div>
              <div className="text-sm text-muted-foreground">Disponible</div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-8 border-b bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 p-4 rounded-lg bg-card border">
              <Download className="w-5 h-5 text-cyan-500" />
              <div>
                <div className="text-sm font-medium text-foreground">Instalación</div>
                <div className="text-xs text-muted-foreground">Guías de setup</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-lg bg-card border">
              <Settings className="w-5 h-5 text-green-500" />
              <div>
                <div className="text-sm font-medium text-foreground">Configuración</div>
                <div className="text-xs text-muted-foreground">Optimiza tus bots</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-lg bg-card border">
              <Zap className="w-5 h-5 text-amber-500" />
              <div>
                <div className="text-sm font-medium text-foreground">Avanzado</div>
                <div className="text-xs text-muted-foreground">Tips de expertos</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-lg bg-card border">
              <Eye className="w-5 h-5 text-red-500" />
              <div>
                <div className="text-sm font-medium text-foreground">Resultados</div>
                <div className="text-xs text-muted-foreground">Backtests reales</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tutoriales */}
      <section className="py-16 flex-1">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="bg-muted/50 border p-1 flex flex-wrap justify-center gap-1">
              <TabsTrigger
                value="general"
                className="data-[state=active]:bg-gray-500/30 data-[state=active]:text-foreground"
              >
                General
              </TabsTrigger>
              <TabsTrigger
                value="akira"
                className="data-[state=active]:bg-red-500/30 data-[state=active]:text-red-500 dark:data-[state=active]:text-red-400"
              >
                AKIRA
              </TabsTrigger>
              <TabsTrigger
                value="deus"
                className="data-[state=active]:bg-cyan-500/30 data-[state=active]:text-cyan-500 dark:data-[state=active]:text-cyan-400"
              >
                DEUS
              </TabsTrigger>
              <TabsTrigger
                value="scalper"
                className="data-[state=active]:bg-green-500/30 data-[state=active]:text-green-500 dark:data-[state=active]:text-green-400"
              >
                SCALPER
              </TabsTrigger>
              <TabsTrigger
                value="atlas"
                className="data-[state=active]:bg-amber-500/30 data-[state=active]:text-amber-500 dark:data-[state=active]:text-amber-400"
              >
                ATLAS
              </TabsTrigger>
            </TabsList>

            {Object.entries(tutoriales).map(([key, videos]) => (
              <TabsContent key={key} value={key} className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className={`text-2xl font-bold ${botColors[key].text}`}>
                    {key === "general" ? "Tutoriales Generales" : `Tutoriales ${key.toUpperCase()}`}
                  </h2>
                  <Badge variant="outline" className="text-muted-foreground">
                    {videos.length} videos
                  </Badge>
                </div>

                {videos.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {videos.map((tutorial) => (
                      <VideoCard key={tutorial.id} tutorial={tutorial} botKey={key} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <Play className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Próximamente se agregarán tutoriales para este bot</p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t bg-gradient-to-b from-transparent to-red-500/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">¿Necesitas ayuda adicional?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Si tienes dudas que no se resuelven en los tutoriales, contáctanos directamente y te ayudaremos con la
            instalación.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="https://www.youtube.com/@FxautoBots" target="_blank">
              <Button className="bg-red-600 hover:bg-red-700 text-white">
                <Youtube className="w-4 h-4 mr-2" />
                Suscribirse al canal
              </Button>
            </Link>
            <Link href="/#contacto">
              <Button variant="outline">Contactar soporte</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          © 2025 FxautoBots. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  )
}
