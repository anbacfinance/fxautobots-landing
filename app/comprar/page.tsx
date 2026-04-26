"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import { MobileNav } from "@/components/mobile-nav"
import {
  Instagram, MessageCircle, Copy, Check, ExternalLink,
  ChevronLeft, ChevronRight, Package, X, ChevronDown,
  ShoppingCart, RefreshCw, Sparkles, Zap
} from "lucide-react"
import { useState, useEffect, useRef, useCallback } from "react"
import { createPortal } from "react-dom"
import { QRCodeSVG } from "qrcode.react"

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────
const globalStyles = `
  .reveal {
    opacity: 0; transform: translateY(32px);
    transition: opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1);
  }
  .reveal.revealed { opacity: 1; transform: translateY(0); }
  .reveal-scale {
    opacity: 0; transform: scale(0.93);
    transition: opacity 0.6s cubic-bezier(0.4,0,0.2,1), transform 0.6s cubic-bezier(0.4,0,0.2,1);
  }
  .reveal-scale.revealed { opacity: 1; transform: scale(1); }
  .delay-100 { transition-delay: 0.1s; }
  .delay-200 { transition-delay: 0.2s; }
  .delay-300 { transition-delay: 0.3s; }

  .card-hover {
    transition: transform 0.3s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s ease;
  }
  .card-hover:hover {
    transform: translateY(-6px) scale(1.015);
    box-shadow: 0 20px 40px rgba(0,0,0,0.12);
  }

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

  #comprar-canvas {
    position: absolute; inset: 0;
    pointer-events: none; opacity: 0.4;
  }

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

  @keyframes ws-ring1 { 0%{transform:scale(1);opacity:.5} 100%{transform:scale(2.2);opacity:0} }
  @keyframes ws-ring2 { 0%{transform:scale(1);opacity:.3} 100%{transform:scale(3);opacity:0} }
  @keyframes ws-fadein { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
  .ws-overlay {
    position:fixed; inset:0; z-index:9999; background:#0088cc;
    display:flex; align-items:center; justify-content:center; overflow:hidden;
    border-radius:0px; opacity:1;
    transition:
      top 700ms cubic-bezier(.4,0,.2,1), left 700ms cubic-bezier(.4,0,.2,1),
      right 700ms cubic-bezier(.4,0,.2,1), bottom 700ms cubic-bezier(.4,0,.2,1),
      width 700ms cubic-bezier(.4,0,.2,1), height 700ms cubic-bezier(.4,0,.2,1),
      border-radius 700ms cubic-bezier(.4,0,.2,1), opacity 500ms ease 200ms;
  }
  .ws-overlay.shrinking {
    inset:auto; bottom:1.5rem; right:1.5rem; left:auto; top:auto;
    width:0px; height:0px; border-radius:9999px; opacity:0;
  }

  /* Slide fade transition */
  .slide-panel {
    transition: opacity 0.45s cubic-bezier(0.4,0,0.2,1), transform 0.45s cubic-bezier(0.4,0,0.2,1);
  }
  .slide-enter-from-right {
    opacity: 0; transform: translateX(40px);
  }
  .slide-enter-from-left {
    opacity: 0; transform: translateX(-40px);
  }
  .slide-active {
    opacity: 1; transform: translateX(0);
  }
  .slide-exit {
    opacity: 0; transform: translateX(0);
  }
`

// ─── SCROLL REVEAL ────────────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("revealed") }),
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    )
    document.querySelectorAll(".reveal, .reveal-scale")
      .forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

