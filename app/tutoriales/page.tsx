"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, Clock, Youtube, BookOpen, Download, Settings, Zap, Eye, Instagram, MessageCircle } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

// ─── ANIMATION STYLES ─────────────────────────────────────────────────────
const animStyles = `
  /* Scroll reveal */
  .reveal {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1);
  }
  .reveal.revealed { opacity: 1; transform: translateY(0); }
  .reveal-scale {
    opacity: 0; transform: scale(0.94);
    transition: opacity 0.6s cubic-bezier(0.4,0,0.2,1), transform 0.6s cubic-bezier(0.4,0,0.2,1);
  }
  .reveal-scale.revealed { opacity: 1; transform: scale(1); }
  .delay-100 { transition-delay: 0.10s; }
  .delay-200 { transition-delay: 0.20s; }
  .delay-300 { transition-delay: 0.30s; }
  .delay-400 { transition-delay: 0.40s; }

  /* Ticker */
  @keyframes tut-ticker {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  .tut-ticker { animation: tut-ticker 26s linear infinite; }
  .tut-ticker:hover { animation-play-state: paused; }

  /* Canvas partículas */
  #tut-canvas {
    position: absolute; inset: 0;
    pointer-events: none; opacity: 0.35;
  }

  /* Badge pulse */
  @keyframes tut-pulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(239,68,68,0.35); }
    50%       { box-shadow: 0 0 0 10px rgba(239,68,68,0); }
  }
  .tut-badge-pulse { animation: tut-pulse 2.5s ease-in-out infinite; }

  /* Stat shimmer */
  @keyframes tut-shimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  .stat-shimmer {
    background: linear-gradient(90deg, hsl(var(--foreground)) 0%, hsl(var(--foreground) / 0.5) 40%, hsl(var(--foreground)) 60%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: tut-shimmer 3s linear infinite;
  }

  /* Quick link hover */
  .quick-link {
    transition: transform 0.25s cubic-bezier(0.4,0,0.2,1), box-shadow 0.25s ease, border-color 0.25s;
  }
  .quick-link:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 28px rgba(0,0,0,0.1);
  }

  /* Video card hover — sin transform para no crear stacking context */
  .vid-card {
    transition: box-shadow 0.3s ease, border-color 0.3s ease;
  }
  .vid-card:hover {
    box-shadow: 0 16px 36px rgba(0,0,0,0.13);
  }

  /* Play icon float */
  @keyframes play-float {
    0%, 100% { transform: translateY(0) scale(1); }
    50%       { transform: translateY(-5px) scale(1.05); }
  }
  .play-float { animation: play-float 2.8s ease-in-out infinite; }

  /* Tab indicator glow */
  .tab-active-glow {
    transition: box-shadow 0.3s;
  }

  /* Nav underline */
  .nav-ul { position: relative; }
  .nav-ul::after {
    content: ''; position: absolute; bottom: -2px; left: 0;
    width: 0; height: 2px; background: hsl(var(--primary));
    transition: width 0.3s cubic-bezier(0.4,0,0.2,1);
  }
  .nav-ul:hover::after { width: 100%; }

  /* CTA orb */
  @keyframes cta-orb {
    0%, 100% { opacity: 0.04; }
    50%       { opacity: 0.09; }
  }
  .cta-orb { animation: cta-orb 4s ease-in-out infinite; }
`

// ─── SCROLL REVEAL ────────────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("revealed") }),
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    )
    document.querySelectorAll(".reveal, .reveal-scale").forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

// ─── ANIMATED COUNTER ─────────────────────────────────────────────────────
function AnimCounter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const t0 = performance.now()
        const tick = (now: number) => {
          const p = Math.min((now - t0) / 1800, 1)
          const e = 1 - Math.pow(1 - p, 3)
          setCount(Math.floor(e * end))
          if (p < 1) requestAnimationFrame(tick)
          else setCount(end)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.5 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [end])
  return <span ref={ref}>{count}{suffix}</span>
}

// ─── HERO PARTICLES ───────────────────────────────────────────────────────
function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    let animId: number
    const particles: { x: number; y: number; vx: number; vy: number; r: number; alpha: number }[] = []
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize()
    window.addEventListener("resize", resize)
    for (let i = 0; i < 50; i++) {
      particles.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4, r: Math.random() * 2 + 0.5, alpha: Math.random() * 0.4 + 0.1 })
    }
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(239,68,68,${p.alpha})`; ctx.fill()
      })
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach((b) => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y)
          if (dist < 100) {
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(239,68,68,${0.08 * (1 - dist / 100)})`
            ctx.lineWidth = 0.5; ctx.stroke()
          }
        })
      })
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize) }
  }, [])
  return <canvas ref={canvasRef} id="tut-canvas" />
}

