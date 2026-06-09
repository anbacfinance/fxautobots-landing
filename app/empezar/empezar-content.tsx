"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { MobileNav } from "@/components/mobile-nav"
import {
  Instagram,
  MessageCircle,
  ShoppingCart,
  Copy as CopyIcon,
  Tag,
  HelpCircle,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  Settings,
  BarChart3,
  Headphones,
  Compass,
  MessageSquare,
  CheckCircle2,
  Zap,
  Users,
  TrendingUp,
} from "lucide-react"

const TELEGRAM = "https://t.me/fxautobots_bot"

// ─── STYLES ────────────────────────────────────────────────────────────────
const styles = `
  /* Scroll reveal */
  .ep-reveal {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.65s cubic-bezier(0.4,0,0.2,1), transform 0.65s cubic-bezier(0.4,0,0.2,1);
  }
  .ep-reveal.visible { opacity: 1; transform: translateY(0); }
  .ep-d1 { transition-delay: 0.08s; }
  .ep-d2 { transition-delay: 0.16s; }
  .ep-d3 { transition-delay: 0.24s; }
  .ep-d4 { transition-delay: 0.32s; }

  /* Ticker */
  @keyframes ep-scroll {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  .ep-ticker-track { animation: ep-scroll 22s linear infinite; }
  .ep-ticker-track:hover { animation-play-state: paused; }

  /* Orbs */
  @keyframes ep-float {
    0%,100% { transform: translate(0,0) scale(1); }
    50%      { transform: translate(10px,-14px) scale(1.06); }
  }
  .ep-orb   { animation: ep-float 10s ease-in-out infinite; }
  .ep-orb-b { animation: ep-float 13s ease-in-out 2s infinite; }

  /* Canvas */
  #ep-canvas { position:absolute; inset:0; pointer-events:none; }

  /* Option cards */
  .ep-option {
    cursor: pointer;
    transition: all 0.25s cubic-bezier(0.4,0,0.2,1);
    border: 2px solid transparent;
  }
  .ep-option:hover {
    transform: translateY(-4px);
    border-color: hsl(var(--primary) / 0.5);
    box-shadow: 0 16px 40px hsl(var(--primary) / 0.15);
  }
  .ep-option.selected {
    border-color: hsl(var(--primary));
    background: hsl(var(--primary) / 0.07);
    box-shadow: 0 0 0 1px hsl(var(--primary) / 0.3), 0 12px 32px hsl(var(--primary) / 0.18);
  }

  /* CTA button */
  .ep-btn {
    position: relative;
    overflow: hidden;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .ep-btn::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 60%);
    pointer-events: none;
  }
  .ep-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 32px hsl(var(--primary) / 0.35); }
  .ep-btn:active { transform: translateY(0); }

  /* Steps connector */
  .ep-step-line {
    position: absolute;
    top: 28px; left: calc(50% + 36px);
    width: calc(100% - 72px);
    height: 2px;
    background: linear-gradient(90deg, hsl(var(--primary) / 0.4), hsl(var(--primary) / 0.1));
  }

  /* FAQ */
  .ep-faq-body {
    overflow: hidden;
    transition: max-height 0.38s cubic-bezier(0.4,0,0.2,1), opacity 0.28s ease;
  }
  .ep-faq-body.open   { max-height: 200px; opacity: 1; }
  .ep-faq-body.closed { max-height: 0; opacity: 0; }

  /* Nav underline */
  .ep-nav { position: relative; }
  .ep-nav::after {
    content: ''; position: absolute; bottom: -2px; left: 0;
    width: 0; height: 2px; background: hsl(var(--primary));
    transition: width 0.3s ease;
  }
  .ep-nav:hover::after { width: 100%; }

  /* Gradient text */
  .ep-gradient-text {
    background: linear-gradient(135deg, hsl(var(--primary)), #a78bfa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* Glow ring */
  .ep-glow {
    box-shadow: 0 0 0 1px hsl(var(--primary) / 0.25), 0 0 24px hsl(var(--primary) / 0.15);
  }

  /* Pill badge */
  .ep-pill {
    background: linear-gradient(135deg, hsl(var(--primary) / 0.15), hsl(var(--primary) / 0.05));
    border: 1px solid hsl(var(--primary) / 0.3);
  }

  /* Benefit row */
  .ep-benefit { transition: background 0.2s, border-color 0.2s; }
  .ep-benefit:hover { background: hsl(var(--primary) / 0.05); border-color: hsl(var(--primary) / 0.3); }
`

