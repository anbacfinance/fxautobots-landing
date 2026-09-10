"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Settings, TrendingUp, ChevronRight, Clock,
  BarChart3, Target, Package, Percent, Instagram, MessageCircle,
  Shield, Zap, Users, AlertTriangle, Mail, HelpCircle, FileText,
} from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { BotsComparison } from "../components/bots-comparison"
import { ProfitCalculator } from "../components/profit-calculator"
import { ThemeToggle } from "../components/theme-toggle"
import { RecommendedBrokers } from "../components/recommended-brokers"
import { RecommendedVPS } from "../components/recommended-vps"
import { MobileNav } from "../components/mobile-nav"

// ─── FLAGS DE COMPLIANCE (Meta Ads) ───────────────────────────────────────
// Estas dos secciones son las que más rechazos generan si esta página es el
// destino de un anuncio de Facebook/Instagram. Dejalas en `false` mientras
// hagas publicidad. Ponelas en `true` solo para tráfico orgánico.
//
//  · MOSTRAR_BROKERS_AFILIADOS → links de registro a brokers de Forex.
//    Promocionar un broker de Forex/CFD entra en "Productos y servicios
//    financieros restringidos" y exige permiso escrito + licencia de Meta.
//  · MOSTRAR_CALCULADORA → proyecciones de ganancia. Meta las lee como
//    "income claim / promesa de resultados".
const MOSTRAR_BROKERS_AFILIADOS = false
const MOSTRAR_CALCULADORA = false

// Cuando tengas testimonios REALES (con consentimiento por escrito del cliente,
// nombre real y captura/verificación), cargalos acá y poné el flag en true.
// NO uses fotos de stock ni nombres inventados: es motivo de baneo en Meta y
// además es publicidad engañosa en AR/ES/MX/CL.
const MOSTRAR_TESTIMONIOS = false

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────
const globalStyles = `
  .reveal {
    opacity: 0; transform: translateY(32px);
    transition: opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1);
  }
  .reveal.revealed { opacity: 1; transform: translateY(0); }
  .reveal-left {
    opacity: 0; transform: translateX(-40px);
    transition: opacity 0.8s cubic-bezier(0.4,0,0.2,1), transform 0.8s cubic-bezier(0.4,0,0.2,1);
  }
  .reveal-left.revealed { opacity: 1; transform: translateX(0); }
  .reveal-right {
    opacity: 0; transform: translateX(40px);
    transition: opacity 0.8s cubic-bezier(0.4,0,0.2,1), transform 0.8s cubic-bezier(0.4,0,0.2,1);
  }
  .reveal-right.revealed { opacity: 1; transform: translateX(0); }
  .reveal-scale {
    opacity: 0; transform: scale(0.92);
    transition: opacity 0.6s cubic-bezier(0.4,0,0.2,1), transform 0.6s cubic-bezier(0.4,0,0.2,1);
  }
  .reveal-scale.revealed { opacity: 1; transform: scale(1); }
  .delay-100 { transition-delay: 0.1s; }
  .delay-200 { transition-delay: 0.2s; }
  .delay-300 { transition-delay: 0.3s; }
  .delay-400 { transition-delay: 0.4s; }
  .delay-500 { transition-delay: 0.5s; }
  .delay-600 { transition-delay: 0.6s; }

  .card-hover {
    transition: transform 0.3s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s ease;
    will-change: transform;
  }
  .card-hover:hover { transform: translateY(-6px) scale(1.015); box-shadow: 0 20px 40px rgba(0,0,0,0.12); }

  .btn-glow {
    position: relative; overflow: hidden;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .btn-glow::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%);
    opacity: 0; transition: opacity 0.3s;
  }
  .btn-glow:hover::after { opacity: 1; }
  .btn-glow:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.2); }
  .btn-glow:active { transform: translateY(0); }

  #hero-canvas { position: absolute; inset: 0; pointer-events: none; opacity: 0.45; }

  @keyframes badge-pulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(59,130,246,0.4); }
    50%       { box-shadow: 0 0 0 10px rgba(59,130,246,0); }
  }
  .badge-pulse { animation: badge-pulse 2.5s ease-in-out infinite; }

  @keyframes ticker {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  .ticker-inner { animation: ticker 22s linear infinite; }
  .ticker-inner:hover { animation-play-state: paused; }

  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  .stat-number {
    background: linear-gradient(90deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.6) 40%, hsl(var(--primary)) 60%);
    background-size: 200% auto;
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    animation: shimmer 3s linear infinite;
  }

  @keyframes icon-float {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-6px); }
  }
  .icon-float { animation: icon-float 3.5s ease-in-out infinite; }
  .icon-float-delay { animation: icon-float 3.5s ease-in-out 1.2s infinite; }
  .icon-float-delay2 { animation: icon-float 3.5s ease-in-out 2.4s infinite; }

  .gradient-border { position: relative; }
  .gradient-border::before {
    content: ''; position: absolute; inset: -1px; border-radius: inherit;
    background: linear-gradient(135deg, hsl(var(--primary) / 0.5), transparent, hsl(var(--primary) / 0.3));
    opacity: 0; transition: opacity 0.4s; z-index: 0;
  }
  .gradient-border:hover::before { opacity: 1; }

  .testimonial-slide { transition: all 0.5s cubic-bezier(0.4,0,0.2,1); }

  @keyframes cta-bg {
    0%, 100% { opacity: 0.03; }
    50%       { opacity: 0.07; }
  }
  .cta-bg-orb { animation: cta-bg 4s ease-in-out infinite; }

  .faq-item summary { cursor: pointer; list-style: none; }
  .faq-item summary::-webkit-details-marker { display: none; }
  .faq-item summary::after {
    content: '+'; float: right; font-size: 1.5rem; line-height: 1;
    color: hsl(var(--primary)); transition: transform 0.2s;
  }
  .faq-item[open] summary::after { content: '−'; }
`

