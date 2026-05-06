"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp, Shield, DollarSign, Users, CheckCircle2, ExternalLink,
  ArrowRight, Instagram, MessageCircle, ChevronDown, BarChart3, Zap, Copy,
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { MobileNav } from "@/components/mobile-nav"

// ─── ANIMATION STYLES ─────────────────────────────────────────────────────
const animStyles = `
  /* Scroll reveal */
  .cp-reveal {
    opacity: 0; transform: translateY(32px);
    transition: opacity 0.75s cubic-bezier(0.4,0,0.2,1), transform 0.75s cubic-bezier(0.4,0,0.2,1);
  }
  .cp-reveal.revealed { opacity: 1; transform: translateY(0); }
  .cp-reveal-left {
    opacity: 0; transform: translateX(-36px);
    transition: opacity 0.75s cubic-bezier(0.4,0,0.2,1), transform 0.75s cubic-bezier(0.4,0,0.2,1);
  }
  .cp-reveal-left.revealed { opacity: 1; transform: translateX(0); }
  .cp-reveal-right {
    opacity: 0; transform: translateX(36px);
    transition: opacity 0.75s cubic-bezier(0.4,0,0.2,1), transform 0.75s cubic-bezier(0.4,0,0.2,1);
  }
  .cp-reveal-right.revealed { opacity: 1; transform: translateX(0); }
  .cp-d100 { transition-delay: 0.10s; }
  .cp-d200 { transition-delay: 0.20s; }
  .cp-d300 { transition-delay: 0.30s; }
  .cp-d400 { transition-delay: 0.40s; }
  .cp-d500 { transition-delay: 0.50s; }

  /* Ticker */
  @keyframes cp-ticker {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  .cp-ticker { animation: cp-ticker 24s linear infinite; }
  .cp-ticker:hover { animation-play-state: paused; }

  /* Canvas */
  #cp-canvas { position:absolute; inset:0; pointer-events:none; opacity:0.5; }

  /* Stat number shimmer */
  @keyframes cp-shimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  .cp-stat {
    background: linear-gradient(90deg, #f97316 0%, #fbbf24 40%, #f97316 60%);
    background-size: 200% auto;
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: cp-shimmer 2.5s linear infinite;
  }
  .cp-stat-green {
    background: linear-gradient(90deg, #22c55e 0%, #86efac 40%, #22c55e 60%);
    background-size: 200% auto;
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: cp-shimmer 2.5s linear infinite;
  }

  /* Btn glow */
  .cp-btn {
    position: relative; overflow: hidden;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .cp-btn::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 60%);
    opacity: 0; transition: opacity 0.3s;
  }
  .cp-btn:hover::after { opacity: 1; }
  .cp-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(249,115,22,0.35); }
  .cp-btn:active { transform: translateY(0); }

  /* Card hover — shadow only, no transform */
  .cp-card {
    transition: box-shadow 0.3s ease, border-color 0.35s ease;
  }
  .cp-card:hover { box-shadow: 0 18px 40px rgba(249,115,22,0.13); border-color: rgba(249,115,22,0.45) !important; }

  /* Step connector */
  .cp-step-line {
    position: absolute; top: 24px; left: calc(100% - 16px);
    width: calc(100% - 32px); height: 2px;
    background: linear-gradient(to right, #f97316, transparent);
  }

  /* Feature icon bounce */
  @keyframes cp-bounce {
    0%, 100% { transform: translateY(0); }
    50%       { transform: translateY(-5px); }
  }
  .cp-icon-bounce { animation: cp-bounce 3s ease-in-out infinite; }
  .cp-icon-bounce-d1 { animation: cp-bounce 3s ease-in-out 0.5s infinite; }
  .cp-icon-bounce-d2 { animation: cp-bounce 3s ease-in-out 1s infinite; }
  .cp-icon-bounce-d3 { animation: cp-bounce 3s ease-in-out 1.5s infinite; }

  /* Nav underline */
  .cp-nav { position: relative; }
  .cp-nav::after {
    content: ''; position: absolute; bottom: -2px; left: 0;
    width: 0; height: 2px; background: #f97316;
    transition: width 0.3s cubic-bezier(0.4,0,0.2,1);
  }
  .cp-nav:hover::after { width: 100%; }

  /* FAQ accordion */
  .cp-faq-body {
    overflow: hidden;
    transition: max-height 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease;
  }
  .cp-faq-body.open { max-height: 200px; opacity: 1; }
  .cp-faq-body.closed { max-height: 0; opacity: 0; }

  /* Profit badge pulse */
  @keyframes cp-profit-pulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.4); }
    50%       { box-shadow: 0 0 0 8px rgba(34,197,94,0); }
  }
  .cp-profit-pulse { animation: cp-profit-pulse 2.5s ease-in-out infinite; }

  /* HFM gradient text */
  .cp-gradient-text {
    background: linear-gradient(135deg, #f97316, #ef4444);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* Floating orb */
  @keyframes cp-orb {
    0%, 100% { transform: scale(1) translate(0, 0); opacity: 0.12; }
    33%       { transform: scale(1.1) translate(10px, -10px); opacity: 0.18; }
    66%       { transform: scale(0.95) translate(-8px, 8px); opacity: 0.10; }
  }
  .cp-orb { animation: cp-orb 8s ease-in-out infinite; }
  .cp-orb-2 { animation: cp-orb 10s ease-in-out 2s infinite; }

  /* CTA section bg pulse */
  @keyframes cp-cta-pulse {
    0%, 100% { opacity: 0.9; }
    50%       { opacity: 1; }
  }
  .cp-cta-bg { animation: cp-cta-pulse 4s ease-in-out infinite; }
`