// ─── PARTICLES ────────────────────────────────────────────────────────────
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

    for (let i = 0; i < 55; i++) {
      particles.push({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 0.5, alpha: Math.random() * 0.5 + 0.1,
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
        ctx.fillStyle = `rgba(99,102,241,${p.alpha})`; ctx.fill()
      })
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach((b) => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y)
          if (dist < 100) {
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(99,102,241,${0.12 * (1 - dist / 100)})`
            ctx.lineWidth = 0.5; ctx.stroke()
          }
        })
      })
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize) }
  }, [])

  return <canvas ref={canvasRef} id="comprar-canvas" />
}

// ─── TICKER ───────────────────────────────────────────────────────────────
function TickerTape() {
  const items = [
    "🤖 Bots 100% Automatizados", "💳 Pagá con cripto fácil",
    "⚡ Acceso inmediato", "🔒 Pago seguro",
    "📦 Bots individuales y packs", "🛡️ Asesoramiento incluido",
    "💰 USDT · USDC · BTC · ETH", "🌎 Traders en LATAM & Europa",
  ]
  const doubled = [...items, ...items]
  return (
    <div className="w-full overflow-hidden bg-primary/5 border-b border-primary/10 py-2.5">
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

// ─── DATOS ────────────────────────────────────────────────────────────────
const bots = [
  { name: "Bot Akira",   price: 120, description: "Trading automatizado" },
  { name: "Bot Deus",    price: 120, description: "Trading automatizado" },
  { name: "Bot Scalper", price: 120, description: "Trading automatizado" },
  { name: "Bot Atlas",   price: 600, description: "Trading premium" },
]
const packs = [
  { name: "Pack Duo",      price: 200, originalPrice: 240,  savings: 40,  bots: ["Akira o Deus", "Scalper"],          badge: "AHORRA $40",   badgeColor: "bg-green-500" },
  { name: "Pack Completo", price: 280, originalPrice: 360,  savings: 80,  bots: ["Akira", "Deus", "Scalper"],         badge: "MEJOR OFERTA", badgeColor: "bg-primary" },
  { name: "Pack Ultimate", price: 850, originalPrice: 1060, savings: 210, bots: ["Akira", "Deus", "Scalper", "Atlas"], badge: "PACK ULTIMATE", badgeColor: "bg-amber-500" },
]
const allProducts = [
  { id: "akira",    name: "Bot Akira",     price: 120, type: "bot",  tag: "" },
  { id: "deus",     name: "Bot Deus",      price: 120, type: "bot",  tag: "" },
  { id: "scalper",  name: "Bot Scalper",   price: 120, type: "bot",  tag: "" },
  { id: "atlas",    name: "Bot Atlas",     price: 600, type: "bot",  tag: "Premium" },
  { id: "duo",      name: "Pack Duo",      price: 200, type: "pack", tag: "Ahorra $40" },
  { id: "completo", name: "Pack Completo", price: 280, type: "pack", tag: "Mejor oferta" },
  { id: "ultimate", name: "Pack Ultimate", price: 850, type: "pack", tag: "Ahorra $210" },
]
const wallets = {
  usdt: [
    { network: "TRC20 (Tron)", address: "TQYdX5MWMaMr4jxb37V25WyvjXQ7DLCoY6" },
    { network: "BEP20 (BSC)",  address: "0x4aa985333c25c0911088392dbd886558344fd6d3" },
  ],
  usdc: [{ network: "BEP20 (BSC)",  address: "0x4aa985333c25c0911088392dbd886558344fd6d3" }],
  btc:  [{ network: "Bitcoin",      address: "12BA8zHb7o1hga3SmX63sjvMrw23e3SFPa" }],
  eth:  [{ network: "Ethereum",     address: "0x4aa985333c25c0911088392dbd886558344fd6d3" }],
}

// ─── SPLASH ───────────────────────────────────────────────────────────────
function WelcomeSplash() {
  const [phase, setPhase] = useState<"visible" | "shrinking" | "gone">("visible")
  useEffect(() => {
    const t1 = setTimeout(() => setPhase("shrinking"), 3500)
    const t2 = setTimeout(() => setPhase("gone"), 4200)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])
  if (phase === "gone") return null
  return (
    <div className={`ws-overlay${phase === "shrinking" ? " shrinking" : ""}`}>
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"1.5rem", color:"white", textAlign:"center", padding:"2rem", maxWidth:"520px", opacity:phase==="visible"?1:0, transition:"opacity 300ms ease", animation:phase==="visible"?"ws-fadein 600ms ease forwards":"none", pointerEvents:"none" }}>
        <div style={{ position:"relative", width:"80px", height:"80px" }}>
          <div style={{ position:"absolute", inset:0, borderRadius:"9999px", backgroundColor:"rgba(255,255,255,0.2)", animation:"ws-ring1 1.8s ease-out infinite" }} />
          <div style={{ position:"absolute", inset:0, borderRadius:"9999px", backgroundColor:"rgba(255,255,255,0.1)", animation:"ws-ring2 1.8s ease-out infinite", animationDelay:"0.5s" }} />
          <div style={{ position:"relative", zIndex:1, width:"80px", height:"80px", borderRadius:"9999px", backgroundColor:"rgba(255,255,255,0.25)", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <Sparkles style={{ width:"38px", height:"38px", color:"white" }} />
          </div>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:"0.6rem" }}>
          <p style={{ fontSize:"1.7rem", fontWeight:800, letterSpacing:"-0.03em", lineHeight:1.2 }}>¡Bienvenido a nuestra tienda!</p>
          <p style={{ fontSize:"1rem", opacity:0.9, lineHeight:1.7 }}>Seguí los pasos para hacer tu compra de forma correcta.<br />Cualquier duda, ¡contactanos! Estamos para ayudarte.</p>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:"0.5rem", width:"100%", marginTop:"0.25rem" }}>
          {["1. Elegí tu bot o pack", "2. Confirmá y seleccioná cómo pagar", "3. Envianos el comprobante por Telegram"].map((step) => (
            <div key={step} style={{ display:"flex", alignItems:"center", gap:"0.6rem", backgroundColor:"rgba(255,255,255,0.12)", borderRadius:"10px", padding:"0.5rem 0.85rem", fontSize:"0.9rem", textAlign:"left" }}>
              <span style={{ opacity:0.8 }}>✓</span><span>{step}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── CRYPTO PRICES ────────────────────────────────────────────────────────
function useCryptoPrices() {
  const [prices, setPrices]           = useState<{ btc: number | null; eth: number | null }>({ btc: null, eth: null })
  const [loading, setLoading]         = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const fetchPrices = useCallback(async () => {
    try {
      setLoading(true)
      const res  = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd", { cache: "no-store" })
      const data = await res.json()
      setPrices({ btc: data.bitcoin.usd, eth: data.ethereum.usd })
      setLastUpdated(new Date())
    } catch { /* mantiene */ } finally { setLoading(false) }
  }, [])
  useEffect(() => { fetchPrices(); const iv = setInterval(fetchPrices, 60_000); return () => clearInterval(iv) }, [fetchPrices])
  return { prices, loading, lastUpdated, refresh: fetchPrices }
}

// ─── WALLET CARD ──────────────────────────────────────────────────────────
function WalletCard({ network, address, cryptoAmount, cryptoSymbol, loadingPrice }: {
  network: string; address: string; cryptoAmount?: string; cryptoSymbol?: string; loadingPrice?: boolean
}) {
  const [copied, setCopied] = useState(false)
  const copy = async () => { await navigator.clipboard.writeText(address); setCopied(true); setTimeout(() => setCopied(false), 2000) }
  return (
    <div className="rounded-xl border bg-card p-4 flex flex-col gap-3">
      <p className="text-sm font-semibold text-muted-foreground">{network}</p>
      {cryptoSymbol && (
        <div className="rounded-lg bg-primary/5 border border-primary/15 px-3 py-2 flex items-center justify-between gap-2">
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">Enviá exactamente</p>
            {loadingPrice ? <div className="h-5 w-32 bg-muted animate-pulse rounded" /> : <p className="font-bold text-primary tracking-tight">{cryptoAmount} <span className="text-sm font-semibold">{cryptoSymbol}</span></p>}
          </div>
          <div className="text-2xl">{cryptoSymbol === "BTC" ? "₿" : "Ξ"}</div>
        </div>
      )}
      <div className="bg-white rounded-lg p-2 flex justify-center">
        <QRCodeSVG value={address} size={110} level="H" includeMargin={false} />
      </div>
      <div className="flex items-center gap-2 bg-muted p-2 rounded-lg">
        <code className="text-xs flex-1 break-all font-mono">{address}</code>
        <button onClick={copy} className="shrink-0 p-1 rounded hover:bg-muted-foreground/10 transition-colors">
          {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4 text-muted-foreground" />}
        </button>
      </div>
    </div>
  )
}

// ─── MODAL ────────────────────────────────────────────────────────────────
function WalletModal({ product, onClose }: { product: typeof allProducts[0]; onClose: () => void }) {
  const [activeCrypto, setActiveCrypto] = useState<"usdt"|"usdc"|"btc"|"eth">("usdt")
  const { prices, loading: loadingPrice, lastUpdated, refresh } = useCryptoPrices()
  useEffect(() => { document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = "" } }, [])
  const btcAmount = prices.btc ? (product.price / prices.btc).toFixed(6) : null
  const ethAmount = prices.eth ? (product.price / prices.eth).toFixed(5) : null
  const cryptos = [
    { key: "usdt" as const, label: "USDT", color: "#26A17B", symbol: "$" },
    { key: "usdc" as const, label: "USDC", color: "#2775CA", symbol: "$" },
    { key: "btc"  as const, label: "BTC",  color: "#F7931A", symbol: "B" },
    { key: "eth"  as const, label: "ETH",  color: "#627EEA", symbol: "E" },
  ]
  return createPortal(
    <div className="fixed inset-0 z-[9998] flex items-end md:items-center justify-center" onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-[9998] w-full md:max-w-lg max-h-[92vh] overflow-y-auto bg-background rounded-t-3xl md:rounded-2xl shadow-2xl flex flex-col">
        <div className="sticky top-0 bg-background z-[9998] px-6 pt-5 pb-4 border-b">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Pagar</p>
              <h2 className="text-xl font-bold">{product.name}</h2>
              <p className="text-2xl font-bold text-primary mt-1">${product.price} <span className="text-sm font-normal text-muted-foreground">USD</span></p>
            </div>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-muted transition-colors mt-1"><X className="h-5 w-5" /></button>
          </div>
          <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
            {cryptos.map((c) => (
              <button key={c.key} onClick={() => setActiveCrypto(c.key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all border ${activeCrypto === c.key ? "border-primary bg-primary text-primary-foreground shadow-sm" : "border-border bg-muted/40 text-muted-foreground hover:border-primary/40"}`}
              >
                <span className="w-4 h-4 rounded-full flex items-center justify-center text-white text-[9px] font-bold" style={{ backgroundColor: c.color }}>{c.symbol}</span>
                {c.label}
                {c.key === "usdt" && <span className="text-[9px] bg-green-500/20 text-green-600 dark:text-green-400 px-1 rounded">REC</span>}
              </button>
            ))}
          </div>
          {(activeCrypto === "btc" || activeCrypto === "eth") && (
            <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
              <span>{activeCrypto === "btc" ? (prices.btc ? `1 BTC = $${prices.btc.toLocaleString()} USD` : "Cargando...") : (prices.eth ? `1 ETH = $${prices.eth.toLocaleString()} USD` : "Cargando...")}</span>
              <button onClick={refresh} className="flex items-center gap-1 hover:text-primary transition-colors">
                <RefreshCw className={`h-3 w-3 ${loadingPrice ? "animate-spin" : ""}`} />
                {lastUpdated ? `hace ${Math.floor((Date.now() - lastUpdated.getTime()) / 1000)}s` : ""}
              </button>
            </div>
          )}
        </div>
        <div className="px-6 py-4 flex flex-col gap-3">
          {wallets[activeCrypto].map((w) => (
            <WalletCard key={w.network} network={w.network} address={w.address}
              cryptoAmount={activeCrypto === "btc" ? (btcAmount ?? undefined) : activeCrypto === "eth" ? (ethAmount ?? undefined) : undefined}
              cryptoSymbol={activeCrypto === "btc" ? "BTC" : activeCrypto === "eth" ? "ETH" : undefined}
              loadingPrice={loadingPrice}
            />
          ))}
        </div>
        <div className="px-6 pb-6 pt-2">
          <div className="rounded-2xl bg-primary/5 border border-primary/15 p-4 flex flex-col gap-3">
            <p className="text-sm text-muted-foreground text-center">Una vez realizado el pago, enviá el comprobante por Telegram y te damos acceso enseguida.</p>
            <a
              href={`https://t.me/fxautobots?text=Hola!%20Acabo%20de%20realizar%20el%20pago%20de%20${encodeURIComponent(product.name)}%20($${product.price}%20USD).%20Les%20env%C3%ADo%20el%20comprobante.`}
              target="_blank" rel="noopener noreferrer"
              className="btn-glow flex items-center justify-center gap-2 bg-[#0088cc] hover:bg-[#006699] text-white px-4 py-3 rounded-xl font-medium transition-colors"
            >
              <MessageCircle className="h-5 w-5" />Enviar comprobante por Telegram<ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}