// ─── SCROLL REVEAL HOOK ───────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add("revealed") }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    )
    document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale")
      .forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

// ─── ANIMATED COUNTER ─────────────────────────────────────────────────────
function AnimatedCounter({ end, suffix = "", duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const startTime = performance.now()
        const tick = (now: number) => {
          const progress = Math.min((now - startTime) / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          setCount(Math.floor(eased * end))
          if (progress < 1) requestAnimationFrame(tick)
          else setCount(end)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.5 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [end, duration])
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

// ─── HERO PARTICLES ───────────────────────────────────────────────────────
function HeroParticles({ color = "99,102,241" }: { color?: string }) {
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
    for (let i = 0; i < 55; i++) {
      particles.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4, r: Math.random() * 2 + 0.5, alpha: Math.random() * 0.5 + 0.1 })
    }
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${color},${p.alpha})`; ctx.fill()
      })
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach((b) => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y)
          if (dist < 100) {
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(${color},${0.12 * (1 - dist / 100)})`
            ctx.lineWidth = 0.5; ctx.stroke()
          }
        })
      })
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize) }
  }, [color])
  return <canvas ref={canvasRef} id="hero-canvas" />
}

// ─── TICKER TAPE ──────────────────────────────────────────────────────────
// Sin cifras de rentabilidad ni menciones a copytrading.
function TickerTape() {
  const items = [
    "🤖 Expert Advisors para MetaTrader 4",
    "📊 +5000h de backtesting documentado",
    "🌎 Comunidad en LATAM y Europa",
    "⚡ Instalación Plug & Play",
    "🔒 Parámetros de gestión de riesgo configurables",
    "📁 Backtests y documentación disponibles",
    "🛡️ Soporte técnico incluido",
    "🕐 Ejecución automatizada 24/5",
    "⚠️ Los backtests son simulaciones, no una garantía",
  ]
  const doubled = [...items, ...items]
  return (
    <div className="w-full overflow-hidden bg-primary/5 border-y border-primary/10 py-2.5">
      <div className="ticker-inner flex gap-10 whitespace-nowrap w-max">
        {doubled.map((item, i) => (
          <span key={i} className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            {item}<span className="text-primary/40">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── AVISO DE RIESGO (obligatorio para Meta Ads) ──────────────────────────
// Debe estar visible sin hacer scroll extra y sin necesidad de clic.
function RiskBanner() {
  return (
    <section className="w-full bg-amber-500/10 border-b border-amber-500/25">
      <div className="container px-4 md:px-6 py-4">
        <div className="flex gap-3 items-start max-w-4xl mx-auto">
          <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
          <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Aviso de riesgo.</strong> FXAutoBots comercializa software de
            automatización (Expert Advisors) para MetaTrader 4. No somos un broker, no somos asesores financieros y
            no gestionamos ni recibimos fondos de terceros. Operar Forex y CFDs con apalancamiento implica un alto
            riesgo y puede ocasionar la pérdida total del capital invertido. Los backtests son simulaciones sobre
            datos históricos y <strong className="text-foreground">no predicen ni garantizan resultados futuros</strong>.
            No inviertas dinero que no puedas permitirte perder.{" "}
            <Link href="/descargo" className="underline hover:text-primary">Leer el descargo completo</Link>.
          </p>
        </div>
      </div>
    </section>
  )
}

// ─── STATS BAR ────────────────────────────────────────────────────────────
// Sin "tasa de éxito" ni métricas de rentabilidad: solo datos verificables
// del producto. Ajustá los números a lo que puedas demostrar con evidencia.
function StatsBar() {
  const stats = [
    { icon: Package,    label: "Bots disponibles",            value: 4,    suffix: "" },
    { icon: TrendingUp, label: "Horas de backtesting",        value: 5000, suffix: "h" },
    { icon: Target,     label: "Pares configurados",          value: 15,   suffix: "" },
    { icon: Users,      label: "Miembros de la comunidad",    value: 82,   suffix: "+" },
  ]
  return (
    <section className="w-full py-10 border-b">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div key={s.label} className={`reveal flex flex-col items-center text-center gap-1 delay-${(i + 1) * 100}`}>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 mb-2">
                <s.icon className="h-5 w-5 text-primary" />
              </div>
              <p className="text-3xl font-bold stat-number"><AnimatedCounter end={s.value} suffix={s.suffix} /></p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-muted-foreground/70 mt-6 max-w-2xl mx-auto">
          Datos sobre el producto y la comunidad al {new Date().getFullYear()}. No son indicadores de rentabilidad.
        </p>
      </div>
    </section>
  )
}

// ─── FAQ ──────────────────────────────────────────────────────────────────
// Reemplaza a los testimonios. Meta valora páginas con información clara de
// producto, condiciones y contacto; además responde las objeciones reales.
function FAQ() {
  const faqs = [
    {
      q: "¿Qué es exactamente lo que compro?",
      a: "Comprás un archivo Expert Advisor (.ex4) con sus presets de configuración para MetaTrader 4, más la documentación de instalación y el soporte técnico. Es una licencia de software: no es una cuenta gestionada, no es una señal y no es un servicio de inversión.",
    },
    {
      q: "¿Los bots garantizan ganancias?",
      a: "No. Ningún software de trading puede garantizar ganancias. Los bots ejecutan una estrategia con reglas predefinidas: pueden tener períodos ganadores y períodos perdedores, y existe la posibilidad de perder la totalidad del capital de la cuenta. Cualquier resultado histórico o backtest que publiquemos es información sobre el pasado, no una proyección.",
    },
    {
      q: "¿Qué necesito para usarlos?",
      a: "Una cuenta en MetaTrader 4 con un broker de tu elección, la plataforma instalada y, si querés que opere sin tener la PC prendida, un VPS. En la sección de tutoriales está el paso a paso completo.",
    },
    {
      q: "¿Qué es un backtest y qué valor tiene?",
      a: "Es una simulación de la estrategia sobre datos históricos de precio. Sirve para entender cómo se comportó la lógica del bot en el pasado y qué tipo de drawdown tuvo, pero las condiciones reales de mercado, el spread, el slippage y la ejecución de tu broker pueden dar resultados distintos. Publicamos los reportes para que puedas revisarlos vos mismo antes de comprar.",
    },
    {
      q: "¿Con cuánto capital debería empezar?",
      a: "Cada bot indica un capital mínimo sugerido según su perfil de riesgo. Recomendamos empezar en cuenta demo, y cuando pases a real, hacerlo únicamente con capital que puedas permitirte perder.",
    },
    {
      q: "¿Hay política de devolución?",
      a: "Al tratarse de un producto digital de descarga inmediata, revisá las condiciones de reembolso detalladas en los Términos y Condiciones antes de comprar.",
    },
    {
      q: "¿Ofrecen soporte después de la compra?",
      a: "Sí. El soporte técnico para instalación y configuración está incluido con todos los bots, y los packs incluyen soporte prioritario. Podés escribirnos por Telegram o Instagram.",
    },
    {
      q: "¿FXAutoBots administra mi dinero?",
      a: "No. Nunca vas a transferirnos fondos para operar. El software se instala en tu propia plataforma, con tu propio broker, y vos mantenés el control total de la cuenta en todo momento.",
    },
  ]
  return (
    <section id="faq" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-2 reveal">
          <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-3">
            <HelpCircle className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Preguntas frecuentes</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
            Todo lo que conviene saber antes de comprar, sin letra chica
          </p>
        </div>
        <div className="mx-auto max-w-3xl mt-12 space-y-3 reveal delay-200">
          {faqs.map((f) => (
            <details key={f.q} className="faq-item bg-background rounded-xl border p-5 transition-shadow hover:shadow-md">
              <summary className="font-semibold text-base pr-8">{f.q}</summary>
              <p className="text-muted-foreground text-sm leading-relaxed mt-3">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── TESTIMONIOS (desactivado) ────────────────────────────────────────────
// Los testimonios anteriores usaban nombres inventados y fotos de stock de
// randomuser.me. Eso es publicidad engañosa: viola las Normas Publicitarias
// de Meta (contenido engañoso / testimonios exagerados) y la normativa de
// defensa del consumidor en AR, ES, MX y CL. Se eliminaron.
//
// Para reactivarlos necesitás, por cada testimonio:
//   1. Persona real y cliente verificable.
//   2. Consentimiento por escrito para usar su nombre y su imagen.
//   3. Foto real (o iniciales/avatar genérico, nunca una foto de stock
//      presentada como si fuera esa persona).
//   4. Texto sin cifras de rentabilidad ni promesas de resultados.
// Cargalos en el array `testimonials` y poné MOSTRAR_TESTIMONIOS = true.
function TestimonialCarousel() {
  const testimonials: { name: string; image: string; review: string; location: string }[] = [
    // { name: "Nombre real", image: "/images/testimonios/foto.jpg", review: "...", location: "Argentina" },
  ]
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)
  useEffect(() => {
    if (testimonials.length < 2) return
    const interval = setInterval(() => goTo((current + 1) % testimonials.length), 5000)
    return () => clearInterval(interval)
  }, [current, testimonials.length])
  const goTo = (idx: number) => {
    if (animating) return
    setAnimating(true)
    setTimeout(() => { setCurrent(idx); setAnimating(false) }, 300)
  }
  if (!MOSTRAR_TESTIMONIOS || testimonials.length === 0) return null
  return (
    <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-muted overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-2 reveal">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Lo que dicen nuestros usuarios</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
            Opiniones reales de clientes, publicadas con su consentimiento
          </p>
        </div>
        <div className="mx-auto max-w-3xl mt-12 relative reveal delay-200">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
          <div className="relative flex flex-col items-center space-y-6 text-center p-8 rounded-2xl bg-background shadow-xl border testimonial-slide"
            style={{ opacity: animating ? 0 : 1, transform: animating ? "scale(0.97)" : "scale(1)" }}>
            <div className="absolute top-6 left-8 text-6xl font-serif text-primary/10 leading-none select-none">"</div>
            <div className="relative h-24 w-24 rounded-full overflow-hidden ring-4 ring-primary/20">
              <Image src={testimonials[current].image || "/placeholder.svg"} alt={testimonials[current].name} fill className="object-cover" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">{testimonials[current].name}</h3>
              <p className="text-sm text-muted-foreground">{testimonials[current].location}</p>
              <blockquote className="text-lg italic min-h-[3rem] flex items-center justify-center max-w-lg mx-auto">
                "{testimonials[current].review}"
              </blockquote>
            </div>
          </div>
          <div className="flex justify-center mt-6 gap-2">
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => goTo(i)} aria-label={`Testimonio ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${i === current ? "bg-primary w-6 h-3" : "bg-muted-foreground/30 w-3 h-3"}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── HERO ─────────────────────────────────────────────────────────────────
// Antes era un carrusel de 2 slides (Bots / Copy Trading). El slide de
// Copy Trading se eliminó por completo.
function Hero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden"
      style={{ background: "linear-gradient(to bottom, hsl(var(--muted) / 0.5), hsl(var(--muted)))" }}>
      <HeroParticles color="99,102,241" />

      <div className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full blur-3xl pointer-events-none"
        style={{ background: "hsl(var(--primary) / 0.05)" }} />
      <div className="absolute bottom-1/4 left-1/4 w-56 h-56 rounded-full blur-3xl pointer-events-none"
        style={{ background: "hsl(var(--primary) / 0.03)" }} />

      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="badge-pulse rounded-full">
                <Image src="/images/fxautobots-logo.png" alt="FXAutoBots Logo" width={60} height={60} />
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">FXAutoBots</h1>
            </div>
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
              <Zap className="h-3.5 w-3.5" />
              Software de automatización para MetaTrader 4
            </div>
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
              Automatizá tu operativa en MT4 con reglas definidas
            </h2>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              Nuestros Expert Advisors ejecutan estrategias con reglas predefinidas y parámetros de gestión de riesgo
              configurables en MetaTrader 4. Publicamos los backtests para que evalúes cada bot antes de comprarlo.
            </p>
            <p className="max-w-[600px] text-xs text-muted-foreground/80">
              Operar Forex y CFDs conlleva un alto riesgo de pérdida. Los resultados históricos y los backtests no
              garantizan rendimientos futuros.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button size="lg" className="font-medium btn-glow" asChild>
                <Link href="/comprar">Ver los bots</Link>
              </Button>
              <Button size="lg" variant="outline" className="font-medium bg-transparent btn-glow" asChild>
                <Link href="/backtest">Ver backtests</Link>
              </Button>
            </div>
            <div className="flex items-center gap-4 pt-2">
              <a href="https://instagram.com/botsdetrading.latam" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-4 w-4" /><span>@botsdetrading.latam</span>
              </a>
              <a href="https://t.me/fxautobots_bot" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
                <MessageCircle className="h-4 w-4" /><span>@fxautobots_bot</span>
              </a>
            </div>
          </div>
          <div className="relative h-[350px] lg:h-[450px] rounded-2xl overflow-hidden shadow-2xl">
            <Image src="/images/akiradeusscalper.png" alt="Expert Advisors de FXAutoBots para MetaTrader 4" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-tr from-background/20 to-transparent" />
            <div className="absolute bottom-4 right-4 bg-background/80 p-2 rounded-xl backdrop-blur-sm shadow-lg">
              <Image src="/images/fxautobots-logo.png" alt="FXAutoBots Logo" width={40} height={40} />
            </div>
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium shadow-lg">
              <Zap className="h-3 w-3 text-primary" />
              Compatible con MetaTrader 4
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────
export default function LandingPage() {
  useScrollReveal()

  const navLinks = [
    { href: "/empezar",    label: "Empezar" },
    { href: "/backtest",   label: "Backtest" },
    { href: "/tutoriales", label: "Tutoriales" },
    { href: "#pricing",    label: "Precios" },
    { href: "#faq",        label: "FAQ" },
    { href: "#vps",        label: "VPS" },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <style>{globalStyles}</style>

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
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group">
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-3">
              <a href="https://instagram.com/botsdetrading.latam" target="_blank" rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-all hover:scale-110" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://t.me/fxautobots_bot" target="_blank" rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-all hover:scale-110" aria-label="Telegram">
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
            <ThemeToggle />
            <Button asChild className="hidden md:inline-flex btn-glow">
              <Link href="#pricing">Ver bots</Link>
            </Button>
            <MobileNav links={[
              ...navLinks,
              { href: "/comprar",  label: "Comprar" },
              { href: "/descargo", label: "Aviso de riesgo" },
            ]} />
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <Hero />

      {/* ── AVISO DE RIESGO ── */}
      <RiskBanner />

      {/* ── TICKER ── */}
      <TickerTape />

      {/* ── STATS ── */}
      <StatsBar />

      {/* ── FEATURES ── */}
      <section id="features" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center reveal">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Características principales</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
              Software diseñado para ejecutar estrategias con reglas claras, backtests publicados y control de riesgo configurable
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
            {[
              { icon: Settings,   label: "Plug & Play",             desc: "Cargás los archivos .preset en MetaTrader 4 y el bot queda listo para operar.",                            delay: "delay-100", float: "icon-float" },
              { icon: TrendingUp, label: "Backtests publicados",    desc: "Más de 5000 horas de pruebas sobre datos históricos, con los reportes disponibles para que los revises.",   delay: "delay-300", float: "icon-float-delay" },
              { icon: Shield,     label: "Control de riesgo",       desc: "Stop loss, lotaje y límites de exposición configurables por vos según tu perfil y tu capital.",             delay: "delay-500", float: "icon-float-delay2" },
            ].map((f) => (
              <div key={f.label} className={`reveal ${f.delay} flex flex-col items-center space-y-4 text-center p-6 rounded-2xl hover:bg-muted/50 transition-colors duration-300`}>
                <div className={`flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 ${f.float}`}>
                  <f.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">{f.label}</h3>
                <p className="text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIOS (desactivados hasta tener testimonios reales) ── */}
      <TestimonialCarousel />

      {/* ── PRICING ── */}
      <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center reveal">
            <div className="flex justify-center items-center gap-3 mb-4">
              <Image src="/images/fxautobots-logo.png" alt="FXAutoBots Logo" width={50} height={50} />
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Nuestros bots para MT4</h2>
            </div>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
              Elegí el bot que mejor se adapte a tu estilo de trading, tu capital y tu tolerancia al riesgo
            </p>
          </div>

          <div className="mx-auto grid max-w-7xl items-start gap-6 py-12 lg:grid-cols-4 lg:gap-6">
            {/* AKIRA */}
            <div className="reveal delay-100">
              <Card className="relative overflow-hidden card-hover gradient-border h-full">
                <div className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 text-xs font-bold">RIESGO ALTO</div>
                <CardHeader className="pb-4">
                  <div className="relative h-48 w-full mb-4 rounded-lg overflow-hidden flex items-center justify-center bg-background/95">
                    <Image src="/images/BOTAKIRA.png" alt="Bot AKIRA" fill className="object-contain transition-transform duration-500 hover:scale-105" />
                    <div className="absolute bottom-2 right-2 bg-background/80 p-1 rounded-lg backdrop-blur-sm">
                      <Image src="/images/fxautobots-logo.png" alt="FXAutoBots Logo" width={24} height={24} />
                    </div>
                  </div>
                  <div className="flex items-center gap-2"><BarChart3 className="h-6 w-6 text-red-500" /><CardTitle className="text-2xl">Bot AKIRA</CardTitle></div>
                  <CardDescription className="text-lg font-semibold text-primary">$120 USD</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-muted-foreground" /><span className="text-sm font-medium">Temporalidad: M5</span></div>
                    <div className="flex items-center gap-2"><Target className="h-4 w-4 text-muted-foreground" /><span className="text-sm font-medium">Pares: EURGBP, EURJPY, EURUSD, GBPUSD, USDJPY</span></div>
                  </div>
                  <p className="text-sm text-muted-foreground">Perfil agresivo y de alta frecuencia. Por su exposición requiere una gestión de riesgo estricta; se sugiere un capital mínimo de $400 USD en cuenta CENT.</p>
                </CardContent>
                <CardFooter><Button className="w-full btn-glow" asChild><Link href="/comprar">Ver Bot AKIRA</Link></Button></CardFooter>
              </Card>
            </div>

            {/* DEUS */}
            <div className="reveal delay-200">
              <Card className="relative overflow-hidden card-hover border-primary h-full">
                <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 text-xs font-bold">MÁS ELEGIDO</div>
                <CardHeader className="pb-4">
                  <div className="relative h-48 w-full mb-4 rounded-lg overflow-hidden flex items-center justify-center bg-background/95">
                    <Image src="/images/BOTDEUS.png" alt="Bot DEUS" fill className="object-contain transition-transform duration-500 hover:scale-105" />
                    <div className="absolute bottom-2 right-2 bg-background/80 p-1 rounded-lg backdrop-blur-sm">
                      <Image src="/images/fxautobots-logo.png" alt="FXAutoBots Logo" width={24} height={24} />
                    </div>
                  </div>
                  <div className="flex items-center gap-2"><TrendingUp className="h-6 w-6 text-primary" /><CardTitle className="text-2xl">Bot DEUS</CardTitle></div>
                  <CardDescription className="text-lg font-semibold text-primary">$120 USD</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-muted-foreground" /><span className="text-sm font-medium">Temporalidad: H1</span></div>
                    <div className="flex items-center gap-2"><Target className="h-4 w-4 text-muted-foreground" /><span className="text-sm font-medium">Pares: AUDCAD, AUDCHF, EURJPY, EURUSD, GBPJPY, GBPUSD, USDJPY, XAUUSD</span></div>
                  </div>
                  <p className="text-sm text-muted-foreground">Bot versátil y equilibrado para operar en múltiples pares. Capital mínimo sugerido: $100 USD en cuenta CENT.</p>
                </CardContent>
                <CardFooter><Button className="w-full btn-glow" asChild><Link href="/comprar">Ver Bot DEUS</Link></Button></CardFooter>
              </Card>
            </div>

            {/* SCALPER */}
            <div className="reveal delay-300">
              <Card className="relative overflow-hidden card-hover gradient-border h-full">
                <div className="absolute top-0 right-0 bg-green-500 text-white px-3 py-1 text-xs font-bold">TÉCNICO</div>
                <CardHeader className="pb-4">
                  <div className="relative h-48 w-full mb-4 rounded-lg overflow-hidden flex items-center justify-center bg-background/95">
                    <Image src="/images/BOTSCALPER.png" alt="Bot SCALPER" fill className="object-contain transition-transform duration-500 hover:scale-105" />
                    <div className="absolute bottom-2 right-2 bg-background/80 p-1 rounded-lg backdrop-blur-sm">
                      <Image src="/images/fxautobots-logo.png" alt="FXAutoBots Logo" width={24} height={24} />
                    </div>
                  </div>
                  <div className="flex items-center gap-2"><Settings className="h-6 w-6 text-green-500" /><CardTitle className="text-2xl">Bot SCALPER</CardTitle></div>
                  <CardDescription className="text-lg font-semibold text-primary">$120 USD</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-muted-foreground" /><span className="text-sm font-medium">Temporalidad: H1</span></div>
                    <div className="flex items-center gap-2"><Target className="h-4 w-4 text-muted-foreground" /><span className="text-sm font-medium">Pares: AUDCAD, NZDCAD, AUDNZD</span></div>
                  </div>
                  <p className="text-sm text-muted-foreground">Bot técnico con gestión interna de stop loss y control de equity. Pensado como complemento del Bot DEUS.</p>
                </CardContent>
                <CardFooter><Button className="w-full btn-glow" asChild><Link href="/comprar">Ver Bot SCALPER</Link></Button></CardFooter>
              </Card>
            </div>

            {/* ATLAS */}
            <div className="reveal delay-400">
              <Card className="relative overflow-hidden card-hover border-2 border-amber-500 h-full">
                <div className="absolute top-0 right-0 bg-amber-500 text-white px-3 py-1 text-xs font-bold">PREMIUM</div>
                <CardHeader className="pb-4">
                  <div className="relative h-48 w-full mb-4 rounded-lg overflow-hidden flex items-center justify-center bg-gradient-to-br from-amber-500/10 to-amber-600/20">
                    <Image src="/images/BOTATLAS.png" alt="Bot ATLAS" fill className="object-contain transition-transform duration-500 hover:scale-105" />
                    <div className="absolute bottom-2 right-2 bg-background/80 p-1 rounded-lg backdrop-blur-sm">
                      <Image src="/images/fxautobots-logo.png" alt="FXAutoBots Logo" width={24} height={24} />
                    </div>
                  </div>
                  <div className="flex items-center gap-2"><Shield className="h-6 w-6 text-amber-500" /><CardTitle className="text-2xl">Bot ATLAS</CardTitle></div>
                  <CardDescription className="text-lg font-semibold text-amber-500">$600 USD</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-muted-foreground" /><span className="text-sm font-medium">Estrategia: Order Blocks</span></div>
                    <div className="flex items-center gap-2"><Target className="h-4 w-4 text-muted-foreground" /><span className="text-sm font-medium">Opera con: órdenes stop, stop loss y take profit</span></div>
                  </div>
                  <p className="text-sm text-muted-foreground">Bot con enfoque en estructura operativa, control de riesgo y ejecución disciplinada. No garantiza superar ninguna evaluación de fondeo.</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white btn-glow" asChild>
                    <Link href="/comprar">Ver Bot ATLAS</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>

          <p className="text-center text-xs text-muted-foreground/70 max-w-3xl mx-auto -mt-6 mb-8">
            Los capitales mínimos son sugerencias técnicas para el funcionamiento del software, no recomendaciones de
            inversión. Ningún bot garantiza resultados: podés perder parte o la totalidad del capital de tu cuenta.
          </p>

          {/* Comparativa */}
          <div className="mt-16 mb-8 reveal">
            <div className="flex flex-col items-center text-center mb-8">
              <h3 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">Comparativa de bots</h3>
              <p className="max-w-[700px] text-muted-foreground mt-2">Compará las características técnicas de cada bot para elegir el que mejor se adapte a tu perfil</p>
            </div>
            <div className="max-w-7xl mx-auto"><BotsComparison /></div>
          </div>

          {/* Ofertas */}
          <div className="mt-16 mb-8">
            <div className="flex flex-col items-center text-center mb-8 reveal">
              <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-3">
                <Percent className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">Packs con descuento</h3>
              <p className="max-w-[700px] text-muted-foreground mt-2">Combiná varios bots y accedé a un precio preferencial</p>
            </div>

            <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
              <div className="reveal delay-100">
                <Card className="relative overflow-hidden border-2 border-primary/50 card-hover h-full">
                  <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 text-xs font-bold">AHORRÁ $40</div>
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-2"><Package className="h-6 w-6 text-primary" /><CardTitle className="text-2xl">Pack Duo</CardTitle></div>
                    <div className="flex items-center gap-2 mt-2">
                      <CardDescription className="text-2xl font-bold text-primary">$200 USD</CardDescription>
                      <span className="text-sm line-through text-muted-foreground">$240 USD</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm">Elegí 2 bots de nuestra colección y diversificá tus estrategias con un descuento especial.</p>
                    <ul className="space-y-2 bg-muted p-3 rounded-lg">
                      {["Elegís cualquier combinación de 2 bots", "Soporte técnico prioritario", "Actualizaciones incluidas"].map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm">
                          <CheckIcon className="h-4 w-4 text-primary shrink-0" />{item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter><Button className="w-full btn-glow" size="lg" asChild><Link href="/comprar">Ver Pack Duo</Link></Button></CardFooter>
                </Card>
              </div>

              <div className="reveal delay-200">
                <Card className="relative overflow-hidden border-2 border-primary card-hover h-full">
                  <div className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 text-xs font-bold">AHORRÁ $80</div>
                  <div className="absolute -top-1 -left-1 bg-primary text-white px-3 py-1 text-xs font-bold rounded-br-lg">MÁS ELEGIDO</div>
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-2"><Package className="h-6 w-6 text-primary" /><CardTitle className="text-2xl">Pack Completo</CardTitle></div>
                    <div className="flex items-center gap-2 mt-2">
                      <CardDescription className="text-2xl font-bold text-primary">$280 USD</CardDescription>
                      <span className="text-sm line-through text-muted-foreground">$360 USD</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm">Los 3 bots principales de la colección, para diversificar tu operativa con nuestro mejor descuento.</p>
                    <ul className="space-y-2 bg-muted p-3 rounded-lg">
                      {["Incluye AKIRA + DEUS + SCALPER", "Soporte técnico VIP", "Actualizaciones prioritarias", "Guía de configuración avanzada"].map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm">
                          <CheckIcon className="h-4 w-4 text-primary shrink-0" />{item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter><Button className="w-full btn-glow" size="lg" asChild><Link href="/comprar">Ver Pack Completo</Link></Button></CardFooter>
                </Card>
              </div>

              <div className="reveal delay-300">
                <Card className="relative overflow-hidden border-2 border-amber-500 card-hover h-full">
                  <div className="absolute top-0 right-0 bg-amber-500 text-white px-3 py-1 text-xs font-bold">AHORRÁ $210</div>
                  <div className="absolute -top-1 -left-1 bg-amber-500 text-white px-3 py-1 text-xs font-bold rounded-br-lg">PACK ULTIMATE</div>
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-2"><Package className="h-6 w-6 text-amber-500" /><CardTitle className="text-2xl">Pack Ultimate</CardTitle></div>
                    <div className="flex items-center gap-2 mt-2">
                      <CardDescription className="text-2xl font-bold text-amber-500">$850 USD</CardDescription>
                      <span className="text-sm line-through text-muted-foreground">$1.060 USD</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm">El paquete más completo: todos nuestros bots más el Bot ATLAS.</p>
                    <ul className="space-y-2 bg-muted p-3 rounded-lg">
                      {["AKIRA + DEUS + SCALPER + ATLAS", "Soporte técnico VIP", "Acceso anticipado a nuevos bots", "Configuración personalizada incluida"].map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm">
                          <CheckIcon className="h-4 w-4 text-amber-500 shrink-0" />{item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter><Button className="w-full bg-amber-500 hover:bg-amber-600 text-white btn-glow" size="lg" asChild><Link href="/comprar">Ver Pack Ultimate</Link></Button></CardFooter>
                </Card>
              </div>
            </div>
          </div>

          {/* Calculadora — desactivada para tráfico de Meta Ads */}
          {MOSTRAR_CALCULADORA && (
            <div className="mt-16 mb-8 reveal">
              <div className="flex flex-col items-center text-center mb-8">
                <h3 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">Calculadora estimativa</h3>
                <p className="max-w-[700px] text-muted-foreground mt-2">
                  Herramienta de simulación con fines ilustrativos. Los valores que ingresás son hipotéticos y no
                  representan una proyección, una promesa ni una garantía de resultados.
                </p>
              </div>
              <div className="max-w-xl mx-auto"><ProfitCalculator /></div>
            </div>
          )}
        </div>
      </section>

      {/* ── FAQ ── */}
      <FAQ />

      {/* ── VPS ── */}
      <div className="reveal"><RecommendedVPS /></div>

      {/* ── BROKERS — desactivado para tráfico de Meta Ads ── */}
      {MOSTRAR_BROKERS_AFILIADOS && (
        <section id="brokers" className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
          <div className="reveal"><RecommendedBrokers /></div>
        </section>
      )}

      {/* ── CTA ── */}
      <section id="cta" className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
        <div className="cta-bg-orb absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary rounded-full blur-[120px] pointer-events-none" />
        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center justify-center space-y-4 text-center reveal">
            <div className="badge-pulse mb-4">
              <Image src="/images/fxautobots-logo.png" alt="FXAutoBots Logo" width={80} height={80} />
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">¿Listo para automatizar tu operativa?</h2>
            <p className="max-w-[600px] mx-auto text-muted-foreground md:text-xl/relaxed">
              Conocé nuestros Expert Advisors para MT4, revisá los backtests y elegí el que mejor se adapte a tu perfil de riesgo.
            </p>
            <Button size="lg" className="font-medium text-lg group btn-glow mt-4" asChild>
              <Link href="/comprar">
                Ver los bots
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <div className="flex flex-wrap items-center justify-center gap-6 mt-4">
              <a href="https://instagram.com/botsdetrading.latam" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors hover:scale-105">
                <Instagram className="h-5 w-5" /><span>@botsdetrading.latam</span>
              </a>
              <a href="https://t.me/fxautobots_bot" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors hover:scale-105">
                <MessageCircle className="h-5 w-5" /><span>@fxautobots_bot</span>
              </a>
              <a href="mailto:soporte@fxautobots.com" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors hover:scale-105">
                <Mail className="h-5 w-5" /><span>soporte@fxautobots.com</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="w-full border-t">
        {/* Descargo de responsabilidad completo — Meta revisa la landing, no solo el anuncio */}
        <div className="container px-4 md:px-6 py-8">
          <div className="max-w-4xl mx-auto space-y-3 text-xs text-muted-foreground leading-relaxed">
            <div className="flex items-center gap-2 text-foreground font-semibold text-sm">
              <FileText className="h-4 w-4" />
              Descargo de responsabilidad
            </div>
            <p>
              FXAutoBots comercializa software de automatización (Expert Advisors) para la plataforma MetaTrader 4.
              No somos un broker, un agente de bolsa, un asesor financiero registrado ni un administrador de
              inversiones. No ofrecemos asesoramiento financiero, no gestionamos cuentas de terceros y en ningún caso
              recibimos fondos de nuestros clientes para operar.
            </p>
            <p>
              La operatoria con divisas (Forex) y contratos por diferencia (CFDs) implica un elevado grado de riesgo
              por el uso de apalancamiento y puede resultar en la pérdida total del capital invertido. No es adecuada
              para todos los inversores. Antes de operar, evaluá cuidadosamente tus objetivos, tu experiencia y tu
              tolerancia al riesgo, y si es necesario, buscá asesoramiento profesional independiente.
            </p>
            <p>
              Los backtests, reportes y cualquier dato de rendimiento histórico publicado en este sitio corresponden a
              simulaciones sobre datos del pasado, realizadas en condiciones específicas de broker, spread y ejecución.
              El rendimiento pasado y los resultados simulados no son indicativos ni garantía de resultados futuros.
              Los resultados reales pueden diferir significativamente. Ningún producto vendido en este sitio garantiza
              beneficios de ningún tipo.
            </p>
            <p>
              El uso de los bots es responsabilidad exclusiva del usuario. FXAutoBots no se hace responsable de
              pérdidas derivadas del uso, la configuración o el mal funcionamiento del software, de la plataforma, del
              broker o del servicio de VPS elegido por el usuario.
            </p>
          </div>
        </div>

        <div className="border-t">
          <div className="container flex flex-col items-center justify-between gap-4 py-6 md:h-24 md:flex-row md:py-0">
            <div className="flex items-center gap-2">
              <Image src="/images/fxautobots-logo.png" alt="FXAutoBots Logo" width={30} height={30} />
              <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">FXAutoBots © 2026 | Todos los derechos reservados</p>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end gap-4 items-center">
              <Link href="/terminos" className="text-sm text-muted-foreground hover:text-primary transition-colors hover:underline">Términos y Condiciones</Link>
              <Link href="/privacidad" className="text-sm text-muted-foreground hover:text-primary transition-colors hover:underline">Política de privacidad</Link>
              <Link href="/descargo" className="text-sm text-muted-foreground hover:text-primary transition-colors hover:underline">Aviso de riesgo</Link>
              <Link href="/contacto" className="text-sm text-muted-foreground hover:text-primary transition-colors hover:underline">Contacto</Link>
              <div className="flex items-center gap-4 ml-2">
                <a href="https://instagram.com/botsdetrading.latam" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-all hover:scale-110"><Instagram className="h-5 w-5" /></a>
                <a href="https://t.me/fxautobots_bot" target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="text-muted-foreground hover:text-primary transition-all hover:scale-110"><MessageCircle className="h-5 w-5" /></a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  )
}
