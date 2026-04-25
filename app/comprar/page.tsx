"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import { MobileNav } from "@/components/mobile-nav"
import { Instagram, MessageCircle, Copy, Check, ExternalLink, ChevronLeft, ChevronRight, Package } from "lucide-react"
import { useState, useEffect, useRef, useCallback } from "react"
import { QRCodeSVG } from "qrcode.react"

const bots = [
  { name: "Bot Akira", price: 120, description: "Trading automatizado" },
  { name: "Bot Deus", price: 120, description: "Trading automatizado" },
  { name: "Bot Scalper", price: 120, description: "Trading automatizado" },
  { name: "Bot Atlas", price: 600, description: "Trading premium" },
]

const packs = [
  {
    name: "Pack Duo",
    price: 200,
    originalPrice: 240,
    savings: 40,
    bots: ["Akira o Deus", "Scalper"],
    badge: "AHORRA $40",
    badgeColor: "bg-green-500",
  },
  {
    name: "Pack Completo",
    price: 280,
    originalPrice: 360,
    savings: 80,
    bots: ["Akira", "Deus", "Scalper"],
    badge: "MEJOR OFERTA",
    badgeColor: "bg-primary",
  },
  {
    name: "Pack Ultimate",
    price: 850,
    originalPrice: 1060,
    savings: 210,
    bots: ["Akira", "Deus", "Scalper", "Atlas"],
    badge: "PACK ULTIMATE",
    badgeColor: "bg-amber-500",
  },
]

const wallets = {
  usdt: [
    { network: "TRC20 (Tron)", address: "TQYdX5MWMaMr4jxb37V25WyvjXQ7DLCoY6", icon: "🔴" },
    { network: "BEP20 (BSC)", address: "0x4aa985333c25c0911088392dbd886558344fd6d3", icon: "🟡" },
  ],
  usdc: [
    { network: "BEP20 (BSC)", address: "0x4aa985333c25c0911088392dbd886558344fd6d3", icon: "🟡" },
  ],
  btc: [
    { network: "Bitcoin", address: "12BA8zHb7o1hga3SmX63sjvMrw23e3SFPa", icon: "🟠" },
  ],
  eth: [
    { network: "Ethereum", address: "0x4aa985333c25c0911088392dbd886558344fd6d3", icon: "🔵" },
  ],
}