// ─── SCROLL REVEAL ────────────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("revealed") }),
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
    )
    document.querySelectorAll(".cp-reveal, .cp-reveal-left, .cp-reveal-right")
      .forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

// ─── ANIMATED COUNTER ─────────────────────────────────────────────────────
function AnimCounter({ end, prefix = "", suffix = "", decimals = 0 }: {
  end: number; prefix?: string; suffix?: string; decimals?: number
}) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const t0 = performance.now()
        const tick = (now: number) => {
          const p = Math.min((now - t0) / 2000, 1)
          const e = 1 - Math.pow(1 - p, 3)
          setCount(Math.floor(e * end * Math.pow(10, decimals)) / Math.pow(10, decimals))
          if (p < 1) requestAnimationFrame(tick)
          else setCount(end)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.5 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [end, decimals])
  return <span ref={ref}>{prefix}{decimals > 0 ? count.toFixed(decimals) : count}{suffix}</span>
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
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5,
        r: Math.random() * 2.5 + 0.5, alpha: Math.random() * 0.5 + 0.1,
      })
    }
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(249,115,22,${p.alpha})`; ctx.fill()
      })
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach((b) => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y)
          if (dist < 110) {
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(249,115,22,${0.12 * (1 - dist / 110)})`
            ctx.lineWidth = 0.6; ctx.stroke()
          }
        })
      })
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize) }
  }, [])
  return <canvas ref={canvasRef} id="cp-canvas" />
}

