"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import { MobileNav } from "@/components/mobile-nav"
import {
  Instagram, MessageCircle, Copy, Check, ExternalLink,
  ChevronLeft, ChevronRight, Package, X, ChevronDown,
  ShoppingCart, RefreshCw, Sparkles
} from "lucide-react"
import { useState, useEffect, useRef, useCallback } from "react"
import { QRCodeSVG } from "qrcode.react"

// ─── DATOS ────────────────────────────────────────────────────────────────

const bots = [
  { name: "Bot Akira",   price: 120, description: "Trading automatizado" },
  { name: "Bot Deus",    price: 120, description: "Trading automatizado" },
  { name: "Bot Scalper", price: 120, description: "Trading automatizado" },
  { name: "Bot Atlas",   price: 600, description: "Trading premium" },
]

const packs = [
  {
    name: "Pack Duo",
    price: 200, originalPrice: 240, savings: 40,
    bots: ["Akira o Deus", "Scalper"],
    badge: "AHORRA $40", badgeColor: "bg-green-500",
  },
  {
    name: "Pack Completo",
    price: 280, originalPrice: 360, savings: 80,
    bots: ["Akira", "Deus", "Scalper"],
    badge: "MEJOR OFERTA", badgeColor: "bg-primary",
  },
  {
    name: "Pack Ultimate",
    price: 850, originalPrice: 1060, savings: 210,
    bots: ["Akira", "Deus", "Scalper", "Atlas"],
    badge: "PACK ULTIMATE", badgeColor: "bg-amber-500",
  },
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

// ─── SPLASH DE BIENVENIDA ─────────────────────────────────────────────────

function WelcomeSplash() {
  const [phase, setPhase] = useState<"visible" | "shrinking" | "gone">("visible")

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("shrinking"), 3500)
    const t2 = setTimeout(() => setPhase("gone"), 4200)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  if (phase === "gone") return null

  return (
    <>
      <style>{`
        @keyframes ws-ring1 { 0%{transform:scale(1);opacity:.5} 100%{transform:scale(2.2);opacity:0} }
        @keyframes ws-ring2 { 0%{transform:scale(1);opacity:.3} 100%{transform:scale(3);opacity:0} }
        @keyframes ws-fadein { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes ws-dots { 0%,80%,100%{transform:scale(0);opacity:0} 40%{transform:scale(1);opacity:1} }
        .ws-overlay {
          position:fixed; inset:0; z-index:9999; background:#0088cc;
          display:flex; align-items:center; justify-content:center; overflow:hidden;
          border-radius:0px; opacity:1;
          transition:
            top 700ms cubic-bezier(.4,0,.2,1),
            left 700ms cubic-bezier(.4,0,.2,1),
            right 700ms cubic-bezier(.4,0,.2,1),
            bottom 700ms cubic-bezier(.4,0,.2,1),
            width 700ms cubic-bezier(.4,0,.2,1),
            height 700ms cubic-bezier(.4,0,.2,1),
            border-radius 700ms cubic-bezier(.4,0,.2,1),
            opacity 500ms ease 200ms;
        }
        .ws-overlay.shrinking {
          inset:auto; bottom:1.5rem; right:1.5rem; left:auto; top:auto;
          width:0px; height:0px; border-radius:9999px; opacity:0;
        }
      `}</style>

      <div className={`ws-overlay${phase === "shrinking" ? " shrinking" : ""}`}>
        <div style={{
          display:"flex", flexDirection:"column", alignItems:"center",
          gap:"1.5rem", color:"white", textAlign:"center", padding:"2rem",
          maxWidth:"520px",
          opacity: phase === "visible" ? 1 : 0,
          transition: "opacity 300ms ease",
          animation: phase === "visible" ? "ws-fadein 600ms ease forwards" : "none",
          pointerEvents: "none",
        }}>
          {/* Ícono con rings */}
          <div style={{ position:"relative", width:"80px", height:"80px" }}>
            <div style={{ position:"absolute", inset:0, borderRadius:"9999px", backgroundColor:"rgba(255,255,255,0.2)", animation:"ws-ring1 1.8s ease-out infinite" }} />
            <div style={{ position:"absolute", inset:0, borderRadius:"9999px", backgroundColor:"rgba(255,255,255,0.1)", animation:"ws-ring2 1.8s ease-out infinite", animationDelay:"0.5s" }} />
            <div style={{ position:"relative", zIndex:1, width:"80px", height:"80px", borderRadius:"9999px", backgroundColor:"rgba(255,255,255,0.25)", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <Sparkles style={{ width:"38px", height:"38px", color:"white" }} />
            </div>
          </div>

          {/* Texto */}
          <div style={{ display:"flex", flexDirection:"column", gap:"0.6rem" }}>
            <p style={{ fontSize:"1.7rem", fontWeight:800, letterSpacing:"-0.03em", lineHeight:1.2 }}>
              ¡Bienvenido a nuestra tienda!
            </p>
            <p style={{ fontSize:"1rem", opacity:0.9, lineHeight:1.7 }}>
              Seguí los pasos para hacer tu compra de forma correcta.<br />
              Cualquier duda, ¡contactanos! Estamos para ayudarte.
            </p>
          </div>

          {/* Pasos rápidos */}
          <div style={{ display:"flex", flexDirection:"column", gap:"0.5rem", width:"100%", marginTop:"0.25rem" }}>
            {[
              "1. Elegí tu bot o pack",
              "2. Confirmá y seleccioná cómo pagar",
              "3. Envianos el comprobante por Telegram",
            ].map((step) => (
              <div key={step} style={{ display:"flex", alignItems:"center", gap:"0.6rem", backgroundColor:"rgba(255,255,255,0.12)", borderRadius:"10px", padding:"0.5rem 0.85rem", fontSize:"0.9rem", textAlign:"left" }}>
                <span style={{ opacity:0.8 }}>✓</span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

// ─── HOOK: PRECIO EN TIEMPO REAL BTC / ETH ────────────────────────────────

function useCryptoPrices() {
  const [prices, setPrices] = useState<{ btc: number | null; eth: number | null }>({ btc: null, eth: null })
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const fetchPrices = useCallback(async () => {
    try {
      setLoading(true)
      const res = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd",
        { cache: "no-store" }
      )
      const data = await res.json()
      setPrices({ btc: data.bitcoin.usd, eth: data.ethereum.usd })
      setLastUpdated(new Date())
    } catch { /* mantiene valores anteriores */ }
    finally { setLoading(false) }
  }, [])

  useEffect(() => {
    fetchPrices()
    const interval = setInterval(fetchPrices, 60_000)
    return () => clearInterval(interval)
  }, [fetchPrices])

  return { prices, loading, lastUpdated, refresh: fetchPrices }
}

// ─── WALLET CARD ──────────────────────────────────────────────────────────

function WalletCard({ network, address, cryptoAmount, cryptoSymbol, loadingPrice }: {
  network: string; address: string
  cryptoAmount?: string; cryptoSymbol?: string; loadingPrice?: boolean
}) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    await navigator.clipboard.writeText(address)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <div className="rounded-xl border bg-card p-4 flex flex-col gap-3">
      <p className="text-sm font-semibold text-muted-foreground">{network}</p>

      {cryptoSymbol && (
        <div className="rounded-lg bg-primary/5 border border-primary/15 px-3 py-2 flex items-center justify-between gap-2">
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">Enviá exactamente</p>
            {loadingPrice
              ? <div className="h-5 w-32 bg-muted animate-pulse rounded" />
              : <p className="font-bold text-primary tracking-tight">{cryptoAmount} <span className="text-sm font-semibold">{cryptoSymbol}</span></p>
            }
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

// ─── MODAL DE WALLETS ─────────────────────────────────────────────────────

function WalletModal({ product, onClose }: { product: typeof allProducts[0]; onClose: () => void }) {
  const [activeCrypto, setActiveCrypto] = useState<"usdt"|"usdc"|"btc"|"eth">("usdt")
  const { prices, loading: loadingPrice, lastUpdated, refresh } = useCryptoPrices()

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = "" }
  }, [])

  const btcAmount = prices.btc ? (product.price / prices.btc).toFixed(6) : null
  const ethAmount = prices.eth ? (product.price / prices.eth).toFixed(5) : null

  const cryptos = [
    { key: "usdt" as const, label: "USDT", color: "#26A17B", symbol: "$" },
    { key: "usdc" as const, label: "USDC", color: "#2775CA", symbol: "$" },
    { key: "btc"  as const, label: "BTC",  color: "#F7931A", symbol: "B" },
    { key: "eth"  as const, label: "ETH",  color: "#627EEA", symbol: "E" },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center" onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full md:max-w-lg max-h-[92vh] overflow-y-auto bg-background rounded-t-3xl md:rounded-2xl shadow-2xl flex flex-col">

        <div className="sticky top-0 bg-background z-10 px-6 pt-5 pb-4 border-b">
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
              <span>
                {activeCrypto === "btc"
                  ? prices.btc ? `1 BTC = $${prices.btc.toLocaleString()} USD` : "Cargando precio..."
                  : prices.eth ? `1 ETH = $${prices.eth.toLocaleString()} USD` : "Cargando precio..."
                }
              </span>
              <button onClick={refresh} className="flex items-center gap-1 hover:text-primary transition-colors" title="Actualizar precio">
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
              className="flex items-center justify-center gap-2 bg-[#0088cc] hover:bg-[#006699] text-white px-4 py-3 rounded-xl font-medium transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
              Enviar comprobante por Telegram
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── SELECTOR DE PRODUCTO ─────────────────────────────────────────────────

function ProductSelector() {
  const [selected, setSelected]         = useState<string | null>(null)
  const [open, setOpen]                 = useState(false)
  const [modalProduct, setModalProduct] = useState<typeof allProducts[0] | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const selectedProduct = allProducts.find((p) => p.id === selected)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const bots_list  = allProducts.filter((p) => p.type === "bot")
  const packs_list = allProducts.filter((p) => p.type === "pack")

  return (
    <>
      <div className="max-w-lg mx-auto flex flex-col gap-4">
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen((o) => !o)}
            className={`w-full flex items-center justify-between gap-3 px-4 py-3.5 rounded-xl border-2 bg-background text-left transition-all ${open ? "border-primary shadow-md" : "border-border hover:border-primary/40"}`}
          >
            <div className="flex items-center gap-3">
              <ShoppingCart className="h-5 w-5 text-muted-foreground shrink-0" />
              {selectedProduct ? (
                <div>
                  <p className="font-semibold leading-tight">{selectedProduct.name}</p>
                  <p className="text-sm text-primary font-bold">${selectedProduct.price} USD</p>
                </div>
              ) : (
                <span className="text-muted-foreground">Elegí tu bot o pack...</span>
              )}
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

        <button
          disabled={!selectedProduct}
          onClick={() => selectedProduct && setModalProduct(selectedProduct)}
          className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-base transition-all ${selectedProduct ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg hover:scale-[1.01]" : "bg-muted text-muted-foreground cursor-not-allowed"}`}
        >
          {selectedProduct
            ? <><ShoppingCart className="h-5 w-5" /> Confirmar — ${selectedProduct.price} USD</>
            : "Seleccioná un producto primero"
          }
        </button>

        {selectedProduct && (
          <p className="text-center text-xs text-muted-foreground">
            Al confirmar verás las wallets de pago para <span className="font-medium text-foreground">{selectedProduct.name}</span>
          </p>
        )}
      </div>

      {modalProduct && <WalletModal product={modalProduct} onClose={() => setModalProduct(null)} />}
    </>
  )
}

// ─── CAROUSEL DE PRECIOS ──────────────────────────────────────────────────

function PricingCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [heights, setHeights]           = useState<number[]>([0, 0])
  const slideRefs   = useRef<(HTMLDivElement | null)[]>([null, null])
  const autoplayRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [touchStart, setTouchStart]     = useState<number | null>(null)
  const [touchEnd, setTouchEnd]         = useState<number | null>(null)
  const minSwipeDistance = 50

  const measureSlides = useCallback(() => {
    setHeights(slideRefs.current.map((el) => el?.offsetHeight ?? 0))
  }, [])

  useEffect(() => {
    measureSlides()
    const observers: ResizeObserver[] = []
    slideRefs.current.forEach((el) => {
      if (!el) return
      const ro = new ResizeObserver(measureSlides)
      ro.observe(el)
      observers.push(ro)
    })
    return () => observers.forEach((ro) => ro.disconnect())
  }, [measureSlides])

  useEffect(() => {
    autoplayRef.current = setTimeout(() => setCurrentSlide((p) => (p + 1) % 2), 3000)
    return () => { if (autoplayRef.current) clearTimeout(autoplayRef.current) }
  }, [currentSlide])

  const goTo = (i: number) => {
    if (autoplayRef.current) clearTimeout(autoplayRef.current)
    setCurrentSlide(i)
  }

  const onTouchStart = (e: React.TouchEvent) => { setTouchEnd(null); setTouchStart(e.targetTouches[0].clientX) }
  const onTouchMove  = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX)
  const onTouchEnd   = () => {
    if (!touchStart || !touchEnd) return
    const d = touchStart - touchEnd
    if (d >  minSwipeDistance) goTo((currentSlide + 1) % 2)
    if (d < -minSwipeDistance) goTo((currentSlide - 1 + 2) % 2)
  }

  return (
    <div className="relative">
      <button onClick={() => goTo((currentSlide - 1 + 2) % 2)} className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-10 p-2 rounded-full bg-background border shadow-md hover:bg-muted transition-colors" aria-label="Anterior">
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button onClick={() => goTo((currentSlide + 1) % 2)} className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-10 p-2 rounded-full bg-background border shadow-md hover:bg-muted transition-colors" aria-label="Siguiente">
        <ChevronRight className="h-6 w-6" />
      </button>

      <div
        className="overflow-hidden"
        style={{ height: heights[currentSlide] ? `${heights[currentSlide]}px` : "auto", transition: "height 500ms cubic-bezier(0.4,0,0.2,1)" }}
        onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}
      >
        <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * 50}%)`, width: "200%" }}>

          {/* Slide 0 — Bots individuales */}
          <div className="px-4 pb-2" style={{ width: "50%" }} ref={(el) => { slideRefs.current[0] = el }}>
            <h3 className="text-xl font-semibold text-center mb-6">Bots Individuales</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {bots.map((bot) => (
                <Card key={bot.name} className="text-center">
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
          </div>

          {/* Slide 1 — Packs */}
          <div className="px-4 pb-2" style={{ width: "50%" }} ref={(el) => { slideRefs.current[1] = el }}>
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

      <div className="flex justify-center gap-3 mt-5">
        {[0, 1].map((i) => (
          <button key={i} onClick={() => goTo(i)} className="relative h-1.5 rounded-full overflow-hidden bg-muted-foreground/20" style={{ width: "64px" }}>
            <span className="absolute inset-y-0 left-0 rounded-full bg-primary" style={{ width: currentSlide === i ? "100%" : "0%", transition: currentSlide === i ? "width 3000ms linear" : "none" }} />
          </button>
        ))}
      </div>

      <div className="flex justify-center gap-8 mt-3 text-sm text-muted-foreground">
        <button onClick={() => goTo(0)} className={`transition-colors ${currentSlide === 0 ? "text-primary font-medium" : ""}`}>Individuales</button>
        <button onClick={() => goTo(1)} className={`transition-colors ${currentSlide === 1 ? "text-primary font-medium" : ""}`}>Packs</button>
      </div>
    </div>
  )
}

// ─── BURBUJA TELEGRAM ─────────────────────────────────────────────────────

function TelegramBubble() {
  const [tooltipOpen, setTooltipOpen] = useState(false)
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => { if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current) }, [])

  const handleMouseEnter = () => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current)
    setTooltipOpen(true)
  }
  const handleMouseLeave = () => {
    hoverTimerRef.current = setTimeout(() => setTooltipOpen(false), 15000)
  }

  return (
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
  )
}

// ─── PÁGINA ───────────────────────────────────────────────────────────────

export default function ComprarPage() {
  return (
    <div className="flex min-h-screen flex-col">

      {/* Splash de bienvenida */}
      <WelcomeSplash />

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
            <MobileNav links={[{ href:"/", label:"Inicio" }, { href:"/backtest", label:"Backtest" }, { href:"/tutoriales", label:"Tutoriales" }]} />
          </div>
        </div>
      </header>

      <main className="flex-1">

        {/* Hero */}
        <section className="w-full py-12 md:py-16 bg-gradient-to-b from-muted/50 to-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Comprar Bot de Trading</h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">Realiza tu pago en criptomonedas y comienza a operar de forma automatizada</p>
            </div>
          </div>
        </section>

        {/* 1. Selector de compra — ARRIBA */}
        <section className="w-full py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">¿Qué querés comprar?</h2>
              <p className="text-muted-foreground mt-2">Elegí tu bot o pack y te mostramos cómo pagar</p>
            </div>
            <ProductSelector />
          </div>
        </section>

        {/* 2. Carousel de precios — ABAJO */}
        <section className="w-full py-12 md:py-16 bg-muted">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl text-center mb-8">Precios</h2>
            <PricingCarousel />
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