function WalletCard({ crypto, network, address }: { crypto: string; network: string; address: string }) {
  const [copied, setCopied] = useState(false)
  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(address)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg"><span>{network}</span></CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <div className="bg-white p-3 rounded-lg">
          <QRCodeSVG value={address} size={140} level="H" includeMargin={false} />
        </div>
        <div className="w-full">
          <div className="flex items-center gap-2 bg-muted p-2 rounded-lg">
            <code className="text-xs flex-1 break-all font-mono">{address}</code>
            <Button variant="ghost" size="icon" className="shrink-0 h-8 w-8" onClick={copyToClipboard}>
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function PricingCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [heights, setHeights] = useState<number[]>([0, 0])
  const slideRefs = useRef<(HTMLDivElement | null)[]>([null, null])
  const autoplayRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const minSwipeDistance = 50

  // Medir cada slide de forma independiente con ResizeObserver
  // Los slides están en un flex-row con overflow hidden, por lo que
  // aunque el slide 1 esté "fuera de pantalla" sigue teniendo su layout
  // correcto y podemos leer su offsetHeight.
  const measureSlides = useCallback(() => {
    const measured = slideRefs.current.map((el) => {
      if (!el) return 0
      // Forzamos que el elemento reporte su altura real aunque esté desplazado
      return el.offsetHeight
    })
    setHeights(measured)
  }, [])

  useEffect(() => {
    // Primer render
    measureSlides()

    // ResizeObserver en cada slide para detectar cambios de altura
    const observers: ResizeObserver[] = []
    slideRefs.current.forEach((el) => {
      if (!el) return
      const ro = new ResizeObserver(measureSlides)
      ro.observe(el)
      observers.push(ro)
    })

    return () => observers.forEach((ro) => ro.disconnect())
  }, [measureSlides])

  // Autoplay 3s por slide
  useEffect(() => {
    autoplayRef.current = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % 2)
    }, 3000)
    return () => { if (autoplayRef.current) clearTimeout(autoplayRef.current) }
  }, [currentSlide])

  const goTo = (index: number) => {
    if (autoplayRef.current) clearTimeout(autoplayRef.current)
    setCurrentSlide(index)
  }

  const onTouchStart = (e: React.TouchEvent) => { setTouchEnd(null); setTouchStart(e.targetTouches[0].clientX) }
  const onTouchMove  = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX)
  const onTouchEnd   = () => {
    if (!touchStart || !touchEnd) return
    const d = touchStart - touchEnd
    if (d >  minSwipeDistance) goTo((currentSlide + 1) % 2)
    if (d < -minSwipeDistance) goTo((currentSlide - 1 + 2) % 2)
  }

  const activeHeight = heights[currentSlide] || "auto"

  return (
    <div className="relative">
      {/* Flechas desktop */}
      <button onClick={() => goTo((currentSlide - 1 + 2) % 2)} className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-10 p-2 rounded-full bg-background border shadow-md hover:bg-muted transition-colors" aria-label="Anterior">
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button onClick={() => goTo((currentSlide + 1) % 2)} className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-10 p-2 rounded-full bg-background border shadow-md hover:bg-muted transition-colors" aria-label="Siguiente">
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Wrapper con altura animada exacta al slide activo */}
      <div
        className="overflow-hidden"
        style={{
          height: activeHeight ? `${activeHeight}px` : "auto",
          transition: "height 500ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Track: los dos slides lado a lado */}
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentSlide * 50}%)`,
            width: "200%",
          }}
        >
          {/* Slide 0 — Bots individuales */}
          <div
            className="px-4 pb-2"
            style={{ width: "50%" }}
            ref={(el) => { slideRefs.current[0] = el }}
          >
            <h3 className="text-xl font-semibold text-center mb-6">Bots Individuales</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {bots.map((bot) => (
                <Card key={bot.name} className="text-center">
                  <CardHeader className="pb-2"><CardTitle className="text-lg">{bot.name}</CardTitle></CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-primary">${bot.price}</p>
                    <p className="text-sm text-muted-foreground">USD</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Slide 1 — Packs */}
          <div
            className="px-4 pb-2"
            style={{ width: "50%" }}
            ref={(el) => { slideRefs.current[1] = el }}
          >
            <h3 className="text-xl font-semibold text-center mb-6">Packs con Descuento</h3>
            <div className="flex flex-col md:flex-row md:justify-center gap-4 max-w-5xl mx-auto">
              {packs.map((pack) => (
                <Card key={pack.name} className="text-center relative overflow-hidden md:flex-1 md:max-w-xs">
                  <div className={`absolute top-0 right-0 ${pack.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-bl-lg`}>{pack.badge}</div>
                  <CardHeader className="pb-2 pt-8">
                    <div className="flex items-center justify-center gap-2">
                      <Package className={`h-5 w-5 ${pack.name === "Pack Ultimate" ? "text-amber-500" : "text-primary"}`} />
                      <CardTitle className="text-xl">{pack.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className={`text-3xl font-bold ${pack.name === "Pack Ultimate" ? "text-amber-500" : "text-primary"}`}>${pack.price}</p>
                      <p className="text-sm text-muted-foreground line-through">${pack.originalPrice} USD</p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p className="font-medium mb-1">Incluye:</p>
                      {pack.bots.map((b, i) => <p key={i}>{b}</p>)}
                    </div>
                    <p className="text-green-500 text-sm font-semibold">Ahorras ${pack.savings} USD</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-muted-foreground mt-4 md:hidden">Desliza para ver mas opciones</p>

      {/* Barras de progreso autoplay */}
      <div className="flex justify-center gap-3 mt-5">
        {[0, 1].map((i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="relative h-1.5 rounded-full overflow-hidden bg-muted-foreground/20"
            style={{ width: "64px" }}
            aria-label={i === 0 ? "Ver bots individuales" : "Ver packs"}
          >
            <span
              className="absolute inset-y-0 left-0 rounded-full bg-primary"
              style={{
                width: currentSlide === i ? "100%" : "0%",
                transition: currentSlide === i ? "width 3000ms linear" : "none",
              }}
            />
          </button>
        ))}
      </div>

      {/* Labels */}
      <div className="flex justify-center gap-8 mt-3 text-sm text-muted-foreground">
        <button onClick={() => goTo(0)} className={`transition-colors ${currentSlide === 0 ? "text-primary font-medium" : ""}`}>Individuales</button>
        <button onClick={() => goTo(1)} className={`transition-colors ${currentSlide === 1 ? "text-primary font-medium" : ""}`}>Packs</button>
      </div>
    </div>
  )
}

// ─── SPLASH + BURBUJA ─────────────────────────────────────────────────────

type Phase = "splash" | "shrinking" | "tooltip" | "idle"

function TelegramBubble() {
  const [phase, setPhase]             = useState<Phase>("splash")
  const [tooltipOpen, setTooltipOpen] = useState(false)
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("shrinking"), 2000)
    const t2 = setTimeout(() => { setPhase("tooltip"); setTooltipOpen(true) }, 2400)
    const t3 = setTimeout(() => { setPhase("idle");    setTooltipOpen(false) }, 17400)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  useEffect(() => () => { if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current) }, [])

  const handleMouseEnter = () => {
    if (phase === "splash" || phase === "shrinking") return
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current)
    setTooltipOpen(true)
  }
  const handleMouseLeave = () => {
    if (phase === "splash" || phase === "shrinking") return
    hoverTimerRef.current = setTimeout(() => setTooltipOpen(false), 15000)
  }

  return (
    <>
      <style>{`
        @keyframes tg-ring1 {
          0%   { transform: scale(1);   opacity: 0.55; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        @keyframes tg-ring2 {
          0%   { transform: scale(1);   opacity: 0.35; }
          100% { transform: scale(3.2); opacity: 0; }
        }
        @keyframes tg-fadein {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .tg-overlay {
          position: fixed; z-index: 9999;
          background-color: #0088cc;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden;
          inset: 0; border-radius: 0px; opacity: 1;
          transition:
            top 400ms cubic-bezier(0.4,0,0.2,1),
            left 400ms cubic-bezier(0.4,0,0.2,1),
            right 400ms cubic-bezier(0.4,0,0.2,1),
            bottom 400ms cubic-bezier(0.4,0,0.2,1),
            width 400ms cubic-bezier(0.4,0,0.2,1),
            height 400ms cubic-bezier(0.4,0,0.2,1),
            border-radius 400ms cubic-bezier(0.4,0,0.2,1),
            opacity 300ms ease 100ms;
        }
        .tg-overlay.shrinking {
          inset: auto; bottom: 1.5rem; right: 1.5rem; left: auto; top: auto;
          width: 130px; height: 44px; border-radius: 9999px; opacity: 0;
        }
      `}</style>

      {(phase === "splash" || phase === "shrinking") && (
        <div className={`tg-overlay${phase === "shrinking" ? " shrinking" : ""}`}>
          <div style={{
            display:"flex", flexDirection:"column", alignItems:"center",
            gap:"1.75rem", color:"white", textAlign:"center", padding:"2rem",
            opacity: phase === "splash" ? 1 : 0,
            transition: "opacity 200ms ease",
            animation: phase === "splash" ? "tg-fadein 500ms ease forwards" : "none",
            pointerEvents: "none",
          }}>
            <div style={{ position:"relative", width:"88px", height:"88px" }}>
              <div style={{ position:"absolute", inset:0, borderRadius:"9999px", backgroundColor:"rgba(255,255,255,0.22)", animation:"tg-ring1 1.6s ease-out infinite" }} />
              <div style={{ position:"absolute", inset:0, borderRadius:"9999px", backgroundColor:"rgba(255,255,255,0.12)", animation:"tg-ring2 1.6s ease-out infinite", animationDelay:"0.4s" }} />
              <div style={{ position:"relative", zIndex:1, width:"88px", height:"88px", borderRadius:"9999px", backgroundColor:"rgba(255,255,255,0.28)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <MessageCircle style={{ width:"44px", height:"44px", color:"white" }} />
              </div>
            </div>
            <div>
              <p style={{ fontSize:"1.8rem", fontWeight:700, marginBottom:"0.6rem", letterSpacing:"-0.025em" }}>Asesoramiento incluido</p>
              <p style={{ fontSize:"1.05rem", opacity:0.88, maxWidth:"420px", lineHeight:1.65 }}>
                Una vez abonado, envianos el comprobante y te daremos acceso, asesoramiento y configuracion completa.
              </p>
            </div>
          </div>
        </div>
      )}

      <a href="https://t.me/fxautobots" target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-50" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <div className="relative">
          <div className={`absolute bottom-full right-0 mb-3 w-72 transition-all duration-500 ease-in-out ${tooltipOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-2 pointer-events-none"}`}>
            <div className="bg-card border border-border rounded-2xl p-4 shadow-2xl">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">Asesoramiento incluido</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">Una vez abonado, envianos el comprobante y te daremos acceso, asesoramiento y configuracion completa.</p>
                </div>
              </div>
              <div className="absolute -bottom-2 right-8 w-4 h-4 bg-card border-r border-b border-border transform rotate-45" />
            </div>
          </div>
          <div className="flex items-center gap-2 bg-[#0088cc] hover:bg-[#006699] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <MessageCircle className="h-5 w-5" />
            <span className="text-sm font-medium">Contactar</span>
          </div>
          <div className="absolute inset-0 rounded-full bg-[#0088cc] animate-ping opacity-20" />
        </div>
      </a>
    </>
  )
}

// ─── PÁGINA ───────────────────────────────────────────────────────────────

export default function ComprarPage() {
  return (
    <div className="flex min-h-screen flex-col">

      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center">
              <Image src="/images/fxautobots-logo.png" alt="FXAutoBots Logo" width={40} height={40} className="md:mr-2" />
              <span className="font-bold text-xl hidden md:inline">FXAutoBots</span>
            </Link>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium hover:text-primary">Inicio</Link>
            <Link href="/backtest" className="text-sm font-medium hover:text-primary">Backtest</Link>
            <Link href="/tutoriales" className="text-sm font-medium hover:text-primary">Tutoriales</Link>
          </nav>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-3">
              <a href="https://instagram.com/fxautobots" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram"><Instagram className="h-5 w-5" /></a>
              <a href="https://t.me/fxautobots" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Telegram"><MessageCircle className="h-5 w-5" /></a>
            </div>
            <ThemeToggle />
            <MobileNav links={[{ href: "/", label: "Inicio" }, { href: "/backtest", label: "Backtest" }, { href: "/tutoriales", label: "Tutoriales" }]} />
          </div>
        </div>
      </header>

      <main className="flex-1">

        <section className="w-full py-12 md:py-16 bg-gradient-to-b from-muted/50 to-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Comprar Bot de Trading</h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">Realiza tu pago en criptomonedas y comienza a operar de forma automatizada</p>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl text-center mb-8">Precios</h2>
            <PricingCarousel />
          </div>
        </section>

        <section className="w-full py-12 md:py-16 bg-muted">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl text-center mb-8">Wallets de Pago</h2>

            <div className="mb-12">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="h-8 w-8 rounded-full bg-[#26A17B] flex items-center justify-center"><span className="text-white font-bold text-sm">$</span></div>
                <h3 className="text-xl font-bold">USDT (Tether)</h3>
                <span className="px-2 py-1 bg-green-500/20 text-green-600 dark:text-green-400 text-xs font-medium rounded">Recomendado</span>
              </div>
              <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                {wallets.usdt.map((w) => <WalletCard key={w.network} crypto="USDT" network={w.network} address={w.address} />)}
              </div>
            </div>

            <div className="mb-12">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="h-8 w-8 rounded-full bg-[#2775CA] flex items-center justify-center"><span className="text-white font-bold text-sm">$</span></div>
                <h3 className="text-xl font-bold">USDC</h3>
              </div>
              <div className="grid md:grid-cols-1 gap-4 max-w-md mx-auto">
                {wallets.usdc.map((w) => <WalletCard key={w.network} crypto="USDC" network={w.network} address={w.address} />)}
              </div>
            </div>

            <div className="mb-12">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="h-8 w-8 rounded-full bg-[#F7931A] flex items-center justify-center"><span className="text-white font-bold text-sm">B</span></div>
                <h3 className="text-xl font-bold">Bitcoin (BTC)</h3>
              </div>
              <div className="grid md:grid-cols-1 gap-4 max-w-md mx-auto">
                {wallets.btc.map((w) => <WalletCard key={w.network} crypto="BTC" network={w.network} address={w.address} />)}
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="h-8 w-8 rounded-full bg-[#627EEA] flex items-center justify-center"><span className="text-white font-bold text-sm">E</span></div>
                <h3 className="text-xl font-bold">Ethereum (ETH)</h3>
              </div>
              <div className="grid md:grid-cols-1 gap-4 max-w-md mx-auto">
                {wallets.eth.map((w) => <WalletCard key={w.network} crypto="ETH" network={w.network} address={w.address} />)}
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <Card className="max-w-2xl mx-auto border-primary/20 bg-primary/5">
              <CardContent className="flex flex-col items-center text-center p-8 gap-6">
                <div className="h-16 w-16 rounded-full bg-[#0088cc] flex items-center justify-center">
                  <MessageCircle className="h-8 w-8 text-white" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Confirma tu pago</h3>
                  <p className="text-muted-foreground max-w-md">Una vez realizado el pago, envia el comprobante a nuestro Telegram y te asesoraremos cuanto antes</p>
                </div>
                <Button size="lg" asChild className="gap-2">
                  <a href="https://t.me/fxautobots" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-5 w-5" />
                    Contactar por Telegram
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex items-center gap-2">
            <Image src="/images/fxautobots-logo.png" alt="FXAutoBots Logo" width={24} height={24} />
            <p className="text-center text-sm leading-loose md:text-left">&copy; {new Date().getFullYear()} FXAutoBots. Todos los derechos reservados.</p>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://instagram.com/fxautobots" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram"><Instagram className="h-5 w-5" /></a>
            <a href="https://t.me/fxautobots" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Telegram"><MessageCircle className="h-5 w-5" /></a>
          </div>
        </div>
      </footer>

      <TelegramBubble />
    </div>
  )
}