// ─── TICKER ───────────────────────────────────────────────────────────────
function TickerTape() {
  const items = [
    "📹 Tutoriales paso a paso", "⚡ Instalación en minutos",
    "🤖 Akira · Deus · Scalper · Atlas", "🎓 Desde cero hasta experto",
    "🔧 Configuración óptima incluida", "📊 Backtests explicados",
    "🌎 Soporte en español", "▶️ Videos en YouTube",
  ]
  const doubled = [...items, ...items]
  return (
    <div className="w-full overflow-hidden bg-red-500/5 border-b border-red-500/10 py-2.5">
      <div className="tut-ticker flex gap-10 whitespace-nowrap w-max">
        {doubled.map((item, i) => (
          <span key={i} className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            {item}<span className="text-red-400/40">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── DATA ─────────────────────────────────────────────────────────────────
const tutoriales = {
  general: [
    { id: "intro-mt4", title: "Introducción a MetaTrader 4", description: "En este video te explico qué es MetaTrader 4 (MT4) y cómo empezar a usarla desde cero.", youtubeId: "LlwAST_0cfs", duracion: "08:11", categoria: "Básico" },
    { id: "vps-gratis", title: "VPS GRATIS para MetaTrader 4 con HFM", description: "En este video te muestro cómo obtener un VPS GRATIS con HFM paso a paso.", youtubeId: "busbmR_aR2k", duracion: "3:52", categoria: "Intermedio" },
    { id: "instalar-mt4", title: "Cómo instalar MetaTrader 4 en un VPS", description: "En este video te muestro cómo instalar MetaTrader 4 (MT4) en un VPS paso a paso.", youtubeId: "FRIQvZOYrLM", duracion: "3:09", categoria: "Básico" },
  ],
  akira: [
    { id: "akira-instalacion", title: "Instalación de AKIRA Bot", description: "Guía paso a paso para instalar AKIRA en tu MT5", youtubeId: "", duracion: "12:00", categoria: "Instalación" },
    { id: "akira-configuracion", title: "Configuración óptima de AKIRA", description: "Aprende a configurar los parámetros de AKIRA para máximo rendimiento", youtubeId: "", duracion: "18:00", categoria: "Configuración" },
  ],
  deus: [
    { id: "deus-instalacion", title: "Instalación de DEUS Bot", description: "Guía paso a paso para instalar DEUS en tu MT5", youtubeId: "", duracion: "12:00", categoria: "Instalación" },
    { id: "deus-configuracion", title: "Configuración óptima de DEUS", description: "Aprende a configurar los parámetros de DEUS para máximo rendimiento", youtubeId: "", duracion: "20:00", categoria: "Configuración" },
  ],
  scalper: [
    { id: "scalper-instalacion", title: "Instalación de SCALPER Bot", description: "Guía paso a paso para instalar SCALPER en tu MT5", youtubeId: "", duracion: "10:00", categoria: "Instalación" },
    { id: "scalper-configuracion", title: "Configuración óptima de SCALPER", description: "Aprende a configurar los parámetros para scalping efectivo", youtubeId: "", duracion: "15:00", categoria: "Configuración" },
  ],
  atlas: [
    { id: "atlas-instalacion", title: "Instalación de ATLAS Funding Bot", description: "Guía paso a paso para instalar ATLAS en tu MT5", youtubeId: "", duracion: "12:00", categoria: "Instalación" },
    { id: "atlas-configuracion", title: "Configuración para pruebas de fondeo", description: "Configura ATLAS para pasar tus pruebas de fondeo exitosamente", youtubeId: "", duracion: "25:00", categoria: "Configuración" },
    { id: "atlas-mantenimiento", title: "Mantener cuenta fondeada con ATLAS", description: "Estrategias para mantener tu cuenta fondeada a largo plazo", youtubeId: "", duracion: "20:00", categoria: "Avanzado" },
  ],
}

const botColors: Record<string, { bg: string; text: string; border: string; badge: string; accent: string }> = {
  general: { bg: "from-gray-500/20 to-gray-600/10",   text: "text-gray-500 dark:text-gray-400",   border: "border-gray-500/30",   badge: "bg-gray-500/20 text-gray-600 dark:text-gray-300",   accent: "rgba(107,114,128," },
  akira:   { bg: "from-red-500/20 to-red-600/10",     text: "text-red-500 dark:text-red-400",     border: "border-red-500/30",     badge: "bg-red-500/20 text-red-600 dark:text-red-300",     accent: "rgba(239,68,68," },
  deus:    { bg: "from-cyan-500/20 to-cyan-600/10",   text: "text-cyan-500 dark:text-cyan-400",   border: "border-cyan-500/30",   badge: "bg-cyan-500/20 text-cyan-600 dark:text-cyan-300",   accent: "rgba(6,182,212," },
  scalper: { bg: "from-green-500/20 to-green-600/10", text: "text-green-500 dark:text-green-400", border: "border-green-500/30", badge: "bg-green-500/20 text-green-600 dark:text-green-300", accent: "rgba(34,197,94," },
  atlas:   { bg: "from-amber-500/20 to-amber-600/10", text: "text-amber-500 dark:text-amber-400", border: "border-amber-500/30", badge: "bg-amber-500/20 text-amber-600 dark:text-amber-300", accent: "rgba(245,158,11," },
}

// ─── VIDEO CARD ───────────────────────────────────────────────────────────
function VideoCard({ tutorial, botKey }: { tutorial: (typeof tutoriales.general)[0]; botKey: string }) {
  const colors = botColors[botKey]
  const hasVideo = tutorial.youtubeId !== ""

  return (
    <Card className={`vid-card bg-gradient-to-br ${colors.bg} ${colors.border} border overflow-hidden`}>
      <CardContent className="p-0">
        <div className="relative aspect-video bg-black/50">
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
              <div className={`w-16 h-16 rounded-full bg-background/50 flex items-center justify-center ${colors.text} play-float`}>
                <Play className="w-8 h-8 ml-1" />
              </div>
              <span className="text-muted-foreground text-sm">Video próximamente</span>
            </div>
          )}
          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {tutorial.duracion}
          </div>
        </div>
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

// ─── PAGE ─────────────────────────────────────────────────────────────────
export default function TutorialesPage() {
  const [activeTab, setActiveTab] = useState("general")
  useScrollReveal()

  const totalVideos = Object.values(tutoriales).flat().length

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <style>{animStyles}</style>

      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center group">
              <div className="transition-transform duration-300 group-hover:rotate-12">
                <Image src="/images/fxautobots-logo.png" alt="FXAutoBots Logo" width={40} height={40} className="md:mr-2" />
              </div>
              <span className="font-bold text-xl hidden md:inline">FXAutoBots</span>
            </Link>
          </div>
          <nav className="hidden md:flex gap-6">
            {[
              { href: "/#features",     label: "Características" },
              { href: "/#testimonials", label: "Testimonios" },
              { href: "/#pricing",      label: "Precios" },
              { href: "/#brokers",      label: "Brokers" },
              { href: "/backtest",      label: "Backtesting" },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="text-sm font-medium hover:text-primary nav-ul transition-colors">
                {link.label}
              </Link>
            ))}
            <Link href="/tutoriales" className="text-sm font-medium text-primary nav-ul">Tutoriales</Link>
          </nav>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-3">
              <a href="https://instagram.com/fxautobots" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-all hover:scale-110" aria-label="Instagram"><Instagram className="h-5 w-5" /></a>
              <a href="https://t.me/fxautobots" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-all hover:scale-110" aria-label="Telegram"><MessageCircle className="h-5 w-5" /></a>
            </div>
            <ThemeToggle />
            <Button asChild className="transition-all hover:-translate-y-0.5 hover:shadow-md">
              <Link href="/#pricing">Comprar Bot</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Ticker */}
      <TickerTape />

      {/* Hero */}
      <section className="py-16 border-b bg-muted/30 relative overflow-hidden">
        <HeroParticles />
        {/* Orbs */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-64 h-64 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-48 h-48 bg-red-500/3 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="reveal">
            <div className="inline-block tut-badge-pulse rounded-full mb-4">
              <Badge className="bg-red-500/20 text-red-500 dark:text-red-400 px-4 py-1.5 text-sm">
                <BookOpen className="w-3.5 h-3.5 mr-1.5" />
                Centro de Aprendizaje
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Tutoriales de <span className="text-red-500">Instalación</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Guías paso a paso para instalar y configurar cada uno de nuestros bots de trading. Aprende a sacar el máximo provecho de tu inversión.
            </p>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-8 mt-10 reveal delay-200">
            {[
              { value: totalVideos, suffix: "", label: "Tutoriales" },
              { value: 4,           suffix: "",   label: "Bots cubiertos" },
              { value: 24,          suffix: "/7", label: "Disponible" },
            ].map((s) => (
              <div key={s.label} className="text-center px-6 py-4 rounded-2xl bg-background/60 border backdrop-blur-sm">
                <div className="text-3xl font-bold stat-shimmer">
                  <AnimCounter end={s.value} suffix={s.suffix} />
                </div>
                <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-8 border-b bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Download,  color: "text-cyan-500",  bg: "bg-cyan-500/10",  title: "Instalación",   sub: "Guías de setup" },
              { icon: Settings,  color: "text-green-500", bg: "bg-green-500/10", title: "Configuración", sub: "Optimiza tus bots" },
              { icon: Zap,       color: "text-amber-500", bg: "bg-amber-500/10", title: "Avanzado",      sub: "Tips de expertos" },
              { icon: Eye,       color: "text-red-500",   bg: "bg-red-500/10",   title: "Resultados",    sub: "Backtests reales" },
            ].map((item, i) => (
              <div key={item.title} className={`quick-link reveal delay-${(i + 1) * 100} flex items-center gap-3 p-4 rounded-xl bg-card border cursor-default`}>
                <div className={`w-10 h-10 rounded-lg ${item.bg} flex items-center justify-center shrink-0`}>
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">{item.title}</div>
                  <div className="text-xs text-muted-foreground">{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tutoriales */}
      <section className="py-16 flex-1">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <div className="reveal">
              <TabsList className="bg-muted/50 border p-1 flex flex-wrap justify-center gap-1">
                <TabsTrigger value="general" className="data-[state=active]:bg-gray-500/30 data-[state=active]:text-foreground transition-all">
                  General
                </TabsTrigger>
                <TabsTrigger value="akira" className="data-[state=active]:bg-red-500/30 data-[state=active]:text-red-500 dark:data-[state=active]:text-red-400 transition-all">
                  AKIRA
                </TabsTrigger>
                <TabsTrigger value="deus" className="data-[state=active]:bg-cyan-500/30 data-[state=active]:text-cyan-500 dark:data-[state=active]:text-cyan-400 transition-all">
                  DEUS
                </TabsTrigger>
                <TabsTrigger value="scalper" className="data-[state=active]:bg-green-500/30 data-[state=active]:text-green-500 dark:data-[state=active]:text-green-400 transition-all">
                  SCALPER
                </TabsTrigger>
                <TabsTrigger value="atlas" className="data-[state=active]:bg-amber-500/30 data-[state=active]:text-amber-500 dark:data-[state=active]:text-amber-400 transition-all">
                  ATLAS
                </TabsTrigger>
              </TabsList>
            </div>

            {Object.entries(tutoriales).map(([key, videos]) => (
              <TabsContent key={key} value={key} className="space-y-6">
                <div className="flex items-center justify-between reveal">
                  <h2 className={`text-2xl font-bold ${botColors[key].text}`}>
                    {key === "general" ? "Tutoriales Generales" : `Tutoriales ${key.toUpperCase()}`}
                  </h2>
                  <Badge variant="outline" className="text-muted-foreground">
                    {videos.length} videos
                  </Badge>
                </div>

                {videos.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {videos.map((tutorial, i) => (
                      <div key={tutorial.id} className={`reveal delay-${Math.min((i + 1) * 100, 400)}`}>
                        <VideoCard tutorial={tutorial} botKey={key} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground reveal">
                    <div className="play-float inline-block">
                      <Play className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    </div>
                    <p>Próximamente se agregarán tutoriales para este bot</p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t relative overflow-hidden">
        <div className="cta-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-500 rounded-full blur-[100px] pointer-events-none" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="reveal">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">¿Necesitas ayuda adicional?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Si tienes dudas que no se resuelven en los tutoriales, contáctanos directamente y te ayudaremos con la instalación.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="https://www.youtube.com/@FxautoBotts" target="_blank">
                <Button className="bg-red-600 hover:bg-red-700 text-white transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-red-500/25">
                  <Youtube className="w-4 h-4 mr-2" />
                  Suscribirse al canal
                </Button>
              </Link>
              <Link href="/#contacto">
                <Button variant="outline" className="transition-all hover:-translate-y-0.5 hover:shadow-md">
                  Contactar soporte
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          © 2026 FxautoBots. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  )
}
