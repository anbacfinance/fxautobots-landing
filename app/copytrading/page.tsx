"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, MessageCircle, Instagram, Clock } from "lucide-react"

// ─── ESTILOS ──────────────────────────────────────────────────────────────
const styles = `
  @keyframes cs-fade-up {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .cs-in    { opacity: 0; animation: cs-fade-up 0.8s cubic-bezier(0.4,0,0.2,1) forwards; }
  .cs-d100  { animation-delay: 0.10s; }
  .cs-d200  { animation-delay: 0.20s; }
  .cs-d300  { animation-delay: 0.30s; }
  .cs-d400  { animation-delay: 0.40s; }
  .cs-d500  { animation-delay: 0.50s; }

  /* Orbes flotantes */
  @keyframes cs-orb {
    0%, 100% { transform: scale(1) translate(0, 0); opacity: 0.22; }
    33%      { transform: scale(1.12) translate(18px, -14px); opacity: 0.32; }
    66%      { transform: scale(0.94) translate(-14px, 12px); opacity: 0.18; }
  }
  .cs-orb   { animation: cs-orb 9s ease-in-out infinite; }
  .cs-orb-2 { animation: cs-orb 11s ease-in-out 2.5s infinite; }

  /* Brillo que recorre el título */
  @keyframes cs-shimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  .cs-title {
    background: linear-gradient(90deg, #ffffff 0%, #ffe7d0 42%, #ffffff 58%);
    background-size: 200% auto;
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: cs-shimmer 4s linear infinite;
  }

  /* Punto latiendo del badge */
  @keyframes cs-ping {
    0%, 100% { box-shadow: 0 0 0 0 rgba(255,255,255,0.5); }
    50%      { box-shadow: 0 0 0 8px rgba(255,255,255,0); }
  }
  .cs-dot { animation: cs-ping 2.4s ease-in-out infinite; }

  /* Botones */
  .cs-btn { transition: transform 0.2s ease, box-shadow 0.2s ease; }
  .cs-btn:hover  { transform: translateY(-2px); box-shadow: 0 12px 30px rgba(0,0,0,0.22); }
  .cs-btn:active { transform: translateY(0); }

  #cs-canvas { position: absolute; inset: 0; pointer-events: none; opacity: 0.55; }

  @media (prefers-reduced-motion: reduce) {
    .cs-in, .cs-orb, .cs-orb-2, .cs-title, .cs-dot { animation: none !important; opacity: 1 !important; }
    .cs-title { -webkit-text-fill-color: #fff; }
  }
`

// ─── PARTÍCULAS ───────────────────────────────────────────────────────────
function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let animId: number
    const particles: { x: number; y: number; vx: number; vy: number; r: number; alpha: number }[] = []
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize()
    window.addEventListener("resize", resize)

    for (let i = 0; i < 55; i++) {
      particles.push({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.45, vy: (Math.random() - 0.5) * 0.45,
        r: Math.random() * 2.2 + 0.6, alpha: Math.random() * 0.45 + 0.12,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${p.alpha})`; ctx.fill()
      })
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach((b) => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y)
          if (dist < 110) {
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(255,255,255,${0.14 * (1 - dist / 110)})`
            ctx.lineWidth = 0.6; ctx.stroke()
          }
        })
      })
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize) }
  }, [])
  return <canvas ref={canvasRef} id="cs-canvas" />
}

// ─── PÁGINA ───────────────────────────────────────────────────────────────
export default function CopyTradingPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-orange-500 via-orange-600 to-red-600">
      <style>{styles}</style>

      <Particles />

      {/* Viñeta + orbes */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.16),transparent_65%)]" />
      <div className="cs-orb   pointer-events-none absolute -top-24 -left-24 h-[420px] w-[420px] rounded-full bg-white/25 blur-[120px]" />
      <div className="cs-orb-2 pointer-events-none absolute -bottom-32 -right-24 h-[480px] w-[480px] rounded-full bg-red-900/30 blur-[140px]" />

      {/* Volver */}
      <div className="relative z-10 container px-4 pt-6 md:px-6">
        <Link
          href="/"
          className="cs-in inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al inicio
        </Link>
      </div>

      {/* Contenido */}
      <main className="relative z-10 flex min-h-[calc(100vh-88px)] flex-col items-center justify-center px-4 py-12 text-center md:px-6">
        {/* Logo */}
        <div className="cs-in cs-d100 mb-8">
          <Image
            src="/images/fxautobots-logo.png"
            alt="FXAutoBots"
            width={88}
            height={88}
            className="drop-shadow-2xl"
            priority
          />
        </div>

        {/* Badge */}
        <div className="cs-in cs-d200 mb-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-1.5 backdrop-blur-sm">
          <span className="cs-dot h-2 w-2 rounded-full bg-white" />
          <span className="text-sm font-semibold tracking-wide text-white">Copy Trading</span>
        </div>

        {/* Título */}
        <h1 className="cs-in cs-d300 cs-title max-w-4xl text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl">
          Próximamente
        </h1>

        {/* Descripción */}
        <p className="cs-in cs-d400 mt-6 max-w-xl text-lg leading-relaxed text-white/90 md:text-xl">
          Estamos preparando nuestro servicio de Copy Trading. Muy pronto vas a poder replicar
          nuestras estrategias de forma automática desde tu propia cuenta.
        </p>

        {/* Fecha / estado */}
        <div className="cs-in cs-d400 mt-6 inline-flex items-center gap-2 rounded-full bg-black/15 px-4 py-2 text-sm text-white/85 backdrop-blur-sm">
          <Clock className="h-4 w-4" />
          En desarrollo — anunciamos la fecha por nuestros canales
        </div>

        {/* CTA */}
        <div className="cs-in cs-d500 mt-10 flex flex-col gap-3 sm:flex-row">
          <Button
            size="lg"
            className="cs-btn bg-white font-semibold text-orange-600 hover:bg-white/90"
            asChild
          >
            <a href="https://t.me/fxautobots_bot" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-5 w-5" />
              Avisame cuando esté
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="cs-btn border-white/50 bg-transparent font-semibold text-white hover:bg-white/15 hover:text-white"
            asChild
          >
            <Link href="/comprar">Mientras tanto, ver los bots</Link>
          </Button>
        </div>

        {/* Redes */}
        <div className="cs-in cs-d500 mt-10 flex items-center gap-6">
          <a
            href="https://instagram.com/botsdetrading.latam"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-white/70 transition-all hover:scale-110 hover:text-white"
          >
            <Instagram className="h-5 w-5" />
          </a>
          <a
            href="https://t.me/fxautobots_bot"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Telegram"
            className="text-white/70 transition-all hover:scale-110 hover:text-white"
          >
            <MessageCircle className="h-5 w-5" />
          </a>
        </div>
      </main>

      {/* Pie */}
      <footer className="relative z-10 border-t border-white/15 px-4 py-5 text-center md:px-6">
        <p className="mx-auto max-w-3xl text-xs leading-relaxed text-white/65">
          FXAutoBots &copy; {new Date().getFullYear()} · Operar Forex y CFDs conlleva un alto riesgo de pérdida de
          capital. Esta página es un anuncio informativo: no constituye una oferta, una recomendación de inversión ni
          una promesa de rendimiento.
        </p>
      </footer>
    </div>
  )
}
