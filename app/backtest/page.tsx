"use client"

import { Instagram, MessageCircle, ChevronLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThemeToggle } from "@/components/theme-toggle"
import { BacktestCarousel } from "@/components/BacktestCarousel"

const bots = {
  akira: {
    name: "AKIRA",
    description:
      "Bot de alta frecuencia y rendimiento agresivo (En este test fue rendido al minimo riesgo con el saldo minimo recomendado; $400 USD en CENT que equivalen a $40.000 USC)",
    color: "text-red-500",
    pairs: [
      {
        name: "EURGBP",
        periodo: "2023.01 - 2025.06",
        rentabilidad: "10.5%",
        drawdown: "5.73%",
      },
      {
        name: "EURJPY",
        periodo: "2023.01 - 2025.06",
        rentabilidad: "9.86%",
        drawdown: "13.13%",
      },
      {
        name: "EURUSD",
        periodo: "2023.01 - 2025.06",
        rentabilidad: "13.18%",
        drawdown: "23.99%",
      },
      {
        name: "GBPUSD",
        periodo: "2023.01 - 2025.06",
        rentabilidad: "13.85%",
        drawdown: "8.37%",
      },
      {
        name: "USDJPY",
        periodo: "2023.01 - 2025.06",
        rentabilidad: "7.63%",
        drawdown: "15.33%",
      },
    ],
  },
  deus: {
    name: "DEUS",
    description:
      "Bot versátil y seguro para múltiples pares (En este test fue rendido al minimo riesgo con el saldo minimo recomendado; $400 USD en CENT que equivalen a $40.000 USC en XAUUSD y $200 en CENT que equivalen a $20.000 USC en divisas)",
    color: "text-primary",
    pairs: [
      {
        name: "AUDCAD",
        periodo: "2023.01 - 2025.06",
        rentabilidad: "45.29%",
        drawdown: "27.13%",
      },
      {
        name: "GBPUSD",
        periodo: "2023.01 - 2025.06",
        rentabilidad: "31.47%",
        drawdown: "27.28%",
      },
      {
        name: "AUDCHF",
        periodo: "2023.01 - 2025.06",
        rentabilidad: "2.44%",
        drawdown: "28.65%",
      },
      {
        name: "USDCHF",
        periodo: "2023.01 - 2025.06",
        rentabilidad: "18.20%",
        drawdown: "13.67%",
      },
    ],
  },
  scalper: {
    name: "SCALPER",
    description:
      "Bot técnico, preciso y con gestión interna de stop loss (En este test fue rendido al minimo riesgo con el saldo minimo recomendado; $100 USD en CENT que equivalen a $10.000 USC)",
    color: "text-green-500",
    pairs: [
      {
        name: "AUDCAD",
        periodo: "2023.01 - 2025.06",
        rentabilidad: "19.52%",
        drawdown: "8.22%",
      },
      {
        name: "NZDCAD",
        periodo: "2023.01 - 2025.06",
        rentabilidad: "28.06%",
        drawdown: "8.63%",
      },
      {
        name: "AUDNZD",
        periodo: "2023.01 - 2025.06",
        rentabilidad: "8.25%",
        drawdown: "4.11%",
      },
    ],
  },
  atlas: {
    name: "ATLAS FUNDING",
    description:
      "Bot diseñado específicamente para pruebas de fondeo. Opera con Order Blocks, incluye órdenes stop, stop loss y take profit. Rendimiento constante y riesgo controlado para pasar y mantener cuentas fondeadas o personales con capitales altos.",
    color: "text-amber-500",
    pairs: [
      {
        name: "XAUUSD",
        periodo: "2024.01 - 2026.01",
        rentabilidad: "71.00%",
        drawdown: "2.34%",
      },
      {
        name: "EURUSD",
        periodo: "2024.01 - 2026.01",
        rentabilidad: "11.6%",
        drawdown: "1.44%",
      },
      {
        name: "GBPUSD",
        periodo: "2024.01 - 2025.06",
        rentabilidad: "9.2%",
        drawdown: "3.8%",
      },
      {
        name: "USDJPY",
        periodo: "2024.01 - 2026.01",
        rentabilidad: "24.12%",
        drawdown: "2.22%",
      },
    ],
  },
}

export default function Page() {
  const [selectedBot, setSelectedBot] = useState("akira")

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center">
              <Image src="/images/fxautobots-logo.png" alt="FXAutoBots Logo" width={40} height={40} className="mr-2" />
              <span className="font-bold text-xl">FXAutoBots</span>
            </Link>
          </div>
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
            <Button variant="outline" size="sm" asChild>
              <Link href="/" className="flex items-center gap-2">
                <ChevronLeft className="h-4 w-4" />
                Volver al inicio
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container py-12">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Backtests de Nuestros Bots</h1>
            <p className="text-muted-foreground max-w-[800px]">
              Resultados históricos detallados de nuestros bots en diferentes pares de divisas. Estos backtests
              demuestran el rendimiento y la consistencia de nuestras estrategias algorítmicas.
            </p>
          </div>

          <Tabs defaultValue="akira" onValueChange={setSelectedBot} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="akira" className="text-base">
                Bot AKIRA
              </TabsTrigger>
              <TabsTrigger value="deus" className="text-base">
                Bot DEUS
              </TabsTrigger>
              <TabsTrigger value="scalper" className="text-base">
                Bot SCALPER
              </TabsTrigger>
              <TabsTrigger value="atlas" className="text-base text-amber-500">
                Atlas Funding
              </TabsTrigger>
            </TabsList>

            {Object.entries(bots).map(([botId, bot]) => (
              <TabsContent key={botId} value={botId} className="space-y-8">
                <div className="space-y-4">
                  <h2 className={"text-2xl font-bold " + bot.color}>Bot {bot.name}</h2>
                  <p className="text-muted-foreground">{bot.description}</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {bot.pairs.map((pair) => (
                    <Card key={pair.name} className="overflow-hidden">
                      <CardHeader className="pb-3">
                        <CardTitle>{pair.name}</CardTitle>
                        <CardDescription>Backtest histórico</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <BacktestCarousel botId={botId} pairName={pair.name} />

                        <div className="mt-4 space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Período:</span>
                            <span>{pair.periodo}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Rentabilidad:</span>
                            <span>{pair.rentabilidad}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Drawdown máx:</span>
                            <span>{pair.drawdown}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Nota:</strong> Los resultados de backtest son simulaciones históricas y no garantizan
                    rendimientos futuros. El trading conlleva riesgos y es importante utilizar una adecuada gestión de
                    capital.
                  </p>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>

      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex items-center gap-2">
            <Image src="/images/fxautobots-logo.png" alt="FXAutoBots Logo" width={30} height={30} />
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              FXAutoBots © 2025 | Todos los derechos reservados
            </p>
          </div>
          <div className="flex flex-wrap justify-center md:justify-end gap-4 items-center">
            <Link href="/terminos" className="text-sm text-muted-foreground hover:underline">
              Términos y Condiciones
            </Link>
            <Link href="/privacidad" className="text-sm text-muted-foreground hover:underline">
              Política de privacidad
            </Link>
            <div className="flex items-center gap-4 ml-2">
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
        </div>
      </footer>
    </div>
  )
}