// ─── SCROLL REVEAL ─────────────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible") }),
      { threshold: 0.07, rootMargin: "0px 0px -24px 0px" }
    )
    document.querySelectorAll(".ep-reveal").forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

// ─── PARTICLES ──────────────────────────────────────────────────────────────
function HeroParticles() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current; if (!c) return
    const ctx = c.getContext("2d"); if (!ctx) return
    let id: number
    const pts: {x:number;y:number;vx:number;vy:number;r:number;a:number}[] = []
    const resize = () => { c.width = c.offsetWidth; c.height = c.offsetHeight }
    resize(); window.addEventListener("resize", resize)
    for (let i = 0; i < 48; i++)
      pts.push({ x: Math.random()*c.width, y: Math.random()*c.height,
        vx: (Math.random()-.5)*.35, vy: (Math.random()-.5)*.35,
        r: Math.random()*1.8+.4, a: Math.random()*.35+.08 })
    const draw = () => {
      ctx.clearRect(0,0,c.width,c.height)
      pts.forEach(p => {
        p.x+=p.vx; p.y+=p.vy
        if(p.x<0)p.x=c.width; if(p.x>c.width)p.x=0
        if(p.y<0)p.y=c.height; if(p.y>c.height)p.y=0
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2)
        ctx.fillStyle=`rgba(99,102,241,${p.a})`; ctx.fill()
      })
      pts.forEach((a,i) => pts.slice(i+1).forEach(b => {
        const d = Math.hypot(a.x-b.x,a.y-b.y)
        if(d<90){ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y)
          ctx.strokeStyle=`rgba(99,102,241,${.08*(1-d/90)})`;ctx.lineWidth=.5;ctx.stroke()}
      }))
      id=requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(id); window.removeEventListener("resize",resize) }
  }, [])
  return <canvas ref={ref} id="ep-canvas" style={{opacity:.4}} />
}

