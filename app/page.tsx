"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Settings, TrendingUp, DollarSign, ChevronRight, Clock,
  BarChart3, Target, Package, Percent, Instagram, MessageCircle,
  Shield, Zap, Users, Award,
} from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { BotsComparison } from "../components/bots-comparison"
import { ProfitCalculator } from "../components/profit-calculator"
import { ThemeToggle } from "../components/theme-toggle"
import { RecommendedBrokers } from "../components/recommended-brokers"
import { RecommendedVPS } from "../components/recommended-vps"
import { MobileNav } from "../components/mobile-nav"

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────
const globalStyles = `
  /* Scroll reveal base */
  .reveal {
    opacity: 0;
    transform: translateY(32px);
    transition: opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1);
  }
  .reveal.revealed {
    opacity: 1;
    transform: translateY(0);
  }
  .reveal-left {
    opacity: 0;
    transform: translateX(-40px);
    transition: opacity 0.8s cubic-bezier(0.4,0,0.2,1), transform 0.8s cubic-bezier(0.4,0,0.2,1);
  }
  .reveal-left.revealed {
    opacity: 1;
    transform: translateX(0);
  }
  .reveal-right {
    opacity: 0;
    transform: translateX(40px);
    transition: opacity 0.8s cubic-bezier(0.4,0,0.2,1), transform 0.8s cubic-bezier(0.4,0,0.2,1);
  }
  .reveal-right.revealed {
    opacity: 1;
    transform: translateX(0);
  }
  .reveal-scale {
    opacity: 0;
    transform: scale(0.92);
    transition: opacity 0.6s cubic-bezier(0.4,0,0.2,1), transform 0.6s cubic-bezier(0.4,0,0.2,1);
  }
  .reveal-scale.revealed {
    opacity: 1;
    transform: scale(1);
  }

  /* Stagger delays */
  .delay-100 { transition-delay: 0.1s; }
  .delay-200 { transition-delay: 0.2s; }
  .delay-300 { transition-delay: 0.3s; }
  .delay-400 { transition-delay: 0.4s; }
  .delay-500 { transition-delay: 0.5s; }
  .delay-600 { transition-delay: 0.6s; }

  /* Card tilt/hover effect */
  .card-hover {
    transition: transform 0.3s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s ease;
    will-change: transform;
  }
  .card-hover:hover {
    transform: translateY(-6px) scale(1.015);
    box-shadow: 0 20px 40px rgba(0,0,0,0.12);
  }

  /* Glowing button */
  .btn-glow {
    position: relative;
    overflow: hidden;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .btn-glow::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%);
    opacity: 0;
    transition: opacity 0.3s;
  }
  .btn-glow:hover::after { opacity: 1; }
  .btn-glow:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.2);
  }
  .btn-glow:active { transform: translateY(0); }

  /* Particle canvas */
  #hero-canvas {
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: 0.45;
  }

  /* Floating badge pulse */
  @keyframes badge-pulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(var(--primary-rgb, 59,130,246), 0.4); }
    50%       { box-shadow: 0 0 0 10px rgba(var(--primary-rgb, 59,130,246), 0); }
  }
  .badge-pulse { animation: badge-pulse 2.5s ease-in-out infinite; }

  /* Ticker tape */
  @keyframes ticker {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  .ticker-inner { animation: ticker 22s linear infinite; }
  .ticker-inner:hover { animation-play-state: paused; }

  /* Number counter shimmer */
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  .stat-number {
    background: linear-gradient(90deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.6) 40%, hsl(var(--primary)) 60%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 3s linear infinite;
  }

  /* Feature icon float */
  @keyframes icon-float {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-6px); }
  }
  .icon-float { animation: icon-float 3.5s ease-in-out infinite; }
  .icon-float-delay { animation: icon-float 3.5s ease-in-out 1.2s infinite; }
  .icon-float-delay2 { animation: icon-float 3.5s ease-in-out 2.4s infinite; }

  /* Gradient border card */
  .gradient-border {
    position: relative;
  }
  .gradient-border::before {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: inherit;
    background: linear-gradient(135deg, hsl(var(--primary) / 0.5), transparent, hsl(var(--primary) / 0.3));
    opacity: 0;
    transition: opacity 0.4s;
    z-index: 0;
  }
  .gradient-border:hover::before { opacity: 1; }

  /* Testimonial transition */
  .testimonial-slide {
    transition: all 0.5s cubic-bezier(0.4,0,0.2,1);
  }

  /* CTA section background pulse */
  @keyframes cta-bg {
    0%, 100% { opacity: 0.03; }
    50%       { opacity: 0.07; }
  }
  .cta-bg-orb {
    animation: cta-bg 4s ease-in-out infinite;
  }
`

