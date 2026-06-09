"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import { MobileNav } from "@/components/mobile-nav"
import {
  Instagram,
  MessageCircle,
  ShoppingCart,
  Copy as CopyIcon,
  Tag,
  HelpCircle,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  Settings,
  BarChart3,
  Headphones,
  Compass,
  MessageSquare,
} from "lucide-react"

const TELEGRAM = "https://t.me/fxautobots"

// ─── ANIMATION STYLES ───────────────────────────────────────────────────────
const animStyles = `
  .ep-reveal {
    opacity: 0; transform: translateY(32px);
    transition: opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1);
  }
  .ep-reveal.revealed { opacity: 1; transform: translateY(0); }
  .ep-d100 { transition-delay: 0.10s; }
  .ep-d200 { transition-delay: 0.20s; }
  .ep-d300 { transition-delay: 0.30s; }
  .ep-d400 { transition-delay: 0.40s; }

  @keyframes ep-ticker {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  .ep-ticker { animation: ep-ticker 24s linear infinite; }
  .ep-ticker:hover { animation-play-state: paused; }

  #ep-canvas { position:absolute; inset:0; pointer-events:none; opacity:0.45; }

  .ep-btn { position: relative; overflow: hidden; transition: transform 0.2s, box-shadow 0.2s; }
  .ep-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 28px hsl(var(--primary) / 0.30); }
  .ep-btn:active { transform: translateY(0); }

  .ep-card { transition: box-shadow 0.3s ease, border-color 0.3s ease, transform 0.3s ease; }
  .ep-card:hover { box-shadow: 0 16px 40px hsl(var(--primary) / 0.12); border-color: hsl(var(--primary) / 0.45) !important; transform: translateY(-3px); }

  .ep-nav { position: relative; }
  .ep-nav::after {
    content: ''; position: absolute; bottom: -2px; left: 0;
    width: 0; height: 2px; background: hsl(var(--primary));
    transition: width 0.3s cubic-bezier(0.4,0,0.2,1);
  }
  .ep-nav:hover::after { width: 100%; }

  .ep-faq-body { overflow: hidden; transition: max-height 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease; }
  .ep-faq-body.open { max-height: 220px; opacity: 1; }
  .ep-faq-body.closed { max-height: 0; opacity: 0; }

  @keyframes ep-orb {
    0%, 100% { transform: scale(1) translate(0,0); opacity: 0.10; }
    50%       { transform: scale(1.12) translate(12px,-12px); opacity: 0.16; }
  }
  .ep-orb { animation: ep-orb 9s ease-in-out infinite; }
  .ep-orb-2 { animation: ep-orb 11s ease-in-out 2s infinite; }
`

// ─── SCROLL REVEAL ────────────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("revealed") }),
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
    )
    document.querySelectorAll(".ep-reveal").forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

// ─── HERO PARTICLES ─────────────────────────────────────────────────────────
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
      particles.push({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 0.5, alpha: Math.random() * 0.4 + 0.1,
      })
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
            ctx.strokeStyle = `rgba(99,102,241,${0.1 * (1 - dist / 100)})`
            ctx.lineWidth = 0.5; ctx.stroke()
          }
        })
      })
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize) }
  }, [])
  return <canvas ref={canvasRef} id="ep-canvas" />
}

