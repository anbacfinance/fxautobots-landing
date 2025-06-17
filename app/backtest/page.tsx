"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Instagram, MessageCircle, ArrowLeft } from "lucide-react"
import { ThemeToggle } from "../../components/theme-toggle"
import { BacktestCarousel } from "@/components/BacktestCarousel";

export default function BacktestPage() {
  // Estado para controlar qué bot está seleccionado
  const [selectedBot, setSelectedBot] = useState("akira")

  // Definición de los bots y sus pares
  const bots = {
  akira: {
    name: "AKIRA",
    description: "Bot de alta frecuencia y rendimiento agresivo",
    color: "text-red-500",
    pairs: [
      {
        name: "EURGBP",
        periodo: "2024.01-2025.06",
        rentabilidad: "1.52%",
        drawdown: "0.84%",
      },
      {
        name: "EURJPY",
        periodo: "2024.01-2025.06",
        rentabilidad: "2.94%",
        drawdown: "20.34%",
      },
      {
        name: "EURUSD",
        periodo: "2024.01-2025.06",
        rentabilidad: "2.05%",
        drawdown: "2.57%",
      },
      {
        name: "GBPUSD",
        periodo: "2024.01-2025.06",
        rentabilidad: "2.75%",
        drawdown: "3.91%",
      },
      {
        name: "USDJPY",
        periodo: "2024.01-2025.06",
        rentabilidad: "1.25%",
        drawdown: "0.81%",
      },
    ],
  },
    deus: {
      name: "DEUS",
      description: "Bot versátil y seguro para múltiples pares",
      color: "text-primary",
      pairs: ["AUDCAD", "AUDCHF", "EURJPY", "EURUSD", "GBPJPY", "GBPUSD", "USDJPY", "XAUUSD"],
    },
    scalper: {
      name: "SCALPER",
      description: "Bot técnico, preciso y con gestión interna de stop loss",
      color: "text-green-500",
      pairs: ["AUDCAD", "NZDCAD", "AUDNZD"],
    },
  }
  import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

  const handlePrev = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="relative h-[250px] w-full bg-muted flex items-center justify-center rounded overflow-hidden">
      <Image
        src={images[currentImage]}
        alt={`Backtest ${pairName}`}
        width={400}
        height={250}
        className="object-contain rounded"
      />
      <button
        onClick={handlePrev}
        className="absolute left-2 bg-background/80 rounded-full p-1"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-2 bg-background/80 rounded-full p-1"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  )
}

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
                href="https://t.me/anbacfinance"
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
                <ArrowLeft className="h-4 w-4" />
                Volver al inicio
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container py-12">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Backtests de Nuestros Bots</h1>
            <p className="text-muted-foreground max-w-[800px]">
              Resultados históricos detallados de nuestros bots en diferentes pares de divisas. Estos backtests
              demuestran el rendimiento y la consistencia de nuestras estrategias algorítmicas.
            </p>
          </div>

          {/* Tabs para seleccionar el bot */}
          <Tabs defaultValue="akira" onValueChange={setSelectedBot} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="akira" className="text-base">
                Bot AKIRA
              </TabsTrigger>
              <TabsTrigger value="deus" className="text-base">
                Bot DEUS
              </TabsTrigger>
              <TabsTrigger value="scalper" className="text-base">
                Bot SCALPER
              </TabsTrigger>
            </TabsList>

            {/* Contenido para cada bot */}
            {Object.entries(bots).map(([botId, bot]) => (
              <TabsContent key={botId} value={botId} className="space-y-8">
                <div className="space-y-4">
                  <h2 className={`text-2xl font-bold ${bot.color}`}>Bot {bot.name}</h2>
                  <p className="text-muted-foreground">{bot.description}</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {/* Tarjetas para cada par de divisas */}
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

      {/* Footer */}
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
                href="https://t.me/anbacfinance"
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