// ─── SCROLL REVEAL HOOK ───────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed")
          }
        })
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    )
    const elements = document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale")
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

// ─── ANIMATED COUNTER ─────────────────────────────────────────────────────
function AnimatedCounter({ end, suffix = "", duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
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
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [end, duration])

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
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

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener("resize", resize)

    // Spawn particles
    for (let i = 0; i < 55; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.5 + 0.1,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(99,102,241,${p.alpha})`
        ctx.fill()
      })

      // Draw connecting lines
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach((b) => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y)
          if (dist < 100) {
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(99,102,241,${0.12 * (1 - dist / 100)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })

      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return <canvas ref={canvasRef} id="hero-canvas" />
}

// ─── TICKER TAPE ──────────────────────────────────────────────────────────
function TickerTape() {
  const items = [
    "🤖 Bots 100% Automatizados",
    "📈 +5000h de Backtesting",
    "🌎 Traders en LATAM & Europa",
    "⚡ Plug & Play para MT4",
    "🔒 Gestión de Riesgo Integrada",
    "💰 Resultados Consistentes",
    "🛡️ Soporte VIP incluido",
    "📊 Opera 24/5 sin descanso",
  ]
  const doubled = [...items, ...items]

  return (
    <div className="w-full overflow-hidden bg-primary/5 border-y border-primary/10 py-2.5">
      <div className="ticker-inner flex gap-10 whitespace-nowrap w-max">
        {doubled.map((item, i) => (
          <span key={i} className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            {item}
            <span className="text-primary/40">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── STATS BAR ────────────────────────────────────────────────────────────
function StatsBar() {
  const stats = [
    { icon: Users,  label: "Traders activos",   value: 500,  suffix: "+" },
    { icon: TrendingUp, label: "Horas de backtest", value: 5000, suffix: "h" },
    { icon: Award,  label: "Tasa de éxito",      value: 94,   suffix: "%" },
    { icon: Zap,    label: "Operaciones auto",    value: 12000, suffix: "+" },
  ]

  return (
    <section className="w-full py-10 border-b">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`reveal flex flex-col items-center text-center gap-1 delay-${(i + 1) * 100}`}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 mb-2">
                <s.icon className="h-5 w-5 text-primary" />
              </div>
              <p className="text-3xl font-bold stat-number">
                <AnimatedCounter end={s.value} suffix={s.suffix} />
              </p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── TESTIMONIAL CAROUSEL ─────────────────────────────────────────────────
function TestimonialCarousel() {
  const testimonials = [
    { name: "Carlos G.",  image: "", review: "Con este bot hice en 3 semanas lo que antes hacía en 3 meses. Fácil de usar y rentable.", location: "México" },
    { name: "María S.",   image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&fit=crop", review: "Increíble la consistencia de ganancias. Ya llevo 2 meses usando el bot y los resultados superan mis expectativas.", location: "España" },
    { name: "Roberto L.", image: "", review: "Al principio era escéptico, pero después de ver los backtests y probarlo, no puedo estar más satisfecho. Recomendado 100%.", location: "Colombia" },
    { name: "Ana P.",     image: "", review: "La configuración es súper sencilla y el soporte es excelente. Mi cuenta ha crecido un 40% en solo 6 semanas.", location: "Argentina" },
    { name: "Diego M.",   image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&h=200&fit=crop", review: "Después de perder dinero con otros bots, este realmente funciona. Los resultados hablan por sí solos.", location: "Chile" },
  ]

  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => goTo((current + 1) % testimonials.length), 5000)
    return () => clearInterval(interval)
  }, [current, testimonials.length])

  const goTo = (idx: number) => {
    if (animating) return
    setAnimating(true)
    setTimeout(() => { setCurrent(idx); setAnimating(false) }, 300)
  }

  return (
    <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-muted overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-2 reveal">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Lo que dicen nuestros usuarios</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">Traders como tú ya están obteniendo resultados excepcionales</p>
        </div>

        <div className="mx-auto max-w-3xl mt-12 relative reveal delay-200">
          {/* Decorative blobs */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />

          <div
            className="relative flex flex-col items-center space-y-6 text-center p-8 rounded-2xl bg-background shadow-xl border testimonial-slide"
            style={{ opacity: animating ? 0 : 1, transform: animating ? "scale(0.97)" : "scale(1)" }}
          >
            {/* Quote mark */}
            <div className="absolute top-6 left-8 text-6xl font-serif text-primary/10 leading-none select-none">"</div>

            <div className="relative h-24 w-24 rounded-full overflow-hidden ring-4 ring-primary/20">
              <Image src={testimonials[current].image || "/placeholder.svg"} alt={testimonials[current].name} fill className="object-cover" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">{testimonials[current].name}</h3>
              <p className="text-sm text-muted-foreground">{testimonials[current].location}</p>
              <div className="flex justify-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-5 w-5 fill-amber-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-lg italic min-h-[3rem] flex items-center justify-center max-w-lg mx-auto">
                "{testimonials[current].review}"
              </blockquote>
            </div>
          </div>

          <div className="flex justify-center mt-6 gap-2">
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => goTo(i)}
                className={`rounded-full transition-all duration-300 ${i === current ? "bg-primary w-6 h-3" : "bg-muted-foreground/30 w-3 h-3"}`}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────
export default function LandingPage() {
  useScrollReveal()

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
            {[
              { href: "/backtest", label: "Backtest" },
              { href: "#features", label: "Características" },
              { href: "#testimonials", label: "Testimonios" },
              { href: "#pricing", label: "Precios" },
              { href: "#brokers", label: "Brokers" },
              { href: "#vps", label: "VPS" },
              { href: "/tutoriales", label: "Tutoriales" },
            ].map((link) => (
              <Link key={link.href} href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-3">
              <a href="https://instagram.com/fxautobots" target="_blank" rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-all hover:scale-110" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://t.me/fxautobots" target="_blank" rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-all hover:scale-110" aria-label="Telegram">
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
            <ThemeToggle />
            <Button asChild className="hidden md:inline-flex btn-glow">
              <Link href="#cta">Comenzar</Link>
            </Button>
            <MobileNav links={[
              { href: "/backtest", label: "Backtest" },
              { href: "#features", label: "Caracteristicas" },
              { href: "#testimonials", label: "Testimonios" },
              { href: "#pricing", label: "Precios" },
              { href: "#brokers", label: "Brokers" },
              { href: "#vps", label: "VPS" },
              { href: "/tutoriales", label: "Tutoriales" },
              { href: "/comprar", label: "Comprar" },
            ]} />
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-muted/50 to-muted relative overflow-hidden">
        <HeroParticles />

        {/* Background orbs */}
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/4 w-56 h-56 bg-primary/3 rounded-full blur-3xl pointer-events-none" />

        <div className="container px-4 md:px-6 relative z-10">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4 reveal-left">
              <div className="flex items-center gap-3 mb-4">
                <div className="badge-pulse rounded-full">
                  <Image src="/images/fxautobots-logo.png" alt="FXAutoBots Logo" width={60} height={60} />
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">FXAutoBots</h1>
              </div>

              {/* Animated tag */}
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-2">
                <Zap className="h-3.5 w-3.5" />
                Trading automatizado para MT4
              </div>

              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
                Gana en piloto automático con nuestros Bots de Trading para MT4
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Operá sin emociones, sin errores y con disciplina constante. Nuestros bots para MT4 siguen estrategias
                probadas, con resultados consistentes y 100% automatizados. Unite a la nueva forma de hacer trading:
                automática, rentable, transparente y precisa.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button size="lg" className="font-medium btn-glow" asChild>
                  <Link href="/comprar">Compra Ahora</Link>
                </Button>
                <Button size="lg" variant="outline" className="font-medium bg-transparent btn-glow" asChild>
                  <Link href="/backtest">Ver Backtest</Link>
                </Button>
              </div>
              <div className="flex items-center gap-4 pt-2">
                <a href="https://instagram.com/fxautobots" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <Instagram className="h-4 w-4" /><span>@fxautobots</span>
                </a>
                <a href="https://t.me/fxautobots" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <MessageCircle className="h-4 w-4" /><span>@fxautobots</span>
                </a>
              </div>
            </div>

            <div className="reveal-right relative h-[350px] lg:h-[450px] rounded-2xl overflow-hidden shadow-2xl">
              <Image src="/images/akiradeusscalper.png" alt="Trading Bot Dashboard" fill className="object-cover" priority />
              {/* Overlay shimmer */}
              <div className="absolute inset-0 bg-gradient-to-tr from-background/20 to-transparent" />
              <div className="absolute bottom-4 right-4 bg-background/80 p-2 rounded-xl backdrop-blur-sm shadow-lg">
                <Image src="/images/fxautobots-logo.png" alt="FXAutoBots Logo" width={40} height={40} />
              </div>
              {/* Live indicator */}
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium shadow-lg">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Operando en vivo
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TICKER ── */}
      <TickerTape />

      {/* ── STATS ── */}
      <StatsBar />

      {/* ── FEATURES ── */}
      <section id="features" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center reveal">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Características Principales</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                Nuestros bots de trading están diseñados para maximizar tus ganancias con mínimo esfuerzo
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
            {[
              { icon: Settings, label: "Plug & Play", desc: "Solo carga los archivos .preset y empieza a operar de inmediato.", delay: "delay-100", float: "icon-float" },
              { icon: TrendingUp, label: "Probados y Optimizados", desc: "Más de 5000 horas de backtesting con resultados sólidos y consistentes.", delay: "delay-300", float: "icon-float-delay" },
              { icon: DollarSign, label: "Resultados Reales", desc: "Utilizados en cuentas reales por traders en LATAM y Europa.", delay: "delay-500", float: "icon-float-delay2" },
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

      {/* ── TESTIMONIALS ── */}
      <TestimonialCarousel />

      {/* ── PRICING ── */}
      <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center reveal">
            <div className="flex justify-center items-center gap-3 mb-4">
              <Image src="/images/fxautobots-logo.png" alt="FXAutoBots Logo" width={50} height={50} />
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Nuestros Bots de Trading</h2>
            </div>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
              Elige el bot que mejor se adapte a tu estilo de trading y objetivos de inversión
            </p>
          </div>

          {/* Bot cards */}
          <div className="mx-auto grid max-w-7xl items-start gap-6 py-12 lg:grid-cols-4 lg:gap-6">
            {/* AKIRA */}
            <div className="reveal delay-100">
              <Card className="relative overflow-hidden card-hover gradient-border h-full">
                <div className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 text-xs font-bold">AGRESIVO</div>
                <CardHeader className="pb-4">
                  <div className="relative h-48 w-full mb-4 rounded-lg overflow-hidden flex items-center justify-center bg-background/95">
                    <Image src="/images/BOTAKIRA.png" alt="Bot AKIRA" fill className="object-contain transition-transform duration-500 hover:scale-105" />
                    <div className="absolute bottom-2 right-2 bg-background/80 p-1 rounded-lg backdrop-blur-sm">
                      <Image src="/images/fxautobots-logo.png" alt="FXAutoBots Logo" width={24} height={24} />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-6 w-6 text-red-500" />
                    <CardTitle className="text-2xl">Bot AKIRA</CardTitle>
                  </div>
                  <CardDescription className="text-lg font-semibold text-primary">$120 USD</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-muted-foreground" /><span className="text-sm font-medium">Temporalidad: M5</span></div>
                    <div className="flex items-center gap-2"><Target className="h-4 w-4 text-muted-foreground" /><span className="text-sm font-medium">Pares: EURGBP, EURJPY, EURUSD, GBPUSD, USDJPY</span></div>
                  </div>
                  <p className="text-sm text-muted-foreground">Bot de alta frecuencia y rendimiento agresivo. Requiere buena gestión de riesgo y saldo mínimo de $400 USD en cuenta CENT.</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full btn-glow" asChild><Link href="/comprar">Comprar Bot AKIRA</Link></Button>
                </CardFooter>
              </Card>
            </div>

            {/* DEUS */}
            <div className="reveal delay-200">
              <Card className="relative overflow-hidden card-hover border-primary h-full">
                <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 text-xs font-bold">RECOMENDADO</div>
                <CardHeader className="pb-4">
                  <div className="relative h-48 w-full mb-4 rounded-lg overflow-hidden flex items-center justify-center bg-background/95">
                    <Image src="/images/BOTDEUS.png" alt="Bot DEUS" fill className="object-contain transition-transform duration-500 hover:scale-105" />
                    <div className="absolute bottom-2 right-2 bg-background/80 p-1 rounded-lg backdrop-blur-sm">
                      <Image src="/images/fxautobots-logo.png" alt="FXAutoBots Logo" width={24} height={24} />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-6 w-6 text-primary" />
                    <CardTitle className="text-2xl">Bot DEUS</CardTitle>
                  </div>
                  <CardDescription className="text-lg font-semibold text-primary">$120 USD</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-muted-foreground" /><span className="text-sm font-medium">Temporalidad: H1</span></div>
                    <div className="flex items-center gap-2"><Target className="h-4 w-4 text-muted-foreground" /><span className="text-sm font-medium">Pares: AUDCAD, AUDCHF, EURJPY, EURUSD, GBPJPY, GBPUSD, USDJPY, XAUUSD</span></div>
                  </div>
                  <p className="text-sm text-muted-foreground">Bot versátil y seguro para operar en múltiples pares. Ideal para cuentas desde $100 USD en cuenta CENT.</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full btn-glow" asChild><Link href="/comprar">Comprar Bot DEUS</Link></Button>
                </CardFooter>
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
                  <div className="flex items-center gap-2">
                    <Settings className="h-6 w-6 text-green-500" />
                    <CardTitle className="text-2xl">Bot SCALPER</CardTitle>
                  </div>
                  <CardDescription className="text-lg font-semibold text-primary">$120 USD</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-muted-foreground" /><span className="text-sm font-medium">Temporalidad: H1</span></div>
                    <div className="flex items-center gap-2"><Target className="h-4 w-4 text-muted-foreground" /><span className="text-sm font-medium">Pares: AUDCAD, NZDCAD, AUDNZD</span></div>
                  </div>
                  <p className="text-sm text-muted-foreground">Bot técnico, preciso y con gestión interna de stop loss y equity risk. Excelente complemento del Bot DEUS.</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full btn-glow" asChild><Link href="/comprar">Comprar Bot SCALPER</Link></Button>
                </CardFooter>
              </Card>
            </div>

            {/* ATLAS */}
            <div className="reveal delay-400">
              <Card className="relative overflow-hidden card-hover border-2 border-amber-500 h-full">
                <div className="absolute top-0 right-0 bg-amber-500 text-white px-3 py-1 text-xs font-bold">FUNDING</div>
                <div className="absolute -top-1 -left-1 bg-amber-500 text-white px-3 py-1 text-xs font-bold rounded-br-lg">PREMIUM</div>
                <CardHeader className="pb-4">
                  <div className="relative h-48 w-full mb-4 rounded-lg overflow-hidden flex items-center justify-center bg-gradient-to-br from-amber-500/10 to-amber-600/20">
                    <Image src="/images/BOTATLAS.png" alt="Bot ATLAS" fill className="object-contain transition-transform duration-500 hover:scale-105" />
                    <div className="absolute bottom-2 right-2 bg-background/80 p-1 rounded-lg backdrop-blur-sm">
                      <Image src="/images/fxautobots-logo.png" alt="FXAutoBots Logo" width={24} height={24} />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-6 w-6 text-amber-500" />
                    <CardTitle className="text-2xl">Bot ATLAS</CardTitle>
                  </div>
                  <CardDescription className="text-lg font-semibold text-amber-500">$600 USD</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-muted-foreground" /><span className="text-sm font-medium">Estrategia: Order Blocks</span></div>
                    <div className="flex items-center gap-2"><Target className="h-4 w-4 text-muted-foreground" /><span className="text-sm font-medium">Opera con: Ordenes Stop, Stop Loss y Take Profit</span></div>
                  </div>
                  <p className="text-sm text-muted-foreground">La frutillita del postre. Bot diseñado específicamente para pruebas de fondeo con rendimiento constante y riesgo controlado.</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white btn-glow" asChild>
                    <Link href="/comprar">Comprar ATLAS</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>

          {/* Comparativa */}
          <div className="mt-16 mb-8 reveal">
            <div className="flex flex-col items-center text-center mb-8">
              <h3 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">Comparativa de Bots</h3>
              <p className="max-w-[700px] text-muted-foreground mt-2">Compara las características de nuestros bots para elegir el que mejor se adapte a tus necesidades</p>
            </div>
            <div className="max-w-7xl mx-auto"><BotsComparison /></div>
          </div>

          {/* Ofertas */}
          <div className="mt-16 mb-8">
            <div className="flex flex-col items-center text-center mb-8 reveal">
              <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-3">
                <Percent className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">Ofertas Especiales</h3>
              <p className="max-w-[700px] text-muted-foreground mt-2">Aprovecha nuestros paquetes con descuento y maximiza tu potencial de trading</p>
            </div>

            <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
              {/* Pack Duo */}
              <div className="reveal delay-100">
                <Card className="relative overflow-hidden border-2 border-primary/50 card-hover h-full">
                  <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 text-xs font-bold">AHORRA $40</div>
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-2"><Package className="h-6 w-6 text-primary" /><CardTitle className="text-2xl">Pack Duo</CardTitle></div>
                    <div className="flex items-center gap-2 mt-2">
                      <CardDescription className="text-2xl font-bold text-primary">$200 USD</CardDescription>
                      <span className="text-sm line-through text-muted-foreground">$240 USD</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm">Elige 2 bots de nuestra colección y comienza a diversificar tus estrategias de trading con un descuento especial.</p>
                    <div className="bg-muted p-3 rounded-lg">
                      <ul className="space-y-2">
                        {["Elige cualquier combinación de 2 bots", "Soporte técnico prioritario", "Actualizaciones gratuitas"].map((item) => (
                          <li key={item} className="flex items-center gap-2 text-sm">
                            <Check className="h-4 w-4 text-primary shrink-0" />{item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter><Button className="w-full btn-glow" size="lg" asChild><Link href="/comprar">Comprar Pack Duo</Link></Button></CardFooter>
                </Card>
              </div>

              {/* Pack Completo */}
              <div className="reveal delay-200">
                <Card className="relative overflow-hidden border-2 border-primary card-hover h-full">
                  <div className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 text-xs font-bold">AHORRA $80</div>
                  <div className="absolute -top-1 -left-1 bg-primary text-white px-3 py-1 text-xs font-bold rounded-br-lg">MEJOR OFERTA</div>
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-2"><Package className="h-6 w-6 text-primary" /><CardTitle className="text-2xl">Pack Completo</CardTitle></div>
                    <div className="flex items-center gap-2 mt-2">
                      <CardDescription className="text-2xl font-bold text-primary">$280 USD</CardDescription>
                      <span className="text-sm line-through text-muted-foreground">$360 USD</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm">Obtén los 3 bots de nuestra colección y maximiza tus oportunidades de trading con nuestro mejor descuento.</p>
                    <div className="bg-muted p-3 rounded-lg">
                      <ul className="space-y-2">
                        {["Incluye AKIRA + DEUS + SCALPER", "Soporte técnico VIP", "Actualizaciones prioritarias", "Guía de configuración avanzada"].map((item) => (
                          <li key={item} className="flex items-center gap-2 text-sm">
                            <Check className="h-4 w-4 text-primary shrink-0" />{item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter><Button className="w-full btn-glow" size="lg" asChild><Link href="/comprar">Comprar Pack Completo</Link></Button></CardFooter>
                </Card>
              </div>

              {/* Pack Ultimate */}
              <div className="reveal delay-300">
                <Card className="relative overflow-hidden border-2 border-amber-500 card-hover h-full">
                  <div className="absolute top-0 right-0 bg-amber-500 text-white px-3 py-1 text-xs font-bold">AHORRA $210</div>
                  <div className="absolute -top-1 -left-1 bg-amber-500 text-white px-3 py-1 text-xs font-bold rounded-br-lg">PACK ULTIMATE</div>
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-2"><Package className="h-6 w-6 text-amber-500" /><CardTitle className="text-2xl">Pack Ultimate</CardTitle></div>
                    <div className="flex items-center gap-2 mt-2">
                      <CardDescription className="text-2xl font-bold text-amber-500">$850 USD</CardDescription>
                      <span className="text-sm line-through text-muted-foreground">$1.060 USD</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm">El paquete definitivo. Incluye todos nuestros bots más el exclusivo Bot ATLAS para dominar cualquier mercado.</p>
                    <div className="bg-muted p-3 rounded-lg">
                      <ul className="space-y-2">
                        {["AKIRA + DEUS + SCALPER + ATLAS", "Soporte técnico VIP de por vida", "Acceso anticipado a nuevos bots", "Configuración personalizada incluida"].map((item) => (
                          <li key={item} className="flex items-center gap-2 text-sm">
                            <Check className="h-4 w-4 text-amber-500 shrink-0" />{item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter><Button className="w-full bg-amber-500 hover:bg-amber-600 text-white btn-glow" size="lg" asChild><Link href="/comprar">Comprar Pack Ultimate</Link></Button></CardFooter>
                </Card>
              </div>
            </div>
          </div>

          {/* Calculadora */}
          <div className="mt-16 mb-8 reveal">
            <div className="flex flex-col items-center text-center mb-8">
              <h3 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">Calcula tu Rentabilidad</h3>
              <p className="max-w-[700px] text-muted-foreground mt-2">Estima tus potenciales ganancias según tu capital y nivel de riesgo</p>
            </div>
            <div className="max-w-xl mx-auto"><ProfitCalculator /></div>
          </div>
        </div>
      </section>

      {/* ── VPS ── */}
      <div className="reveal"><RecommendedVPS /></div>

      {/* ── BROKERS ── */}
      <section id="brokers" className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
        <div className="reveal"><RecommendedBrokers /></div>
      </section>

      {/* ── CTA ── */}
      <section id="cta" className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
        {/* Animated background orbs */}
        <div className="cta-bg-orb absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary rounded-full blur-[120px] pointer-events-none" />

        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center justify-center space-y-4 text-center reveal">
            <div className="badge-pulse mb-4">
              <Image src="/images/fxautobots-logo.png" alt="FXAutoBots Logo" width={80} height={80} />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">¿Listo para automatizar tus ganancias?</h2>
              <p className="max-w-[600px] mx-auto text-muted-foreground md:text-xl/relaxed">Únete a cientos de traders que ya están generando ingresos consistentes con nuestros bots</p>
            </div>
            <Button size="lg" className="font-medium text-lg group btn-glow mt-4" asChild>
              <Link href="/comprar">
                Obtener nuestros Bots
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <div className="flex items-center gap-6 mt-4">
              <a href="https://instagram.com/fxautobots" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors hover:scale-105">
                <Instagram className="h-5 w-5" /><span>@fxautobots</span>
              </a>
              <a href="https://t.me/fxautobots" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors hover:scale-105">
                <MessageCircle className="h-5 w-5" /><span>@fxautobots</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
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
              <a href="https://instagram.com/fxautobots" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-all hover:scale-110" aria-label="Instagram"><Instagram className="h-5 w-5" /></a>
              <a href="https://t.me/fxautobots" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-all hover:scale-110" aria-label="Telegram"><MessageCircle className="h-5 w-5" /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Helper icon for check marks in pack lists
function Check({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  )
}