// ─── TICKER ─────────────────────────────────────────────────────────────────
function TickerTape() {
  const items = [
    "🤖 Bots para MetaTrader 4",
    "🛠️ Instalación guiada",
    "🛡️ Gestión de riesgo",
    "📊 Backtests y métricas",
    "🤝 Soporte paso a paso",
    "🔁 Copytrading disponible",
  ]
  const doubled = [...items, ...items]
  return (
    <div className="w-full overflow-hidden bg-primary/5 border-b border-primary/10 py-2.5">
      <div className="ep-ticker flex gap-10 whitespace-nowrap w-max">
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
const options = [
  {
    icon: ShoppingCart,
    title: "Comprar un bot para MT4",
    text: "Sistemas automatizados para ejecutar estrategias en MetaTrader 4 con configuración guiada.",
  },
  {
    icon: CopyIcon,
    title: "Copytrading",
    text: "Una alternativa para quienes prefieren seguir una estrategia sin instalar un bot propio.",
  },
  {
    icon: Tag,
    title: "Ver precios y opciones",
    text: "Conocé las alternativas disponibles según tu capital, experiencia y perfil de riesgo.",
  },
  {
    icon: HelpCircle,
    title: "No sé cuál me conviene",
    text: "Te orientamos paso a paso para elegir una opción acorde a tu situación.",
  },
]

const steps = [
  {
    number: "1",
    icon: MessageSquare,
    title: "Nos escribís",
    text: "Contanos si buscás un bot, copytrading o asesoría para empezar.",
  },
  {
    number: "2",
    icon: Compass,
    title: "Evaluamos tu perfil",
    text: "Revisamos capital estimado, experiencia y nivel de riesgo.",
  },
  {
    number: "3",
    icon: ArrowRight,
    title: "Te guiamos",
    text: "Te indicamos la opción más adecuada y los pasos para comenzar.",
  },
]

const included = [
  { icon: ShoppingCart, label: "Bots para MetaTrader 4" },
  { icon: Settings, label: "Instalación guiada" },
  { icon: ShieldCheck, label: "Configuración según perfil de riesgo" },
  { icon: BarChart3, label: "Backtests y métricas disponibles" },
  { icon: Headphones, label: "Soporte paso a paso" },
  { icon: Compass, label: "Orientación para elegir una opción compatible" },
]

const faqs = [
  {
    q: "¿Los bots funcionan en MT4?",
    a: "Sí. Nuestras soluciones están pensadas para MetaTrader 4.",
  },
  {
    q: "¿Necesito experiencia previa?",
    a: "No necesariamente, pero es importante entender el riesgo. Por eso te orientamos antes de recomendar una opción.",
  },
  {
    q: "¿Puedo empezar con copytrading?",
    a: "Sí. El copytrading puede ser una alternativa si preferís no instalar un bot propio.",
  },
  {
    q: "¿Garantizan ganancias?",
    a: "No. El trading implica riesgo y ningún sistema puede garantizar ganancias.",
  },
]

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/comprar", label: "Comprar Bots" },
  { href: "/copytrading", label: "Copytrading" },
  { href: "/tutoriales", label: "Tutoriales" },
]

// ─── FAQ ITEM ───────────────────────────────────────────────────────────────
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border rounded-lg bg-card ep-card">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 p-5 text-left"
        aria-expanded={open}
      >
        <span className="font-medium">{q}</span>
        <ChevronDown className={`h-5 w-5 text-muted-foreground flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <div className={`ep-faq-body ${open ? "open" : "closed"}`}>
        <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{a}</p>
      </div>
    </div>
  )
}

// ─── PAGE ───────────────────────────────────────────────────────────────────
export function EmpezarContent() {
  useScrollReveal()

  const scrollToOptions = () => {
    document.getElementById("opciones")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <style dangerouslySetInnerHTML={{ __html: animStyles }} />

      {/* ── HEADER ── */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center group">
            <div className="transition-transform duration-300 group-hover:rotate-12">
              <Image src="/images/fxautobots-logo.png" alt="FXAutoBots Logo" width={40} height={40} className="md:mr-2" />
            </div>
            <span className="font-bold text-xl hidden md:inline">FXAutoBots</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm font-medium hover:text-primary ep-nav transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-3">
              <a href="https://instagram.com/fxautobots" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-all hover:scale-110" aria-label="Instagram"><Instagram className="h-5 w-5" /></a>
              <a href={TELEGRAM} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-all hover:scale-110" aria-label="Telegram"><MessageCircle className="h-5 w-5" /></a>
            </div>
            <ThemeToggle />
            <Button asChild className="hidden md:inline-flex ep-btn">
              <a href={TELEGRAM} target="_blank" rel="noopener noreferrer">Recibir información</a>
            </Button>
            <MobileNav links={navLinks} />
          </div>
        </div>
      </header>

      <TickerTape />

      <main className="flex-1">
        {/* ── HERO ── */}
        <section className="relative w-full overflow-hidden py-20 md:py-28">
          <HeroParticles />
          <div className="pointer-events-none absolute -top-20 -left-20 h-72 w-72 rounded-full bg-primary/20 blur-3xl ep-orb" />
          <div className="pointer-events-none absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-primary/15 blur-3xl ep-orb-2" />
          <div className="container relative">
            <div className="max-w-3xl mx-auto text-center">
              <div className="ep-reveal inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 mb-6">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm font-medium text-muted-foreground">MetaTrader 4 · Automatización</span>
              </div>
              <h1 className="ep-reveal ep-d100 text-4xl md:text-6xl font-bold tracking-tight text-balance">
                Bots de Trading para <span className="text-primary">MT4</span>
              </h1>
              <p className="ep-reveal ep-d200 mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed text-pretty">
                Automatización para traders que buscan operar con reglas claras, gestión de riesgo e instalación guiada.
              </p>
              <div className="ep-reveal ep-d300 mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild size="lg" className="ep-btn text-base">
                  <a href={TELEGRAM} target="_blank" rel="noopener noreferrer">
                    Quiero recibir información
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <Button onClick={scrollToOptions} variant="outline" size="lg" className="text-base">
                  Ver opciones
                </Button>
              </div>
              <p className="ep-reveal ep-d400 mt-5 text-xs text-muted-foreground">
                El trading implica riesgo. No prometemos ganancias fijas ni resultados garantizados.
              </p>
            </div>
          </div>
        </section>

        {/* ── ¿QUÉ ESTÁS BUSCANDO? ── */}
        <section id="opciones" className="w-full py-16 md:py-24 bg-muted/30">
          <div className="container">
            <div className="ep-reveal text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-balance">¿Qué estás buscando?</h2>
              <p className="mt-3 text-muted-foreground text-pretty">
                Elegí la opción que mejor describe tu situación y consultanos sin compromiso.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
              {options.map((opt, i) => (
                <Card key={opt.title} className={`ep-reveal ep-d${(i + 1) * 100} ep-card flex flex-col border-border/60`}>
                  <CardContent className="flex flex-col flex-1 p-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <opt.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{opt.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">{opt.text}</p>
                    <Button asChild variant="outline" className="mt-5 w-full">
                      <a href={TELEGRAM} target="_blank" rel="noopener noreferrer">Consultar</a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ── CÓMO FUNCIONA ── */}
        <section className="w-full py-16 md:py-24">
          <div className="container">
            <div className="ep-reveal text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-balance">Cómo funciona</h2>
              <p className="mt-3 text-muted-foreground text-pretty">Tres pasos simples para empezar con orientación.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {steps.map((step, i) => (
                <div key={step.number} className={`ep-reveal ep-d${(i + 1) * 100} relative`}>
                  <Card className="ep-card h-full border-border/60">
                    <CardContent className="p-6 text-center">
                      <div className="relative inline-flex mb-4">
                        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                          <step.icon className="h-7 w-7 text-primary" />
                        </div>
                        <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                          {step.number}
                        </span>
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{step.text}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── QUÉ INCLUYE ── */}
        <section className="w-full py-16 md:py-24 bg-muted/30">
          <div className="container">
            <div className="ep-reveal text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-balance">Qué incluye FX AutoBots</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {included.map((item, i) => (
                <div key={item.label} className={`ep-reveal ep-d${((i % 3) + 1) * 100} ep-card flex items-center gap-3 rounded-lg border border-border/60 bg-card p-4`}>
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── AUTOMATIZACIÓN CON RESPONSABILIDAD ── */}
        <section className="w-full py-16 md:py-24">
          <div className="container">
            <div className="ep-reveal max-w-3xl mx-auto text-center">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="h-7 w-7 text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-balance">Automatización con responsabilidad</h2>
              <p className="mt-5 text-muted-foreground leading-relaxed text-pretty">
                Un bot de trading no elimina el riesgo ni garantiza resultados. Su función es ejecutar una estrategia
                con reglas previamente configuradas, evitando decisiones impulsivas y manteniendo una gestión definida.
              </p>
              <div className="mt-6 inline-flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 px-5 py-3">
                <span className="text-sm font-medium text-foreground">Los resultados pasados no garantizan resultados futuros.</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="w-full py-16 md:py-24 bg-muted/30">
          <div className="container">
            <div className="ep-reveal text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-balance">Preguntas frecuentes</h2>
            </div>
            <div className="max-w-2xl mx-auto flex flex-col gap-3">
              {faqs.map((faq, i) => (
                <div key={faq.q} className={`ep-reveal ep-d${((i % 4) + 1) * 100}`}>
                  <FaqItem q={faq.q} a={faq.a} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <section className="w-full py-16 md:py-24">
          <div className="container">
            <div className="ep-reveal relative overflow-hidden rounded-3xl bg-primary px-6 py-14 md:py-20 text-center">
              <div className="pointer-events-none absolute -top-16 -left-16 h-56 w-56 rounded-full bg-primary-foreground/10 blur-3xl ep-orb" />
              <div className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-primary-foreground/10 blur-3xl ep-orb-2" />
              <div className="relative max-w-2xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground text-balance">
                  ¿Querés saber cuál opción va mejor con tu caso?
                </h2>
                <p className="mt-4 text-primary-foreground/80 text-pretty">
                  Escribinos y te orientamos según tu capital, experiencia y perfil de riesgo.
                </p>
                <Button asChild size="lg" variant="secondary" className="mt-8 ep-btn text-base">
                  <a href={TELEGRAM} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Hablar con FX AutoBots
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="w-full border-t py-8">
        <div className="container text-center">
          <p className="text-sm text-muted-foreground">
            FX AutoBots — Bots de trading para MT4. El trading implica riesgo.
          </p>
        </div>
      </footer>

      {/* ── BURBUJA FLOTANTE TELEGRAM ── */}
      <a href={TELEGRAM} target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-50 group">
        <div className="relative">
          <div className="flex items-center gap-2 bg-[#0088cc] hover:bg-[#006699] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <MessageCircle className="h-5 w-5" />
            <span className="text-sm font-medium">Contactar</span>
          </div>
          <div className="absolute inset-0 rounded-full bg-[#0088cc] animate-ping opacity-20" />
        </div>
      </a>
    </div>
  )
}
