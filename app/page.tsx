"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Settings, TrendingUp, DollarSign, ChevronRight, Clock,
  BarChart3, Target, Package, Percent, Instagram, MessageCircle,
  Shield, Zap, Users, Award, Copy, ArrowRight, ChevronLeft,
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

  @keyframes orange-pulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(249,115,22,0.4); }
    50%       { box-shadow: 0 0 0 10px rgba(249,115,22,0); }
  }
  .orange-pulse { animation: orange-pulse 2.5s ease-in-out infinite; }

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

  /* Hero carousel slide transition */
  .hero-slide {
    transition: opacity 0.8s cubic-bezier(0.4,0,0.2,1), transform 0.8s cubic-bezier(0.4,0,0.2,1);
  }
  .hero-slide-enter { opacity: 0; transform: translateX(40px); }
  .hero-slide-active { opacity: 1; transform: translateX(0); }
  .hero-slide-exit { opacity: 0; transform: translateX(-40px); }

  /* Progress bar for hero carousel */
  @keyframes hero-progress {
    from { width: 0%; }
    to   { width: 100%; }
  }
  .hero-progress-bar {
    animation: hero-progress 10s linear forwards;
  }
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
function TickerTape() {
  const items = [
    "🤖 Bots 100% Automatizados", "📈 +5000h de Backtesting",
    "🌎 Traders en LATAM & Europa", "⚡ Plug & Play para MT4",
    "🔒 Gestión de Riesgo Integrada", "💰 Resultados Consistentes",
    "🛡️ Soporte VIP incluido", "📊 Opera 24/5 sin descanso",
    "🟠 Copy Trading disponible", "💹 Deus Copy +26% · Akira Copy +76%",
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

// ─── STATS BAR ────────────────────────────────────────────────────────────
function StatsBar() {
  const stats = [
    { icon: Users,      label: "Traders activos",   value: 82,    suffix: "+" },
    { icon: TrendingUp, label: "Horas de backtest",  value: 5000,  suffix: "h" },
    { icon: Award,      label: "Tasa de éxito",      value: 76,    suffix: "%" },
    { icon: Zap,        label: "Operaciones auto",   value: 12000, suffix: "+" },
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
                className={`rounded-full transition-all duration-300 ${i === current ? "bg-primary w-6 h-3" : "bg-muted-foreground/30 w-3 h-3"}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── HERO CAROUSEL ────────────────────────────────────────────────────────
function HeroCarousel() {
  const [slide, setSlide] = useState(0)       // 0 = bots, 1 = copytrading
  const [visible, setVisible] = useState(true) // controla fade
  const [progressKey, setProgressKey] = useState(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const goTo = (next: number) => {
    setVisible(false)
    setTimeout(() => {
      setSlide(next)
      setProgressKey((k) => k + 1)
      setVisible(true)
    }, 600)
  }

  // Auto-avance cada 10s
  useEffect(() => {
    timerRef.current = setTimeout(() => goTo((slide + 1) % 2), 10000)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [slide])

  const particleColor = slide === 0 ? "99,102,241" : "249,115,22"

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden"
      style={{ background: slide === 0
        ? "linear-gradient(to bottom, hsl(var(--muted) / 0.5), hsl(var(--muted)))"
        : "linear-gradient(to bottom, rgba(249,115,22,0.08), rgba(239,68,68,0.05))" }}
    >
      <HeroParticles color={particleColor} />

      {/* Orbs */}
      <div className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full blur-3xl pointer-events-none transition-colors duration-1000"
        style={{ background: slide === 0 ? "hsl(var(--primary) / 0.05)" : "rgba(249,115,22,0.08)" }} />
      <div className="absolute bottom-1/4 left-1/4 w-56 h-56 rounded-full blur-3xl pointer-events-none transition-colors duration-1000"
        style={{ background: slide === 0 ? "hsl(var(--primary) / 0.03)" : "rgba(239,68,68,0.06)" }} />

      <div className="container px-4 md:px-6 relative z-10">

        {/* Contenido con fade */}
        <div style={{ opacity: visible ? 1 : 0, transition: "opacity 0.6s cubic-bezier(0.4,0,0.2,1)" }}>
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">

            {/* ── SLIDE 0: BOTS ── */}
            {slide === 0 && (
              <>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="badge-pulse rounded-full">
                      <Image src="/images/fxautobots-logo.png" alt="FXAutoBots Logo" width={60} height={60} />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">FXAutoBots</h1>
                  </div>
                  <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                    <Zap className="h-3.5 w-3.5" />
                    Trading automatizado para MT4
                  </div>
                  <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
                    Gana en piloto automático con nuestros Bots de Trading para MT4
                  </h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Operá sin emociones, sin errores y con disciplina constante. Nuestros bots siguen estrategias
                    probadas, con resultados consistentes y 100% automatizados.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <Button size="lg" className="font-medium btn-glow" asChild>
                      <Link href="/comprar">Comprar Ahora</Link>
                    </Button>
                    <Button size="lg" variant="outline" className="font-medium bg-transparent btn-glow" asChild>
                      <Link href="/backtest">Ver Backtest</Link>
                    </Button>
                  </div>
                  <div className="flex items-center gap-4 pt-2">
                    <a href="https://instagram.com/botsdetrading.latam" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
                      <Instagram className="h-4 w-4" /><span>@botsdetrading.latam</span>
                    </a>
                    <a href="https://t.me/fxautobots" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
                      <MessageCircle className="h-4 w-4" /><span>@fxautobots</span>
                    </a>
                  </div>
                </div>
                <div className="relative h-[350px] lg:h-[450px] rounded-2xl overflow-hidden shadow-2xl">
                  <Image src="/images/akiradeusscalper.png" alt="Trading Bot Dashboard" fill className="object-cover" priority />
                  <div className="absolute inset-0 bg-gradient-to-tr from-background/20 to-transparent" />
                  <div className="absolute bottom-4 right-4 bg-background/80 p-2 rounded-xl backdrop-blur-sm shadow-lg">
                    <Image src="/images/fxautobots-logo.png" alt="FXAutoBots Logo" width={40} height={40} />
                  </div>
                  <div className="absolute top-4 left-4 flex items-center gap-2 bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    Operando en vivo
                  </div>
                </div>
              </>
            )}

            {/* ── SLIDE 1: COPY TRADING ── */}
            {slide === 1 && (
              <>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="orange-pulse rounded-full">
                      <Image src="/images/brokers/hfm-logo.jpeg" alt="HFM Logo" width={60} height={60} className="rounded-xl" />
                    </div>
                    <div>
                      <div className="inline-flex items-center gap-1.5 bg-orange-500/10 text-orange-500 px-2.5 py-0.5 rounded-full text-xs font-semibold mb-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        Powered by HFM
                      </div>
                      <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">Copy Trading</h1>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 bg-orange-500/10 text-orange-500 px-3 py-1 rounded-full text-sm font-medium">
                    <Copy className="h-3.5 w-3.5" />
                    Copia nuestras operaciones automáticamente
                  </div>
                  <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
                    Copia Nuestras Estrategias Ganadoras sin experiencia
                  </h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Replica automáticamente nuestras operaciones en tu cuenta. Deus Copy <span className="text-green-500 font-semibold">+26%</span> · Akira Copy <span className="text-orange-500 font-semibold">+76%</span>. Desde solo <span className="text-orange-500 font-bold">$30 USD</span>.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <Button size="lg" className="font-medium btn-glow bg-orange-500 hover:bg-orange-600 text-white" asChild>
                      <Link href="/copytrading">
                        Ver Copy Trading <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button size="lg" variant="outline" className="font-medium bg-transparent border-orange-500/40 hover:border-orange-500 btn-glow" asChild>
                      <a href="https://register.hfm.com/sv/en/new-live-account/?refid=364904" target="_blank" rel="noopener noreferrer">
                        Registrarse en HFM
                      </a>
                    </Button>
                  </div>
                  {/* Mini stats */}
                  <div className="flex gap-4 pt-2">
                    {[
                      { label: "Deus Copy", value: "+26%", color: "text-green-500" },
                      { label: "Akira Copy", value: "+76%", color: "text-orange-500" },
                      { label: "Desde", value: "$30 USD", color: "text-primary" },
                    ].map((s) => (
                      <div key={s.label} className="text-center px-3 py-2 rounded-xl bg-background/60 border border-orange-500/15 backdrop-blur-sm">
                        <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
                        <p className="text-xs text-muted-foreground">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Visual lado derecho */}
                <div className="relative h-[350px] lg:h-[450px] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-orange-500/10 to-red-500/5 border border-orange-500/20 flex items-center justify-center">
                  {/* Tarjetas de estrategia */}
                  <div className="w-full px-6 space-y-4">
                    {[
                      { name: "Deus Copy", profit: "+26%", dd: "2.88%", min: "$30", color: "emerald", badge: "Conservador" },
                      { name: "Akira Copy", profit: "+76%", dd: "6.47%", min: "$50", color: "orange", badge: "Rentable" },
                    ].map((s) => (
                      <div key={s.name} className="bg-background/80 backdrop-blur-sm rounded-2xl p-4 border border-orange-500/15 shadow-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${s.color === "emerald" ? "bg-emerald-500/20 text-emerald-500" : "bg-orange-500/20 text-orange-500"}`}>{s.badge}</span>
                            <p className="font-bold text-lg mt-1">{s.name}</p>
                          </div>
                          <Copy className="h-5 w-5 text-orange-400" />
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div className="bg-muted/50 rounded-lg p-2">
                            <p className={`font-bold text-sm ${s.color === "emerald" ? "text-emerald-500" : "text-orange-500"}`}>{s.profit}</p>
                            <p className="text-xs text-muted-foreground">Profit</p>
                          </div>
                          <div className="bg-muted/50 rounded-lg p-2">
                            <p className="font-bold text-sm text-orange-400">{s.dd}</p>
                            <p className="text-xs text-muted-foreground">Max DD</p>
                          </div>
                          <div className="bg-muted/50 rounded-lg p-2">
                            <p className="font-bold text-sm">{s.min}</p>
                            <p className="text-xs text-muted-foreground">Mínimo</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Badge HFM */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    HFM Copy activo
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* ── CONTROLES DEL CARRUSEL ── */}
        <div className="flex items-center justify-center gap-4 mt-10">
          {/* Botón anterior */}
          <button onClick={() => goTo((slide - 1 + 2) % 2)} className="p-2 rounded-full border bg-background/70 hover:bg-muted transition-colors backdrop-blur-sm">
            <ChevronLeft className="h-4 w-4" />
          </button>

          {/* Indicadores con barra de progreso */}
          <div className="flex gap-3 items-center">
            {[0, 1].map((i) => (
              <button key={i} onClick={() => goTo(i)} className="flex flex-col items-center gap-1">
                <span className="text-xs text-muted-foreground font-medium">{i === 0 ? "Bots MT4" : "Copy Trading"}</span>
                <div className="w-20 h-1 rounded-full bg-muted-foreground/20 overflow-hidden">
                  {i === slide && (
                    <div key={progressKey} className="h-full rounded-full hero-progress-bar"
                      style={{ background: slide === 0 ? "hsl(var(--primary))" : "#f97316" }} />
                  )}
                  {i !== slide && <div className="h-full w-0" />}
                </div>
              </button>
            ))}
          </div>

          {/* Botón siguiente */}
          <button onClick={() => goTo((slide + 1) % 2)} className="p-2 rounded-full border bg-background/70 hover:bg-muted transition-colors backdrop-blur-sm">
            <ChevronRight className="h-4 w-4" />
          </button>
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
              { href: "/backtest",     label: "Backtest" },
              { href: "#features",     label: "Características" },
              { href: "#testimonials", label: "Testimonios" },
              { href: "#pricing",      label: "Precios" },
              { href: "#brokers",      label: "Brokers" },
              { href: "#vps",          label: "VPS" },
              { href: "/tutoriales",   label: "Tutoriales" },
            ].map((link) => (
              <Link key={link.href} href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group">
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
            {/* Copy Trading con estilo especial */}
            <Link href="/copytrading"
              className="text-sm font-semibold text-orange-500 hover:text-orange-600 transition-colors relative group flex items-center gap-1">
              <Copy className="h-3.5 w-3.5" />
              Copy Trading
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full" />
            </Link>
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
              { href: "/backtest",     label: "Backtest" },
              { href: "#features",     label: "Caracteristicas" },
              { href: "#testimonials", label: "Testimonios" },
              { href: "#pricing",      label: "Precios" },
              { href: "#brokers",      label: "Brokers" },
              { href: "#vps",          label: "VPS" },
              { href: "/tutoriales",   label: "Tutoriales" },
              { href: "/copytrading",  label: "Copy Trading" },
              { href: "/comprar",      label: "Comprar" },
            ]} />
          </div>
        </div>
      </header>

      {/* ── HERO CAROUSEL ── */}
      <HeroCarousel />

      {/* ── TICKER ── */}
      <TickerTape />

      {/* ── STATS ── */}
      <StatsBar />

      {/* ── FEATURES ── */}
      <section id="features" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center reveal">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Características Principales</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
              Nuestros bots de trading están diseñados para maximizar tus ganancias con mínimo esfuerzo
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
            {[
              { icon: Settings,   label: "Plug & Play",             desc: "Solo carga los archivos .preset y empieza a operar de inmediato.",                           delay: "delay-100", float: "icon-float" },
              { icon: TrendingUp, label: "Probados y Optimizados",  desc: "Más de 5000 horas de backtesting con resultados sólidos y consistentes.",                   delay: "delay-300", float: "icon-float-delay" },
              { icon: DollarSign, label: "Resultados Reales",       desc: "Utilizados en cuentas reales por traders en LATAM y Europa.",                                delay: "delay-500", float: "icon-float-delay2" },
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
                  <div className="flex items-center gap-2"><BarChart3 className="h-6 w-6 text-red-500" /><CardTitle className="text-2xl">Bot AKIRA</CardTitle></div>
                  <CardDescription className="text-lg font-semibold text-primary">$120 USD</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-muted-foreground" /><span className="text-sm font-medium">Temporalidad: M5</span></div>
                    <div className="flex items-center gap-2"><Target className="h-4 w-4 text-muted-foreground" /><span className="text-sm font-medium">Pares: EURGBP, EURJPY, EURUSD, GBPUSD, USDJPY</span></div>
                  </div>
                  <p className="text-sm text-muted-foreground">Bot de alta frecuencia y rendimiento agresivo. Requiere buena gestión de riesgo y saldo mínimo de $400 USD en cuenta CENT.</p>
                </CardContent>
                <CardFooter><Button className="w-full btn-glow" asChild><Link href="/comprar">Comprar Bot AKIRA</Link></Button></CardFooter>
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
                  <div className="flex items-center gap-2"><TrendingUp className="h-6 w-6 text-primary" /><CardTitle className="text-2xl">Bot DEUS</CardTitle></div>
                  <CardDescription className="text-lg font-semibold text-primary">$120 USD</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-muted-foreground" /><span className="text-sm font-medium">Temporalidad: H1</span></div>
                    <div className="flex items-center gap-2"><Target className="h-4 w-4 text-muted-foreground" /><span className="text-sm font-medium">Pares: AUDCAD, AUDCHF, EURJPY, EURUSD, GBPJPY, GBPUSD, USDJPY, XAUUSD</span></div>
                  </div>
                  <p className="text-sm text-muted-foreground">Bot versátil y seguro para operar en múltiples pares. Ideal para cuentas desde $100 USD en cuenta CENT.</p>
                </CardContent>
                <CardFooter><Button className="w-full btn-glow" asChild><Link href="/comprar">Comprar Bot DEUS</Link></Button></CardFooter>
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
                  <p className="text-sm text-muted-foreground">Bot técnico, preciso y con gestión interna de stop loss y equity risk. Excelente complemento del Bot DEUS.</p>
                </CardContent>
                <CardFooter><Button className="w-full btn-glow" asChild><Link href="/comprar">Comprar Bot SCALPER</Link></Button></CardFooter>
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
                  <div className="flex items-center gap-2"><Shield className="h-6 w-6 text-amber-500" /><CardTitle className="text-2xl">Bot ATLAS</CardTitle></div>
                  <CardDescription className="text-lg font-semibold text-amber-500">$600 USD</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-muted-foreground" /><span className="text-sm font-medium">Estrategia: Order Blocks</span></div>
                    <div className="flex items-center gap-2"><Target className="h-4 w-4 text-muted-foreground" /><span className="text-sm font-medium">Opera con: Ordenes Stop, Stop Loss y Take Profit</span></div>
                  </div>
                  <p className="text-sm text-muted-foreground">La frutillita del postre. Bot diseñado para pruebas de fondeo con rendimiento constante y riesgo controlado.</p>
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
                    <ul className="space-y-2 bg-muted p-3 rounded-lg">
                      {["Elige cualquier combinación de 2 bots", "Soporte técnico prioritario", "Actualizaciones gratuitas"].map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm">
                          <CheckIcon className="h-4 w-4 text-primary shrink-0" />{item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter><Button className="w-full btn-glow" size="lg" asChild><Link href="/comprar">Comprar Pack Duo</Link></Button></CardFooter>
                </Card>
              </div>

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
                    <ul className="space-y-2 bg-muted p-3 rounded-lg">
                      {["Incluye AKIRA + DEUS + SCALPER", "Soporte técnico VIP", "Actualizaciones prioritarias", "Guía de configuración avanzada"].map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm">
                          <CheckIcon className="h-4 w-4 text-primary shrink-0" />{item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter><Button className="w-full btn-glow" size="lg" asChild><Link href="/comprar">Comprar Pack Completo</Link></Button></CardFooter>
                </Card>
              </div>

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
                    <ul className="space-y-2 bg-muted p-3 rounded-lg">
                      {["AKIRA + DEUS + SCALPER + ATLAS", "Soporte técnico VIP de por vida", "Acceso anticipado a nuevos bots", "Configuración personalizada incluida"].map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm">
                          <CheckIcon className="h-4 w-4 text-amber-500 shrink-0" />{item}
                        </li>
                      ))}
                    </ul>
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
        <div className="cta-bg-orb absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary rounded-full blur-[120px] pointer-events-none" />
        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center justify-center space-y-4 text-center reveal">
            <div className="badge-pulse mb-4">
              <Image src="/images/fxautobots-logo.png" alt="FXAutoBots Logo" width={80} height={80} />
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">¿Listo para automatizar tus ganancias?</h2>
            <p className="max-w-[600px] mx-auto text-muted-foreground md:text-xl/relaxed">Únete a cientos de traders que ya están generando ingresos consistentes con nuestros bots</p>
            <Button size="lg" className="font-medium text-lg group btn-glow mt-4" asChild>
              <Link href="/comprar">
                Obtener nuestros Bots
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <div className="flex items-center gap-6 mt-4">
              <a href="https://instagram.com/botsdetrading.latam" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors hover:scale-105">
                <Instagram className="h-5 w-5" /><span>@botsdetrading.latam</span>
              </a>
              <a href="https://t.me/fxautobots" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors hover:scale-105">
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
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">FXAutoBots © 2026 | Todos los derechos reservados</p>
          </div>
          <div className="flex flex-wrap justify-center md:justify-end gap-4 items-center">
            <Link href="/terminos" className="text-sm text-muted-foreground hover:text-primary transition-colors hover:underline">Términos y Condiciones</Link>
            <Link href="/privacidad" className="text-sm text-muted-foreground hover:text-primary transition-colors hover:underline">Política de privacidad</Link>
            <div className="flex items-center gap-4 ml-2">
              <a href="https://instagram.com/fxautobots" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-all hover:scale-110"><Instagram className="h-5 w-5" /></a>
              <a href="https://t.me/fxautobots" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-all hover:scale-110"><MessageCircle className="h-5 w-5" /></a>
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
