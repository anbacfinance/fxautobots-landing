"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import { Instagram, MessageCircle, Copy, Check, ExternalLink } from "lucide-react"
import { useState } from "react"
import { QRCodeSVG } from "qrcode.react"

const bots = [
  { name: "Bot Akira", price: 120 },
  { name: "Bot Deus", price: 120 },
  { name: "Bot Scalper", price: 120 },
  { name: "Bot Atlas", price: 600 },
]

const wallets = {
  usdt: [
    {
      network: "TRC20 (Tron)",
      address: "TQYdX5MWMaMr4jxb37V25WyvjXQ7DLCoY6",
      icon: "🔴",
    },
    {
      network: "BEP20 (BSC)",
      address: "0x4aa985333c25c0911088392dbd886558344fd6d3",
      icon: "🟡",
    },
  ],
  usdc: [
    {
      network: "BEP20 (BSC)",
      address: "0x4aa985333c25c0911088392dbd886558344fd6d3",
      icon: "🟡",
    },
  ],
  btc: [
    {
      network: "Bitcoin",
      address: "12BA8zHb7o1hga3SmX63sjvMrw23e3SFPa",
      icon: "🟠",
    },
  ],
  eth: [
    {
      network: "Ethereum",
      address: "0x4aa985333c25c0911088392dbd886558344fd6d3",
      icon: "🔵",
    },
  ],
}

function WalletCard({ 
  crypto, 
  network, 
  address 
}: { 
  crypto: string
  network: string
  address: string 
}) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(address)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center justify-between">
          <span>{network}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <div className="bg-white p-3 rounded-lg">
          <QRCodeSVG 
            value={address} 
            size={140}
            level="H"
            includeMargin={false}
          />
        </div>
        <div className="w-full">
          <div className="flex items-center gap-2 bg-muted p-2 rounded-lg">
            <code className="text-xs flex-1 break-all font-mono">
              {address}
            </code>
            <Button 
              variant="ghost" 
              size="icon" 
              className="shrink-0 h-8 w-8"
              onClick={copyToClipboard}
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function ComprarPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center">
              <Image src="/images/fxautobots-logo.png" alt="FXAutoBots Logo" width={40} height={40} className="mr-2" />
              <span className="font-bold text-xl">FXAutoBots</span>
            </Link>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium hover:text-primary">
              Inicio
            </Link>
            <Link href="/backtest" className="text-sm font-medium hover:text-primary">
              Backtest
            </Link>
            <Link href="/tutoriales" className="text-sm font-medium hover:text-primary">
              Tutoriales
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-3">
              <a
                href="https://instagram.com/fxautobots"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://t.me/fxautobots"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Telegram"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-16 bg-gradient-to-b from-muted/50 to-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Comprar Bot de Trading
              </h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Realiza tu pago en criptomonedas y comienza a operar de forma automatizada
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="w-full py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl text-center mb-8">
              Precios
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {bots.map((bot) => (
                <Card key={bot.name} className="text-center">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{bot.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-primary">${bot.price}</p>
                    <p className="text-sm text-muted-foreground">USD</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Wallets Section */}
        <section className="w-full py-12 md:py-16 bg-muted">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl text-center mb-8">
              Wallets de Pago
            </h2>

            {/* USDT */}
            <div className="mb-12">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="h-8 w-8 rounded-full bg-[#26A17B] flex items-center justify-center">
                  <span className="text-white font-bold text-sm">₮</span>
                </div>
                <h3 className="text-xl font-bold">USDT (Tether)</h3>
                <span className="px-2 py-1 bg-green-500/20 text-green-600 dark:text-green-400 text-xs font-medium rounded">
                  Recomendado
                </span>
              </div>
              <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                {wallets.usdt.map((wallet) => (
                  <WalletCard
                    key={wallet.network}
                    crypto="USDT"
                    network={wallet.network}
                    address={wallet.address}
                  />
                ))}
              </div>
            </div>

            {/* USDC */}
            <div className="mb-12">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="h-8 w-8 rounded-full bg-[#2775CA] flex items-center justify-center">
                  <span className="text-white font-bold text-sm">$</span>
                </div>
                <h3 className="text-xl font-bold">USDC</h3>
              </div>
              <div className="grid md:grid-cols-1 gap-4 max-w-md mx-auto">
                {wallets.usdc.map((wallet) => (
                  <WalletCard
                    key={wallet.network}
                    crypto="USDC"
                    network={wallet.network}
                    address={wallet.address}
                  />
                ))}
              </div>
            </div>

            {/* BTC */}
            <div className="mb-12">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="h-8 w-8 rounded-full bg-[#F7931A] flex items-center justify-center">
                  <span className="text-white font-bold text-sm">₿</span>
                </div>
                <h3 className="text-xl font-bold">Bitcoin (BTC)</h3>
              </div>
              <div className="grid md:grid-cols-1 gap-4 max-w-md mx-auto">
                {wallets.btc.map((wallet) => (
                  <WalletCard
                    key={wallet.network}
                    crypto="BTC"
                    network={wallet.network}
                    address={wallet.address}
                  />
                ))}
              </div>
            </div>

            {/* ETH */}
            <div className="mb-8">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="h-8 w-8 rounded-full bg-[#627EEA] flex items-center justify-center">
                  <span className="text-white font-bold text-sm">Ξ</span>
                </div>
                <h3 className="text-xl font-bold">Ethereum (ETH)</h3>
              </div>
              <div className="grid md:grid-cols-1 gap-4 max-w-md mx-auto">
                {wallets.eth.map((wallet) => (
                  <WalletCard
                    key={wallet.network}
                    crypto="ETH"
                    network={wallet.network}
                    address={wallet.address}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Telegram CTA */}
        <section className="w-full py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <Card className="max-w-2xl mx-auto border-primary/20 bg-primary/5">
              <CardContent className="flex flex-col items-center text-center p-8 gap-6">
                <div className="h-16 w-16 rounded-full bg-[#0088cc] flex items-center justify-center">
                  <MessageCircle className="h-8 w-8 text-white" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Confirma tu pago</h3>
                  <p className="text-muted-foreground max-w-md">
                    Una vez realizado el pago, envia el comprobante a nuestro Telegram y te asesoraremos cuanto antes
                  </p>
                </div>
                <Button size="lg" asChild className="gap-2">
                  <a 
                    href="https://t.me/fxautobots" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
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

      {/* Footer */}
      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex items-center gap-2">
            <Image src="/images/fxautobots-logo.png" alt="FXAutoBots Logo" width={24} height={24} />
            <p className="text-center text-sm leading-loose md:text-left">
              &copy; {new Date().getFullYear()} FXAutoBots. Todos los derechos reservados.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com/fxautobots"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="https://t.me/fxautobots"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Telegram"
            >
              <MessageCircle className="h-5 w-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