// ─── TICKER ─────────────────────────────────────────────────────────────────
function Ticker() {
  const items = [
    "🤖 Bots para MetaTrader 4",
    "📊 Backtests disponibles",
    "🛡️ Gestión de riesgo incluida",
    "⚡ Instalación guiada",
    "🤝 Soporte paso a paso",
    "🔁 Copytrading disponible",
    "🌎 Traders en LATAM y Europa",
    "✅ Ideal para empezar",
  ]
  return (
    <div className="w-full overflow-hidden bg-primary/5 border-b border-primary/10 py-2">
      <div className="ep-ticker-track flex gap-8 whitespace-nowrap w-max">
        {[...items,...items].map((t,i) => (
          <span key={i} className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
            {t} <span className="text-primary/30 mx-1">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── FAQ ────────────────────────────────────────────────────────────────────
function Faq({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-xl border border-border/60 bg-card overflow-hidden transition-colors hover:border-primary/30">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left">
        <span className="font-medium text-sm">{q}</span>
        <ChevronDown className={`h-4 w-4 text-muted-foreground flex-shrink-0 transition-transform duration-300 ${open?"rotate-180":""}`} />
      </button>
      <div className={`ep-faq-body ${open?"open":"closed"}`}>
        <p className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed">{a}</p>
      </div>
    </div>
  )
}

// ─── DATA ───────────────────────────────────────────────────────────────────
const OPTIONS = [
  {
    id: "bot",
    icon: ShoppingCart,
    emoji: "🤖",
    title: "Quiero un bot para MT4",
    sub: "Automatizá tu operativa con reglas claras.",
  },
  {
    id: "copy",
    icon: CopyIcon,
    emoji: "🔁",
    title: "Me interesa el copytrading",
    sub: "Seguí una estrategia sin instalar nada.",
  },
  {
    id: "price",
    icon: Tag,
    emoji: "💰",
    title: "Quiero ver precios",
    sub: "Conocé las opciones según tu capital.",
  },
  {
    id: "help",
    icon: HelpCircle,
    emoji: "🙋",
    title: "No sé por dónde empezar",
    sub: "Te orientamos paso a paso, sin presión.",
  },
]

const STEPS = [
  { n:"1", icon: MessageSquare, title:"Nos escribís", body:"Contanos qué buscás o preguntá lo que quieras sin compromiso." },
  { n:"2", icon: Compass,       title:"Analizamos tu perfil", body:"Capital, experiencia y nivel de riesgo: elegimos juntos." },
  { n:"3", icon: CheckCircle2,  title:"Empezás informado", body:"Te explicamos todo antes de que tomes cualquier decisión." },
]

const BENEFITS = [
  { icon: ShoppingCart, label: "Bots para MetaTrader 4" },
  { icon: Settings,     label: "Instalación guiada incluida" },
  { icon: ShieldCheck,  label: "Configuración según tu riesgo" },
  { icon: BarChart3,    label: "Backtests y métricas visibles" },
  { icon: Headphones,   label: "Soporte paso a paso" },
  { icon: Compass,      label: "Orientación personalizada" },
]

const FAQS = [
  { q: "¿Los bots funcionan en MT4?", a: "Sí, nuestras soluciones están diseñadas específicamente para MetaTrader 4." },
  { q: "¿Necesito saber de trading para empezar?", a: "No es obligatorio, pero sí es importante entender que el trading tiene riesgo. Por eso te orientamos antes de cualquier recomendación." },
  { q: "¿Puedo empezar con poco capital?", a: "Sí. Tenemos opciones pensadas para cuentas cent desde montos accesibles. Te decimos cuál se adapta mejor a tu situación." },
  { q: "¿Garantizan ganancias?", a: "No. Ningún sistema puede garantizar ganancias. Los resultados dependen del mercado, la configuración y el riesgo asignado." },
  { q: "¿Qué es el copytrading?", a: "Es una alternativa donde seguís operaciones de otra cuenta automáticamente, sin necesidad de instalar un bot propio." },
]

const NAV = [
  { href:"/",           label:"Inicio" },
  { href:"/comprar",    label:"Comprar Bots" },
  { href:"/copytrading",label:"Copytrading" },
  { href:"/tutoriales", label:"Tutoriales" },
]

// ─── PAGE ────────────────────────────────────────────────────────────────────
export function EmpezarContent() {
  useScrollReveal()
  const [selected, setSelected] = useState<string | null>(null)

  const handleOption = (id: string) => {
    setSelected(id)
    setTimeout(() => {
      window.open(TELEGRAM, "_blank", "noopener,noreferrer")
    }, 180)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      {/* HEADER */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="transition-transform duration-300 group-hover:rotate-12">
              <Image src="/images/fxautobots_bot-logo.png" alt="fxautobots_bot" width={36} height={36} />
            </div>
            <span className="font-bold text-lg hidden md:inline">fxautobots_bot</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            {NAV.map(l => (
              <Link key={l.href} href={l.href} className="text-sm font-medium hover:text-primary ep-nav transition-colors">{l.label}</Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2">
              <a href="https://instagram.com/fxautobots_bot" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-all hover:scale-110"><Instagram className="h-4 w-4" /></a>
              <a href={TELEGRAM} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-all hover:scale-110"><MessageCircle className="h-4 w-4" /></a>
            </div>
            <ThemeToggle />
            <Button asChild size="sm" className="hidden md:inline-flex ep-btn">
              <a href={TELEGRAM} target="_blank" rel="noopener noreferrer">Consultar gratis</a>
            </Button>
            <MobileNav links={NAV} />
          </div>
        </div>
      </header>

      <Ticker />

      <main className="flex-1">

        {/* ══ HERO ══════════════════════════════════════════════════════════ */}
        <section className="relative w-full overflow-hidden py-20 md:py-32">
          <HeroParticles />
          {/* Orbs */}
          <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-primary/20 blur-3xl ep-orb" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl ep-orb-b" />

          <div className="container relative">
            <div className="max-w-3xl mx-auto text-center space-y-6">

              {/* Badge */}
              <div className="ep-reveal inline-flex items-center gap-2 ep-pill rounded-full px-4 py-1.5">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-semibold text-primary tracking-wide uppercase">Ideal para principiantes y avanzados</span>
              </div>

              {/* Headline */}
              <h1 className="ep-reveal ep-d1 text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08]">
                Automatizá tu trading<br />
                <span className="ep-gradient-text">sin complicaciones</span>
              </h1>

              {/* Sub */}
              <p className="ep-reveal ep-d2 text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed">
                Bots para MT4, copytrading y soporte real.<br className="hidden md:block" />
                Te guiamos desde cero.
              </p>

              {/* CTAs */}
              <div className="ep-reveal ep-d3 flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <Button asChild size="lg" className="ep-btn text-base h-12 px-8">
                  <a href={TELEGRAM} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Hablar con fxautobots_bot
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-base h-12 px-8 border-primary/30 hover:border-primary hover:bg-primary/5"
                  onClick={() => document.getElementById("que-busco")?.scrollIntoView({ behavior:"smooth" })}
                >
                  Ver opciones
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              {/* Trust strip */}
              <div className="ep-reveal ep-d4 flex flex-wrap justify-center gap-4 pt-4">
                {[
                  { icon: Users, text: "Traders activos en LATAM" },
                  { icon: Zap,   text: "Instalación guiada" },
                  { icon: TrendingUp, text: "+5000h de backtesting" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Icon className="h-3.5 w-3.5 text-primary" />
                    {text}
                  </div>
                ))}
              </div>

              {/* Disclaimer */}
              <p className="ep-reveal text-xs text-muted-foreground/60 pt-1">
                El trading implica riesgo. No prometemos ganancias ni resultados garantizados.
              </p>

            </div>
          </div>
        </section>

        {/* ══ PRINCIPIANTES BANNER ══════════════════════════════════════════ */}
        <section className="w-full py-8 bg-primary/5 border-y border-primary/10">
          <div className="container">
            <div className="ep-reveal flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
              <div className="w-12 h-12 rounded-2xl bg-primary/15 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">🙋</span>
              </div>
              <div>
                <p className="font-semibold text-foreground">¿Recién empezás y no sabés qué elegir?</p>
                <p className="text-sm text-muted-foreground">Está bien. Te orientamos según tu situación sin que tengas que saber todo de antemano.</p>
              </div>
              <Button asChild variant="outline" size="sm" className="flex-shrink-0 border-primary/30 hover:border-primary ep-btn">
                <a href={TELEGRAM} target="_blank" rel="noopener noreferrer">Necesito ayuda para elegir</a>
              </Button>
            </div>
          </div>
        </section>

        {/* ══ ¿QUÉ ESTÁS BUSCANDO? ══════════════════════════════════════════ */}
        <section id="que-busco" className="w-full py-16 md:py-24">
          <div className="container">
            <div className="ep-reveal text-center mb-10 max-w-xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">¿Qué estás buscando?</h2>
              <p className="mt-2 text-muted-foreground text-sm">Tocá la opción que más se acerque a tu caso y te contactamos.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {OPTIONS.map((opt, i) => (
                <button
                  key={opt.id}
                  onClick={() => handleOption(opt.id)}
                  className={`ep-reveal ep-d${i+1} ep-option rounded-2xl bg-card border border-border/60 p-5 text-left flex flex-col gap-3`}
                >
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-xl">
                    {opt.emoji}
                  </div>
                  <div>
                    <p className="font-semibold text-sm leading-tight">{opt.title}</p>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{opt.sub}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-primary font-medium mt-auto">
                    Consultar <ArrowRight className="h-3 w-3" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ══ CÓMO FUNCIONA ══════════════════════════════════════════════════ */}
        <section className="w-full py-16 md:py-24 bg-muted/30">
          <div className="container">
            <div className="ep-reveal text-center mb-12 max-w-xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Así de simple es empezar</h2>
              <p className="mt-2 text-muted-foreground text-sm">Tres pasos. Sin presión. Sin obligación.</p>
            </div>
            <div className="relative grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {/* Connectors (desktop only) */}
              <div className="hidden md:block absolute top-7 left-[calc(33%+8px)] w-[calc(34%-16px)] h-px bg-gradient-to-r from-primary/40 to-primary/10" />
              <div className="hidden md:block absolute top-7 left-[calc(66%+8px)] w-[calc(34%-16px)] h-px bg-gradient-to-r from-primary/20 to-transparent" />

              {STEPS.map((s, i) => (
                <div key={s.n} className={`ep-reveal ep-d${i+1} flex flex-col items-center text-center p-6 rounded-2xl bg-card border border-border/60 ep-glow relative`}>
                  <div className="relative mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <s.icon className="h-6 w-6 text-primary" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                      {s.n}
                    </span>
                  </div>
                  <h3 className="font-semibold mb-1.5">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ BENEFICIOS ════════════════════════════════════════════════════ */}
        <section className="w-full py-16 md:py-24">
          <div className="container">
            <div className="ep-reveal text-center mb-10 max-w-xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Todo lo que incluye fxautobots_bot</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl mx-auto">
              {BENEFITS.map((b, i) => (
                <div key={b.label} className={`ep-reveal ep-d${(i%3)+1} ep-benefit flex items-center gap-3 rounded-xl border border-border/60 bg-card px-4 py-3.5`}>
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium">{b.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ RIESGO / CONFIANZA ════════════════════════════════════════════ */}
        <section className="w-full py-12 md:py-16 bg-muted/30">
          <div className="container">
            <div className="ep-reveal max-w-2xl mx-auto rounded-2xl border border-primary/20 bg-card p-7 md:p-10 text-center ep-glow">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Automatización con responsabilidad</h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-lg mx-auto">
                Un bot ejecuta una estrategia con reglas definidas. No elimina el riesgo ni garantiza resultados. 
                Te lo decimos claramente porque creemos en la transparencia.
              </p>
              <p className="mt-4 text-xs text-muted-foreground/60 ep-pill inline-block rounded-lg px-3 py-1.5">
                Los resultados pasados no garantizan resultados futuros.
              </p>
            </div>
          </div>
        </section>

        {/* ══ FAQ ═══════════════════════════════════════════════════════════ */}
        <section className="w-full py-16 md:py-24">
          <div className="container">
            <div className="ep-reveal text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Preguntas frecuentes</h2>
              <p className="mt-2 text-muted-foreground text-sm">Si tu duda no está acá, escribinos por Telegram.</p>
            </div>
            <div className="max-w-2xl mx-auto flex flex-col gap-2">
              {FAQS.map((f, i) => (
                <div key={f.q} className={`ep-reveal ep-d${(i%3)+1}`}>
                  <Faq q={f.q} a={f.a} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ CTA FINAL ═════════════════════════════════════════════════════ */}
        <section className="w-full py-16 md:py-24">
          <div className="container">
            <div className="ep-reveal relative overflow-hidden rounded-3xl bg-primary px-6 py-14 md:py-20 text-center">
              <div className="pointer-events-none absolute -top-20 -left-20 h-64 w-64 rounded-full bg-white/10 blur-3xl ep-orb" />
              <div className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-white/10 blur-3xl ep-orb-b" />
              <div className="relative max-w-xl mx-auto">
                <p className="text-primary-foreground/70 text-sm font-medium uppercase tracking-widest mb-3">Sin compromiso · Gratis</p>
                <h2 className="text-3xl md:text-5xl font-extrabold text-primary-foreground leading-tight text-balance">
                  ¿Querés saber<br />cuál es tu mejor opción?
                </h2>
                <p className="mt-4 text-primary-foreground/75 text-base max-w-md mx-auto">
                  Escribinos y te orientamos según tu capital, experiencia y perfil de riesgo. Gratis y sin presión.
                </p>
                <Button asChild size="lg" variant="secondary" className="mt-8 ep-btn text-base h-12 px-8">
                  <a href={TELEGRAM} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Hablar con fxautobots_bot
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="w-full border-t py-6">
        <div className="container text-center">
          <p className="text-xs text-muted-foreground">
            fxautobots_bot — Bots de trading para MT4. El trading implica riesgo. No se garantizan ganancias.
          </p>
        </div>
      </footer>

      {/* BURBUJA FLOTANTE */}
      <a href={TELEGRAM} target="_blank" rel="noopener noreferrer" className="fixed bottom-5 right-5 z-50">
        <div className="relative">
          <div className="flex items-center gap-2 bg-[#0088cc] hover:bg-[#006fa3] text-white px-4 py-3 rounded-full shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_28px_rgba(0,136,204,0.45)]">
            <MessageCircle className="h-5 w-5" />
            <span className="text-sm font-semibold">Consultar gratis</span>
          </div>
          <div className="absolute inset-0 rounded-full bg-[#0088cc]/40 animate-ping" />
        </div>
      </a>

    </div>
  )
}