// ─── SELECTOR ─────────────────────────────────────────────────────────────
function ProductSelector({ onModalChange }: { onModalChange: (open: boolean) => void }) {
  const [selected, setSelected]         = useState<string | null>(null)
  const [open, setOpen]                 = useState(false)
  const [modalProduct, setModalProduct] = useState<typeof allProducts[0] | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const selectedProduct = allProducts.find((p) => p.id === selected)

  const openModal  = (p: typeof allProducts[0]) => { setModalProduct(p); onModalChange(true) }
  const closeModal = () => { setModalProduct(null); onModalChange(false) }

  useEffect(() => {
    const handler = (e: MouseEvent) => { if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setOpen(false) }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const bots_list  = allProducts.filter((p) => p.type === "bot")
  const packs_list = allProducts.filter((p) => p.type === "pack")

  return (
    <>
      <div className="max-w-lg mx-auto flex flex-col gap-4">
        <div className="relative" ref={dropdownRef}>
          <button onClick={() => setOpen((o) => !o)}
            className={`w-full flex items-center justify-between gap-3 px-4 py-3.5 rounded-xl border-2 bg-background text-left transition-all ${open ? "border-primary shadow-md" : "border-border hover:border-primary/40"}`}
          >
            <div className="flex items-center gap-3">
              <ShoppingCart className="h-5 w-5 text-muted-foreground shrink-0" />
              {selectedProduct ? (
                <div><p className="font-semibold leading-tight">{selectedProduct.name}</p><p className="text-sm text-primary font-bold">${selectedProduct.price} USD</p></div>
              ) : <span className="text-muted-foreground">Elegí tu bot o pack...</span>}
            </div>
            <ChevronDown className={`h-5 w-5 text-muted-foreground shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
          </button>

          {open && (
            <div className="absolute top-full left-0 right-0 mt-2 z-20 bg-background border rounded-xl shadow-xl overflow-hidden">
              <div className="px-3 pt-3 pb-1">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest px-1 mb-2">Bots individuales</p>
                {bots_list.map((p) => (
                  <button key={p.id} onClick={() => { setSelected(p.id); setOpen(false) }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-colors mb-1 ${selected === p.id ? "bg-primary/10 text-primary" : "hover:bg-muted"}`}
                  >
                    <span className="font-medium">{p.name}</span>
                    <div className="flex items-center gap-2">
                      {p.tag && <span className="text-xs bg-amber-500/10 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded-full">{p.tag}</span>}
                      <span className="font-bold text-primary">${p.price}</span>
                    </div>
                  </button>
                ))}
              </div>
              <div className="border-t mx-3" />
              <div className="px-3 pt-2 pb-3">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest px-1 mb-2">Packs con descuento</p>
                {packs_list.map((p) => (
                  <button key={p.id} onClick={() => { setSelected(p.id); setOpen(false) }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-colors mb-1 ${selected === p.id ? "bg-primary/10 text-primary" : "hover:bg-muted"}`}
                  >
                    <span className="font-medium">{p.name}</span>
                    <div className="flex items-center gap-2">
                      {p.tag && <span className="text-xs bg-green-500/10 text-green-600 dark:text-green-400 px-2 py-0.5 rounded-full">{p.tag}</span>}
                      <span className="font-bold text-primary">${p.price}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <button disabled={!selectedProduct} onClick={() => selectedProduct && openModal(selectedProduct)}
          className={`btn-glow w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-base transition-all ${selectedProduct ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md" : "bg-muted text-muted-foreground cursor-not-allowed"}`}
        >
          {selectedProduct ? <><ShoppingCart className="h-5 w-5" /> Confirmar — ${selectedProduct.price} USD</> : "Seleccioná un producto primero"}
        </button>

        {selectedProduct && (
          <p className="text-center text-xs text-muted-foreground">
            Al confirmar verás las wallets de pago para <span className="font-medium text-foreground">{selectedProduct.name}</span>
          </p>
        )}
      </div>
      {modalProduct && <WalletModal product={modalProduct} onClose={closeModal} />}
    </>
  )
}

// ─── CAROUSEL — FIXED ─────────────────────────────────────────────────────
//
// Fix del bug: en lugar de un flex-row con width:200% (que causaba que el
// slide oculto se superponiera al modal y cortara el contenido), ahora
// usamos position:relative en el wrapper y cada slide se renderiza solo
// cuando está activo, con una transición de fade + slide horizontal.
// Esto elimina completamente el problema de solapamiento.

function PricingCarousel() {
  const [current, setCurrent]     = useState(0)
  const [prev, setPrev]           = useState<number | null>(null)
  const [direction, setDirection] = useState<"left" | "right">("right")
  const [animating, setAnimating] = useState(false)
  const autoplayRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd]     = useState<number | null>(null)

  const goTo = useCallback((next: number, dir: "left" | "right" = "right") => {
    if (animating || next === current) return
    if (autoplayRef.current) clearTimeout(autoplayRef.current)
    setDirection(dir)
    setPrev(current)
    setCurrent(next)
    setAnimating(true)
    setTimeout(() => { setPrev(null); setAnimating(false) }, 460)
  }, [animating, current])

  // Autoplay
  useEffect(() => {
    autoplayRef.current = setTimeout(() => goTo((current + 1) % 2, "right"), 3000)
    return () => { if (autoplayRef.current) clearTimeout(autoplayRef.current) }
  }, [current, goTo])

  const onTouchStart = (e: React.TouchEvent) => { setTouchEnd(null); setTouchStart(e.targetTouches[0].clientX) }
  const onTouchMove  = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX)
  const onTouchEnd   = () => {
    if (!touchStart || !touchEnd) return
    const d = touchStart - touchEnd
    if (d >  50) goTo((current + 1) % 2, "right")
    if (d < -50) goTo((current - 1 + 2) % 2, "left")
  }

  // Slide content
  const slides = [
    // Slide 0: Bots individuales
    <div key="bots" className="w-full px-4 pb-2">
      <h3 className="text-xl font-semibold text-center mb-6">Bots Individuales</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {bots.map((bot) => (
          <Card key={bot.name} className="text-center card-hover">
            <CardHeader className="pb-3 pt-8">
              <CardTitle className="text-xl">{bot.name}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">{bot.description}</p>
            </CardHeader>
            <CardContent className="pb-8">
              <p className="text-4xl font-bold text-primary">${bot.price}</p>
              <p className="text-sm text-muted-foreground mt-1">USD</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>,

    // Slide 1: Packs
    <div key="packs" className="w-full px-4 pb-2">
      <h3 className="text-xl font-semibold text-center mb-6">Packs con Descuento</h3>
      <div className="flex flex-col md:flex-row md:justify-center gap-4 max-w-5xl mx-auto">
        {packs.map((pack) => (
          <Card key={pack.name} className="text-center relative overflow-hidden md:flex-1 md:max-w-xs card-hover">
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
    </div>,
  ]

  return (
    <div onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
      {/* Flechas desktop */}
      <div className="relative">
        <button onClick={() => goTo((current - 1 + 2) % 2, "left")} className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-10 p-2 rounded-full bg-background border shadow-md hover:bg-muted transition-colors" aria-label="Anterior">
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button onClick={() => goTo((current + 1) % 2, "right")} className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-10 p-2 rounded-full bg-background border shadow-md hover:bg-muted transition-colors" aria-label="Siguiente">
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Slide activo — sin overflow hidden, sin posición absoluta */}
        <div
          className="slide-panel slide-active"
          style={{
            opacity: animating ? 0 : 1,
            transform: animating
              ? direction === "right" ? "translateX(-20px)" : "translateX(20px)"
              : "translateX(0)",
          }}
        >
          {slides[current]}
        </div>
      </div>

      <p className="text-center text-xs text-muted-foreground mt-4 md:hidden">Desliza para ver mas opciones</p>

      {/* Barras de progreso */}
      <div className="flex justify-center gap-3 mt-5">
        {[0, 1].map((i) => (
          <button key={i} onClick={() => goTo(i, i > current ? "right" : "left")} className="relative h-1.5 rounded-full overflow-hidden bg-muted-foreground/20" style={{ width: "64px" }}>
            <span className="absolute inset-y-0 left-0 rounded-full bg-primary" style={{ width: current === i ? "100%" : "0%", transition: current === i ? "width 3000ms linear" : "none" }} />
          </button>
        ))}
      </div>

      <div className="flex justify-center gap-8 mt-3 text-sm text-muted-foreground">
        <button onClick={() => goTo(0, "left")} className={`transition-colors ${current === 0 ? "text-primary font-medium" : ""}`}>Individuales</button>
        <button onClick={() => goTo(1, "right")} className={`transition-colors ${current === 1 ? "text-primary font-medium" : ""}`}>Packs</button>
      </div>
    </div>
  )
}

// ─── BURBUJA TELEGRAM ─────────────────────────────────────────────────────
function TelegramBubble({ hidden }: { hidden: boolean }) {
  const [tooltipOpen, setTooltipOpen] = useState(false)
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => () => { if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current) }, [])
  useEffect(() => { if (hidden) { setTooltipOpen(false); if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current) } }, [hidden])

  return (
    <a
      href="https://t.me/fxautobots" target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => { if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current); setTooltipOpen(true) }}
      onMouseLeave={() => { hoverTimerRef.current = setTimeout(() => setTooltipOpen(false), 15000) }}
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${hidden ? "opacity-0 pointer-events-none translate-y-4" : "opacity-100 translate-y-0"}`}
    >
      <div className="relative">
        <div className={`absolute bottom-full right-0 mb-3 w-72 transition-all duration-500 ease-in-out ${tooltipOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-2 pointer-events-none"}`}>
          <div className="bg-card border border-border rounded-2xl p-4 shadow-2xl">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0"><MessageCircle className="h-5 w-5 text-primary" /></div>
              <div>
                <p className="text-sm font-medium text-foreground mb-1">Asesoramiento incluido</p>
                <p className="text-xs text-muted-foreground leading-relaxed">Una vez abonado, envianos el comprobante y te daremos acceso, asesoramiento y configuracion completa.</p>
              </div>
            </div>
            <div className="absolute -bottom-2 right-8 w-4 h-4 bg-card border-r border-b border-border transform rotate-45" />
          </div>
        </div>
        <div className="btn-glow flex items-center gap-2 bg-[#0088cc] hover:bg-[#006699] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <MessageCircle className="h-5 w-5" /><span className="text-sm font-medium">Contactar</span>
        </div>
        <div className="absolute inset-0 rounded-full bg-[#0088cc] animate-ping opacity-20" />
      </div>
    </a>
  )
}

// ─── PÁGINA ───────────────────────────────────────────────────────────────
export default function ComprarPage() {
  const [modalOpen, setModalOpen] = useState(false)
  useScrollReveal()

  return (
    <div className="flex min-h-screen flex-col">
      <style>{globalStyles}</style>
      <WelcomeSplash />

      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center group">
            <div className="transition-transform duration-300 group-hover:rotate-12">
              <Image src="/images/fxautobots-logo.png" alt="FXAutoBots Logo" width={40} height={40} className="md:mr-2" />
            </div>
            <span className="font-bold text-xl hidden md:inline">FXAutoBots</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            {[{ href:"/", label:"Inicio" }, { href:"/backtest", label:"Backtest" }, { href:"/tutoriales", label:"Tutoriales" }].map((link) => (
              <Link key={link.href} href={link.href} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group">
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-3">
              <a href="https://instagram.com/fxautobots" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-all hover:scale-110" aria-label="Instagram"><Instagram className="h-5 w-5" /></a>
              <a href="https://t.me/fxautobots" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-all hover:scale-110" aria-label="Telegram"><MessageCircle className="h-5 w-5" /></a>
            </div>
            <ThemeToggle />
            <MobileNav links={[{ href:"/", label:"Inicio" }, { href:"/backtest", label:"Backtest" }, { href:"/tutoriales", label:"Tutoriales" }]} />
          </div>
        </div>
      </header>

      <TickerTape />

      <main className="flex-1">

        {/* Hero con partículas */}
        <section className="w-full py-12 md:py-16 bg-gradient-to-b from-muted/50 to-muted relative">
          <HeroParticles />
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-primary/3 rounded-full blur-3xl pointer-events-none" />
          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center text-center space-y-4 reveal">
              <div className="badge-pulse rounded-full mb-2">
                <Image src="/images/fxautobots-logo.png" alt="FXAutoBots Logo" width={64} height={64} />
              </div>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                <Zap className="h-3.5 w-3.5" />Tienda oficial FXAutoBots
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Comprar Bot de Trading</h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">Realizá tu pago en criptomonedas y comenzá a operar de forma automatizada</p>
            </div>
          </div>
        </section>

        {/* Selector */}
        <section className="w-full py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-8 reveal">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">¿Qué querés comprar?</h2>
              <p className="text-muted-foreground mt-2">Elegí tu bot o pack y te mostramos cómo pagar</p>
            </div>
            <div className="reveal delay-200">
              <ProductSelector onModalChange={setModalOpen} />
            </div>
          </div>
        </section>

        {/* Carousel */}
        <section className="w-full py-12 md:py-16 bg-muted">
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/4 rounded-full blur-3xl pointer-events-none opacity-0" />
          <div className="container px-4 md:px-6 relative">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl text-center mb-8 reveal">Precios</h2>
            <div className="reveal delay-200">
              <PricingCarousel />
            </div>
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
            <a href="https://instagram.com/fxautobots" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-all hover:scale-110" aria-label="Instagram"><Instagram className="h-5 w-5" /></a>
            <a href="https://t.me/fxautobots" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-all hover:scale-110" aria-label="Telegram"><MessageCircle className="h-5 w-5" /></a>
          </div>
        </div>
      </footer>

      <TelegramBubble hidden={modalOpen} />
    </div>
  )
}
