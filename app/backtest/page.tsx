"use client"

import { Instagram, MessageCircle, ChevronLeft, TrendingUp, BarChart3, Zap, Shield } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThemeToggle } from "@/components/theme-toggle"
import { BacktestCarousel } from "@/components/BacktestCarousel"

// ─── ANIMATION STYLES ─────────────────────────────────────────────────────
const animStyles = `
  /* Scroll reveal */
  .bt-reveal {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1);
  }
  .bt-reveal.revealed { opacity: 1; transform: translateY(0); }
  .bt-delay-100 { transition-delay: 0.10s; }
  .bt-delay-200 { transition-delay: 0.20s; }
  .bt-delay-300 { transition-delay: 0.30s; }
  .bt-delay-400 { transition-delay: 0.40s; }

  /* Ticker */
  @keyframes bt-ticker {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  .bt-ticker { animation: bt-ticker 28s linear infinite; }
  .bt-ticker:hover { animation-play-state: paused; }

  /* Canvas */
  #bt-canvas {
    position: absolute; inset: 0;
    pointer-events: none; opacity: 0.35;
  }

  /* Stat shimmer */
  @keyframes bt-shimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  .bt-stat {
    background: linear-gradient(90deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.5) 40%, hsl(var(--primary)) 60%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: bt-shimmer 3s linear infinite;
  }

  /* Card hover — sin transform para no crear stacking context */
  .bt-card {
    transition: box-shadow 0.3s ease, border-color 0.3s ease;
  }
  .bt-card:hover {
    box-shadow: 0 14px 32px rgba(0,0,0,0.12);
  }

  /* Nav underline */
  .bt-nav { position: relative; }
  .bt-nav::after {
    content: ''; position: absolute; bottom: -2px; left: 0;
    width: 0; height: 2px; background: hsl(var(--primary));
    transition: width 0.3s cubic-bezier(0.4,0,0.2,1);
  }
  .bt-nav:hover::after { width: 100%; }

  /* Badge pulse */
  @keyframes bt-pulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(59,130,246,0.4); }
    50%       { box-shadow: 0 0 0 10px rgba(59,130,246,0); }
  }
  .bt-badge-pulse { animation: bt-pulse 2.5s ease-in-out infinite; }

  /* Rentabilidad positive glow */
  .rent-positive {
    color: #22c55e;
    font-weight: 700;
  }
  .dd-value { color: #f97316; font-weight: 600; }

  /* Mobile tabs fix — wrap en 2 filas en mobile */
  .bt-tabslist {
    display: grid !important;
    grid-template-columns: 1fr 1fr !important;
    gap: 4px !important;
    height: auto !important;
  }
  @media (min-width: 640px) {
    .bt-tabslist {
      grid-template-columns: 1fr 1fr 1fr 1fr !important;
    }
  }
`