// ─── TICKER ───────────────────────────────────────────────────────────────
function TickerTape() {
  const items = [
    "🟠 HFM Copy Trading", "📈 Deus Copy +26% profit",
    "💰 Desde $30 USD",
    "🔒 Drawdown controlado", "⚡ Operaciones 24/7",
    "✅ Sin experiencia requerida", "🌎 Cuentas CENT disponibles",
  ]
  const doubled = [...items, ...items]
  return (
    <div className="w-full overflow-hidden bg-orange-500/8 border-b border-orange-500/15 py-2.5">
      <div className="cp-ticker flex gap-10 whitespace-nowrap w-max">
        {doubled.map((item, i) => (
          <span key={i} className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            {item}<span className="text-orange-400/40">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── DATA ─────────────────────────────────────────────────────────────────
const strategies = [
  {
    name: "Deus Copy", description: "Estrategia conservadora con bajo drawdown, ideal para principiantes",
    profit: "+26%", profitNum: 26, drawdown: "2.88%", minDeposit: 30,
    link: "https://my.hfm.com/es/copy-trading/provider-details.html?provider=78098671",
    features: ["Bajo riesgo", "Operativa conservadora", "Ideal para cuentas pequeñas", "Drawdown controlado"],
    badge: "Conservador", badgeColor: "bg-emerald-500", accentColor: "emerald",
    statColor: "text-emerald-500", borderHover: "hover:border-emerald-500/50",
  },
]

const steps = [
  { number: 1, title: "Registrate en HFM", description: "Crea tu cuenta en HFM usando nuestro enlace de referido. El proceso toma menos de 5 minutos.", action: "Registrarse", link: "https://register.hfm.com/sv/en/new-live-account/?refid=364904", icon: "1️⃣" },
  { number: 2, title: "Deposita fondos", description: "Deposita un mínimo de $30 USD para Deus Copy. Acepta criptomonedas.", action: null, link: null, icon: "2️⃣" },
  { number: 3, title: "Accede a HFM Copy", description: "Una vez logeado, accede a la sección de HFM Copy desde tu panel de cliente.", action: null, link: null, icon: "3️⃣" },
  { number: 4, title: "Copia la estrategia", description: "Busca la estrategia que prefieras y comienza a copiar nuestras operaciones automáticamente.", action: "Ver Estrategias", link: "#strategies", icon: "4️⃣" },
]

const features = [
  { icon: DollarSign, label: "Desde $30 USD", desc: "Comienza con poco capital gracias a las cuentas CENT", bounce: "cp-icon-bounce" },
  { icon: Shield,     label: "Bajo Riesgo",    desc: "Drawdown controlado y gestión de riesgo profesional",    bounce: "cp-icon-bounce-d1" },
  { icon: Zap,        label: "Automático",      desc: "Las operaciones se copian automáticamente 24/7",         bounce: "cp-icon-bounce-d2" },
  { icon: Users,      label: "Soporte",         desc: "Asesoramiento personalizado vía Telegram",               bounce: "cp-icon-bounce-d3" },
]

const faqs = [
  { question: "¿Qué es el CopyTrading?", answer: "El CopyTrading te permite copiar automáticamente las operaciones de traders profesionales. Cuando nosotros abrimos una operación, se replica automáticamente en tu cuenta con el mismo ratio de riesgo." },
  { question: "¿Cuál es el depósito mínimo?", answer: "Para Deus Copy necesitas mínimo $30 USD. Ambas estrategias operan en cuentas CENT, lo que te permite empezar con poco capital." },
  { question: "¿Qué son las cuentas CENT?", answer: "Las cuentas CENT dividen tu capital en centavos, permitiendo operar con microlotes. Esto reduce significativamente el riesgo y es ideal para cuentas pequeñas." },
  { question: "¿Cuánto puedo ganar?", answer: "Los rendimientos varían. Deus Copy lleva actualmente +26% de profit con un drawdown máximo de 2.88%. Rendimientos pasados no garantizan resultados futuros." },
  { question: "¿Hay comisiones?", answer: "HFM cobra una pequeña comisión sobre las ganancias obtenidas. No hay comisiones fijas mensuales ni costos ocultos." },
]

// ─── PAGE ─────────────────────────────────────────────────────────────────
export default function CopyTradingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  useScrollReveal()

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <style>{animStyles}</style>

      {/* ── HEADER ── */}
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
              { href: "/",           label: "Inicio" },
              { href: "/comprar",    label: "Comprar Bots" },
              { href: "/tutoriales", label: "Tutoriales" },
              { href: "#strategies", label: "Estrategias" },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="text-sm font-medium hover:text-orange-500 cp-nav transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-3">
              <a href="https://instagram.com/botsdetrading.latam" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-orange-500 transition-all hover:scale-110"><Instagram className="h-5 w-5" /></a>
              <a href="https://t.me/fxautobots" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-orange-500 transition-all hover:scale-110"><MessageCircle className="h-5 w-5" /></a>
            </div>
            <ThemeToggle />
            <Button asChild className="hidden md:inline-flex bg-orange-500 hover:bg-orange-600 cp-btn">
              <a href="https://register.hfm.com/sv/en/new-live-account/?refid=364904" target="_blank" rel="noopener noreferrer">
                Registrarse
              </a>
            </Button>
            <MobileNav links={[
              { href: "/",           label: "Inicio" },
              { href: "/comprar",    label: "Comprar Bots" },
              { href: "/tutoriales", label: "Tutoriales" },
              { href: "#strategies", label: "Estrategias" },
            ]} />
          </div>
        </div>
      </header>

      {/* ── TICKER ── */}
      <TickerTape />

      <main className="flex-1">

        {/* ── HERO ── */}
        <section className="relative w-full py-16 md:py-24 lg:py-32 overflow-hidden">
          <HeroParticles />

          {/* Gradiente de fondo HFM */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/12 via-background to-red-500/8 pointer-events-none" />

          {/* Orbs animados */}
          <div className="cp-orb   absolute top-16  left-8   w-80 h-80 bg-orange-500 rounded-full blur-[100px] pointer-events-none" />
          <div className="cp-orb-2 absolute bottom-16 right-8 w-96 h-96 bg-red-500   rounded-full blur-[120px] pointer-events-none" />

          <div className="container relative px-4 md:px-6 z-10">
            <div className="flex flex-col items-center text-center space-y-8">

              {/* HFM Badge */}
              <div className="cp-reveal inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/25 backdrop-blur-sm">
                <Image src="/images/brokers/hfm-logo.jpeg" alt="HFM" width={22} height={22} className="rounded" />
                <span className="text-sm font-semibold text-orange-500">Powered by HFM Copy</span>
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              </div>

              {/* Headline */}
              <div className="cp-reveal cp-d100">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl">
                  Copia Nuestras{" "}
                  <span className="cp-gradient-text">Estrategias Ganadoras</span>
                </h1>
              </div>

              <p className="cp-reveal cp-d200 text-xl text-muted-foreground max-w-2xl">
                Replica automáticamente nuestras operaciones en tu cuenta. Sin experiencia requerida.
                Comienza desde solo <span className="text-orange-500 font-bold">$30 USD</span>.
              </p>

              {/* Stats con contadores animados */}
              <div className="cp-reveal cp-d300 flex flex-wrap justify-center gap-6 mt-4">
                {[
                  { label: "Mejor Rentabilidad", value: 76, prefix: "+", suffix: "%", cls: "cp-stat" },
                  { label: "Menor Drawdown",      value: 2.88, decimals: 2, suffix: "%", cls: "cp-stat-green" },
                  { label: "Depósito Mínimo",     value: 30, prefix: "$", suffix: " USD", cls: "cp-stat" },
                ].map((s) => (
                  <div key={s.label} className="text-center px-6 py-4 rounded-2xl bg-background/70 border border-orange-500/20 backdrop-blur-sm">
                    <p className={`text-3xl md:text-4xl font-bold ${s.cls}`}>
                      <AnimCounter end={s.value} prefix={s.prefix ?? ""} suffix={s.suffix ?? ""} decimals={s.decimals ?? 0} />
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="cp-reveal cp-d400 flex flex-col sm:flex-row gap-4 mt-4">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white cp-btn" asChild>
                  <a href="https://register.hfm.com/sv/en/new-live-account/?refid=364904" target="_blank" rel="noopener noreferrer">
                    Comenzar Ahora <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="border-orange-500/40 hover:border-orange-500 transition-colors" asChild>
                  <a href="#strategies">
                    Ver Estrategias <ChevronDown className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ── CÓMO EMPEZAR ── */}
        <section className="w-full py-16 md:py-24 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12 cp-reveal">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-3">Cómo Empezar</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Sigue estos simples pasos para comenzar a copiar nuestras estrategias</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step, i) => (
                <div key={step.number} className={`relative cp-reveal cp-d${(i + 1) * 100}`}>
                  {/* Conector desktop */}
                  {i < steps.length - 1 && (
                    <div className="hidden lg:block cp-step-line" />
                  )}
                  <Card className="cp-card h-full bg-background/60 backdrop-blur border-orange-500/15">
                    <CardHeader>
                      {/* Número con gradiente */}
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold text-xl mb-4 shadow-lg shadow-orange-500/30">
                        {step.number}
                      </div>
                      <CardTitle className="text-xl">{step.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                      {step.action && step.link && (
                        <Button className="w-full bg-orange-500 hover:bg-orange-600 cp-btn" asChild>
                          <a href={step.link} target={step.link.startsWith("http") ? "_blank" : undefined} rel={step.link.startsWith("http") ? "noopener noreferrer" : undefined}>
                            {step.action} <ExternalLink className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ESTRATEGIAS ── */}
        <section id="strategies" className="w-full py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12 cp-reveal">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-3">Nuestras Estrategias</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Elige la estrategia que mejor se adapte a tu perfil de riesgo</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {strategies.map((strategy, i) => (
                <div key={strategy.name} className={`cp-reveal ${i === 0 ? "cp-reveal-left" : "cp-reveal-right"}`}>
                  <Card className={`cp-card relative overflow-hidden border-2 border-border h-full`}>
                    {/* Glow de fondo al hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${strategy.accentColor === "emerald" ? "from-emerald-500/5" : "from-orange-500/5"} to-transparent opacity-0 transition-opacity duration-300 pointer-events-none group-hover:opacity-100`} />

                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-start mb-3">
                        <Badge className={`${strategy.badgeColor} text-white px-3 py-1`}>{strategy.badge}</Badge>
                        <div className={`flex items-center gap-1 ${strategy.statColor}`}>
                          <Copy className="h-4 w-4" />
                          <span className="text-sm font-semibold">Copy</span>
                        </div>
                      </div>
                      <CardTitle className="text-2xl md:text-3xl">{strategy.name}</CardTitle>
                      <CardDescription className="text-base">{strategy.description}</CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      {/* Stats en 3 bloques */}
                      <div className="grid grid-cols-3 gap-3">
                        <div className="text-center p-3 rounded-xl bg-muted/60">
                          <TrendingUp className={`h-5 w-5 mx-auto mb-1 ${strategy.statColor}`} />
                          <p className={`text-2xl font-bold cp-profit-pulse rounded ${strategy.statColor}`}>{strategy.profit}</p>
                          <p className="text-xs text-muted-foreground">Profit</p>
                        </div>
                        <div className="text-center p-3 rounded-xl bg-muted/60">
                          <BarChart3 className="h-5 w-5 mx-auto mb-1 text-orange-400" />
                          <p className="text-2xl font-bold text-orange-400">{strategy.drawdown}</p>
                          <p className="text-xs text-muted-foreground">Max DD</p>
                        </div>
                        <div className="text-center p-3 rounded-xl bg-muted/60">
                          <DollarSign className="h-5 w-5 mx-auto mb-1 text-primary" />
                          <p className="text-2xl font-bold">${strategy.minDeposit}</p>
                          <p className="text-xs text-muted-foreground">Mínimo</p>
                        </div>
                      </div>

                      {/* Features */}
                      <ul className="space-y-2">
                        {strategy.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-orange-500 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {/* CTA */}
                      <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white cp-btn" asChild>
                        <a href={strategy.link} target="_blank" rel="noopener noreferrer">
                          Copiar Estrategia <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                      <p className="text-xs text-center text-muted-foreground">Necesitas estar logeado en HFM para ver la estrategia</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── POR QUÉ ELEGIRNOS ── */}
        <section className="w-full py-16 md:py-24 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12 cp-reveal">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-3">Por Qué Elegirnos</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((f, i) => (
                <div key={f.label} className={`cp-reveal cp-d${(i + 1) * 100}`}>
                  <Card className="cp-card text-center p-6 bg-background/60 backdrop-blur border-orange-500/15 h-full">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500/15 to-red-500/10 border border-orange-500/20 flex items-center justify-center mx-auto mb-4">
                      <f.icon className={`h-7 w-7 text-orange-500 ${f.bounce}`} />
                    </div>
                    <h3 className="font-bold text-lg mb-2">{f.label}</h3>
                    <p className="text-sm text-muted-foreground">{f.desc}</p>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="w-full py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12 cp-reveal">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-3">Preguntas Frecuentes</h2>
            </div>
            <div className="max-w-3xl mx-auto space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className={`cp-reveal cp-d${Math.min((i + 1) * 100, 500)}`}>
                  <Card
                    className="cp-card cursor-pointer border-orange-500/15 overflow-hidden"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <CardHeader className="pb-3 pt-4">
                      <div className="flex justify-between items-center gap-4">
                        <CardTitle className="text-base font-semibold text-left">{faq.question}</CardTitle>
                        <ChevronDown className={`h-5 w-5 text-orange-500 shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`} />
                      </div>
                    </CardHeader>
                    <div className={`cp-faq-body ${openFaq === i ? "open" : "closed"}`}>
                      <CardContent className="pt-0 pb-4">
                        <p className="text-muted-foreground text-sm leading-relaxed">{faq.answer}</p>
                      </CardContent>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <section className="w-full py-16 md:py-24 relative overflow-hidden">
          <div className="cp-cta-bg absolute inset-0 bg-gradient-to-br from-orange-500 to-red-500" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/15 via-transparent to-transparent pointer-events-none" />
          {/* Orbs */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-black/10 rounded-full blur-3xl pointer-events-none" />

          <div className="container relative px-4 md:px-6 text-center text-white z-10">
            <div className="cp-reveal">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">Comienza a Copiar Hoy</h2>
              <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
                Únete a los traders que ya están generando ganancias con nuestras estrategias. Sin experiencia requerida, sin complicaciones.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="bg-white text-orange-500 hover:bg-white/90 cp-btn font-semibold" asChild>
                  <a href="https://register.hfm.com/sv/en/new-live-account/?refid=364904" target="_blank" rel="noopener noreferrer">
                    Crear Cuenta en HFM <ExternalLink className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/15 transition-colors cp-btn" asChild>
                  <a href="https://t.me/fxautobots" target="_blank" rel="noopener noreferrer">
                    Contactar por Telegram <MessageCircle className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="border-t bg-background">
        <div className="container px-4 py-8 md:py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Image src="/images/fxautobots-logo.png" alt="FXAutoBots Logo" width={32} height={32} />
              <span className="font-bold">FXAutoBots</span>
            </div>
            <div className="flex items-center gap-4">
              <a href="https://instagram.com/botsdetrading.latam" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-orange-500 transition-all hover:scale-110"><Instagram className="h-5 w-5" /></a>
              <a href="https://t.me/fxautobots" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-orange-500 transition-all hover:scale-110"><MessageCircle className="h-5 w-5" /></a>
            </div>
            <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} FXAutoBots. Todos los derechos reservados.</p>
          </div>
          <div className="mt-6 pt-6 border-t text-center">
            <p className="text-xs text-muted-foreground max-w-3xl mx-auto">
              Advertencia de riesgo: El trading de divisas y CFDs conlleva un alto nivel de riesgo y puede no ser adecuado para todos los inversores.
              Rendimientos pasados no garantizan resultados futuros. Opera solo con capital que puedas permitirte perder.
            </p>
          </div>
        </div>
      </footer>

      {/* ── BURBUJA FLOTANTE ── */}
      <a
        href="https://t.me/fxautobots" target="_blank" rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 group"
      >
        <div className="relative">
          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-3 w-64 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 pointer-events-none group-hover:pointer-events-auto">
            <div className="bg-card border border-border rounded-2xl p-4 shadow-2xl">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="h-5 w-5 text-orange-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">¿Necesitas ayuda?</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">Contáctanos por Telegram para asesoramiento personalizado.</p>
                </div>
              </div>
              <div className="absolute -bottom-2 right-8 w-4 h-4 bg-card border-r border-b border-border transform rotate-45" />
            </div>
          </div>

          {/* Botón */}
          <div className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <MessageCircle className="h-5 w-5" />
            <span className="text-sm font-medium">Ayuda</span>
          </div>
          <div className="absolute inset-0 rounded-full bg-orange-500 animate-ping opacity-20" />
        </div>
      </a>
    </div>
  )
}