// ─── SCROLL REVEAL ────────────────────────────────────────────────────────
function useScrollReveal(dep: string) {
  useEffect(() => {
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("revealed") }),
        { threshold: 0.05, rootMargin: "0px 0px -20px 0px" }
      )
      document.querySelectorAll(".bt-reveal").forEach((el) => {
        const rect = el.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add("revealed")
        } else {
          observer.observe(el)
        }
      })
      return () => observer.disconnect()
    }, 60)
    return () => clearTimeout(timer)
  }, [dep])
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
        ctx.fillStyle = `rgba(99,102,241,${p.alpha})`; ctx.fill()
      })
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach((b) => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y)
          if (dist < 100) {
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(99,102,241,${0.08 * (1 - dist / 100)})`
            ctx.lineWidth = 0.5; ctx.stroke()
          }
        })
      })
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize) }
  }, [])
  return <canvas ref={canvasRef} id="bt-canvas" />
}

// ─── TICKER ───────────────────────────────────────────────────────────────
function TickerTape() {
  const items = [
    "📊 Backtests reales 2023–2026", "✅ Más de 5000h de optimización",
    "📈 AKIRA · DEUS · SCALPER · ATLAS", "💹 Resultados verificables",
    "🔒 Riesgo controlado", "🌎 Múltiples pares de divisas",
    "⚡ Estrategias probadas en MT4", "📉 Drawdown minimizado",
  ]
  const doubled = [...items, ...items]
  return (
    <div className="w-full overflow-hidden bg-primary/5 border-b border-primary/10 py-2.5">
      <div className="bt-ticker flex gap-10 whitespace-nowrap w-max">
        {doubled.map((item, i) => (
          <span key={i} className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            {item}<span className="text-primary/40">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── DATA ─────────────────────────────────────────────────────────────────
const bots = {
  akira: {
    name: "AKIRA", icon: BarChart3, color: "text-red-500", borderColor: "border-red-500/30", iconColor: "text-red-500",
    description: "Bot de alta frecuencia y rendimiento agresivo (En este test fue rendido al minimo riesgo con el saldo minimo recomendado; $400 USD en CENT que equivalen a $40.000 USC)",
    pairs: [
      { name: "EURGBP", periodo: "2023.01 - 2025.06", rentabilidad: "10.5%",  drawdown: "5.73%" },
      { name: "EURJPY", periodo: "2023.01 - 2025.06", rentabilidad: "9.86%",  drawdown: "13.13%" },
      { name: "EURUSD", periodo: "2023.01 - 2025.06", rentabilidad: "13.18%", drawdown: "23.99%" },
      { name: "GBPUSD", periodo: "2023.01 - 2025.06", rentabilidad: "13.85%", drawdown: "8.37%" },
      { name: "USDJPY", periodo: "2023.01 - 2025.06", rentabilidad: "7.63%",  drawdown: "15.33%" },
    ],
  },
  deus: {
    name: "DEUS", icon: TrendingUp, color: "text-primary", borderColor: "border-primary/30", iconColor: "text-primary",
    description: "Bot versátil y seguro para múltiples pares (En este test fue rendido al minimo riesgo con el saldo minimo recomendado; $400 USD en CENT que equivalen a $40.000 USC en XAUUSD y $200 en CENT que equivalen a $20.000 USC en divisas)",
    pairs: [
      { name: "AUDCAD", periodo: "2023.01 - 2025.06", rentabilidad: "45.29%", drawdown: "27.13%" },
      { name: "GBPUSD", periodo: "2023.01 - 2025.06", rentabilidad: "31.47%", drawdown: "27.28%" },
      { name: "AUDCHF", periodo: "2023.01 - 2025.06", rentabilidad: "2.44%",  drawdown: "28.65%" },
      { name: "USDCHF", periodo: "2023.01 - 2025.06", rentabilidad: "18.20%", drawdown: "13.67%" },
    ],
  },
  scalper: {
    name: "SCALPER", icon: Zap, color: "text-green-500", borderColor: "border-green-500/30", iconColor: "text-green-500",
    description: "Bot técnico, preciso y con gestión interna de stop loss (En este test fue rendido al minimo riesgo con el saldo minimo recomendado; $100 USD en CENT que equivalen a $10.000 USC)",
    pairs: [
      { name: "AUDCAD", periodo: "2023.01 - 2025.06", rentabilidad: "19.52%", drawdown: "8.22%" },
      { name: "NZDCAD", periodo: "2023.01 - 2025.06", rentabilidad: "28.06%", drawdown: "8.63%" },
      { name: "AUDNZD", periodo: "2023.01 - 2025.06", rentabilidad: "8.25%",  drawdown: "4.11%" },
    ],
  },
  atlas: {
    name: "ATLAS", icon: Shield, color: "text-amber-500", borderColor: "border-amber-500/30", iconColor: "text-amber-500",
    description: "Bot diseñado específicamente para pruebas de fondeo. Opera con Order Blocks, incluye órdenes stop, stop loss y take profit. Rendimiento constante y riesgo controlado para pasar y mantener cuentas fondeadas o personales con capitales altos.",
    pairs: [
      { name: "XAUUSD", periodo: "2024.01 - 2026.01", rentabilidad: "71.00%", drawdown: "2.34%" },
      { name: "EURUSD", periodo: "2024.01 - 2026.01", rentabilidad: "11.2%",  drawdown: "3.14%" },
      { name: "GBPUSD", periodo: "2024.01 - 2026.01", rentabilidad: "11.7%",  drawdown: "1.44%" },
      { name: "USDJPY", periodo: "2024.01 - 2026.01", rentabilidad: "24.12%", drawdown: "2.22%" },
    ],
  },
}

const botTabColors: Record<string, string> = {
  akira:   "data-[state=active]:bg-red-500/20 data-[state=active]:text-red-500",
  deus:    "data-[state=active]:bg-primary/20 data-[state=active]:text-primary",
  scalper: "data-[state=active]:bg-green-500/20 data-[state=active]:text-green-500",
  atlas:   "data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-500",
}

// ─── PAGE ─────────────────────────────────────────────────────────────────
export default function Page() {
  const [selectedBot, setSelectedBot] = useState("akira")
  useScrollReveal(selectedBot)

  const totalPairs = Object.values(bots).reduce((acc, b) => acc + b.pairs.length, 0)

  return (
    <div className="flex min-h-screen flex-col">
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
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-3">
              <a href="https://instagram.com/botsdetrading.latam" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-all hover:scale-110" aria-label="Instagram"><Instagram className="h-5 w-5" /></a>
              <a href="https://t.me/fxautobots" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-all hover:scale-110" aria-label="Telegram"><MessageCircle className="h-5 w-5" /></a>
            </div>
            <ThemeToggle />
            <Button variant="outline" size="sm" asChild className="transition-all hover:-translate-y-0.5 hover:shadow-sm">
              <Link href="/" className="flex items-center gap-2">
                <ChevronLeft className="h-4 w-4" />
                Volver al inicio
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Ticker */}
      <TickerTape />

      {/* Hero */}
      <section className="w-full py-12 md:py-16 bg-gradient-to-b from-muted/50 to-muted relative overflow-hidden">
        <HeroParticles />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="container px-4 md:px-6 relative z-10">
          <div className="bt-reveal">
            {/* Logo con pulse */}
            <div className="flex justify-center mb-4">
              <div className="bt-badge-pulse rounded-full">
                <Image src="/images/fxautobots-logo.png" alt="FXAutoBots Logo" width={56} height={56} />
              </div>
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-4">
              Backtests de Nuestros Bots
            </h1>
            <p className="text-muted-foreground max-w-[800px] mx-auto text-center md:text-lg">
              Resultados históricos detallados de nuestros bots en diferentes pares de divisas. Estos backtests
              demuestran el rendimiento y la consistencia de nuestras estrategias algorítmicas.
            </p>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-6 mt-10 bt-reveal bt-delay-200">
            {[
              { value: 4,          suffix: "",   label: "Bots analizados" },
              { value: totalPairs, suffix: "",   label: "Pares de divisas" },
              { value: 5000,       suffix: "h+", label: "Horas de backtest" },
            ].map((s) => (
              <div key={s.label} className="text-center px-5 py-4 rounded-2xl bg-background/60 border backdrop-blur-sm">
                <div className="text-3xl font-bold bt-stat">
                  <AnimCounter end={s.value} suffix={s.suffix} />
                </div>
                <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main content */}
      <main className="flex-1 container py-12">
        <Tabs defaultValue="akira" onValueChange={setSelectedBot} className="w-full">

          {/* ── TABS — mobile: 2x2 grid, desktop: 1x4 row ── */}
          <TabsList className="bt-tabslist mb-8 h-auto p-1 bg-muted/50 border">
            {Object.entries(bots).map(([botId, bot]) => (
              <TabsTrigger
                key={botId}
                value={botId}
                className={`text-sm py-2.5 transition-all ${botTabColors[botId]}`}
              >
                <bot.icon className={`h-4 w-4 mr-1.5 ${bot.iconColor}`} />
                Bot {bot.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(bots).map(([botId, bot]) => (
            <TabsContent key={botId} value={botId} className="space-y-8">

              {/* Bot header */}
              <div className="space-y-3 bt-reveal">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-muted flex items-center justify-center ${bot.iconColor}`}>
                    <bot.icon className="h-5 w-5" />
                  </div>
                  <h2 className={`text-2xl font-bold ${bot.color}`}>Bot {bot.name}</h2>
                </div>
                <p className="text-muted-foreground max-w-3xl">{bot.description}</p>
              </div>

              {/* Cards grid */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {bot.pairs.map((pair, i) => (
                  <div key={pair.name} className={`bt-reveal bt-delay-${Math.min((i + 1) * 100, 400)}`}>
                    <Card className={`bt-card overflow-hidden ${bot.borderColor} border`}>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center gap-2">
                            <span className={`text-xs font-bold px-2 py-0.5 rounded ${bot.color} bg-muted`}>{botId.toUpperCase()}</span>
                            {pair.name}
                          </CardTitle>
                          <CardDescription className="text-xs">Backtest histórico</CardDescription>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <BacktestCarousel botId={botId} pairName={pair.name} />

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-2 pt-2">
                          <div className="text-center p-2 rounded-lg bg-muted/50">
                            <p className="text-xs text-muted-foreground mb-0.5">Período</p>
                            <p className="text-xs font-semibold leading-tight">{pair.periodo}</p>
                          </div>
                          <div className="text-center p-2 rounded-lg bg-green-500/10">
                            <p className="text-xs text-muted-foreground mb-0.5">Rentabilidad</p>
                            <p className="rent-positive text-sm">{pair.rentabilidad}</p>
                          </div>
                          <div className="text-center p-2 rounded-lg bg-orange-500/10">
                            <p className="text-xs text-muted-foreground mb-0.5">Drawdown</p>
                            <p className="dd-value text-sm">{pair.drawdown}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>

              {/* Disclaimer */}
              <div className="bg-muted/60 border rounded-xl p-4 bt-reveal">
                <p className="text-sm text-muted-foreground">
                  <strong>Nota:</strong> Los resultados de backtest son simulaciones históricas y no garantizan
                  rendimientos futuros. El trading conlleva riesgos y es importante utilizar una adecuada gestión de capital.
                </p>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex items-center gap-2">
            <Image src="/images/fxautobots-logo.png" alt="FXAutoBots Logo" width={30} height={30} />
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              FXAutoBots © 2026 | Todos los derechos reservados
            </p>
          </div>
          <div className="flex flex-wrap justify-center md:justify-end gap-4 items-center">
            <Link href="/terminos" className="text-sm text-muted-foreground hover:text-primary transition-colors hover:underline">Términos y Condiciones</Link>
            <Link href="/privacidad" className="text-sm text-muted-foreground hover:text-primary transition-colors hover:underline">Política de privacidad</Link>
            <div className="flex items-center gap-4 ml-2">
              <a href="https://instagram.com/botsdetrading.latam" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-all hover:scale-110" aria-label="Instagram"><Instagram className="h-5 w-5" /></a>
              <a href="https://t.me/fxautobots" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-all hover:scale-110" aria-label="Telegram"><MessageCircle className="h-5 w-5" /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
