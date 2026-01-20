"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Settings,
  TrendingUp,
  DollarSign,
  ChevronRight,
  Clock,
  BarChart3,
  Target,
  Package,
  Percent,
  Instagram,
  MessageCircle,
  Shield,
} from "lucide-react"
import { useState, useEffect } from "react"
import { BotsComparison } from "../components/bots-comparison"
import { ProfitCalculator } from "../components/profit-calculator"
import { ThemeToggle } from "../components/theme-toggle"
import { RecommendedBrokers } from "../components/recommended-brokers"

function TestimonialCarousel() {
  const testimonials = [
    {
      name: "Carlos G.",
      image: "",
      review: "Con este bot hice en 3 semanas lo que antes hacía en 3 meses. Fácil de usar y rentable.",
      location: "México",
    },
    {
      name: "María S.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&fit=crop",
      review:
        "Increíble la consistencia de ganancias. Ya llevo 2 meses usando el bot y los resultados superan mis expectativas.",
      location: "España",
    },
    {
      name: "Roberto L.",
      image: "",
      review:
        "Al principio era escéptico, pero después de ver los backtests y probarlo, no puedo estar más satisfecho. Recomendado 100%.",
      location: "Colombia",
    },
    {
      name: "Ana P.",
      image: "",
      review:
        "La configuración es súper sencilla y el soporte es excelente. Mi cuenta ha crecido un 40% en solo 6 semanas.",
      location: "Argentina",
    },
    {
      name: "Diego M.",
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&h=200&fit=crop",
      review: "Después de perder dinero con otros bots, este realmente funciona. Los resultados hablan por sí solos.",
      location: "Chile",
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [testimonials.length])

  return (
    <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Lo que dicen nuestros usuarios
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Traders como tú ya están obteniendo resultados excepcionales
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-3xl mt-12 relative">
          <div className="flex flex-col items-center space-y-6 text-center p-8 rounded-lg bg-background shadow-lg transition-all duration-500">
            <div className="relative h-24 w-24 rounded-full overflow-hidden">
              <Image
                src={testimonials[currentIndex].image || "/placeholder.svg"}
                alt={testimonials[currentIndex].name}
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">{testimonials[currentIndex].name}</h3>
              <p className="text-sm text-muted-foreground">{testimonials[currentIndex].location}</p>
              <div className="flex justify-center">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-5 w-5 fill-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-lg italic min-h-[3rem] flex items-center justify-center">
                "{testimonials[currentIndex].review}"
              </blockquote>
            </div>
          </div>

          {/* Indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? "bg-primary" : "bg-muted-foreground/30"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default function LandingPage() {
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
            <Link href="/backtest" className="text-sm font-medium hover:text-primary">
              Backtest
            </Link>
            <Link href="#features" className="text-sm font-medium hover:text-primary">
              Características
            </Link>
            <Link href="#testimonials" className="text-sm font-medium hover:text-primary">
              Testimonios
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-primary">
              Precios
            </Link>
            <Link href="#brokers" className="text-sm font-medium hover:text-primary">
              Brokers
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
            <Button asChild>
              <Link href="#cta">Comenzar</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-muted/50 to-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <Image src="/images/fxautobots-logo.png" alt="FXAutoBots Logo" width={60} height={60} />
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">FXAutoBots</h1>
              </div>
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
                Gana en piloto automático con nuestros Bots de Trading para MT4
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Operá sin emociones, sin errores y con disciplina constante. Nuestros bots para MT4 siguen estrategias
                probadas, con resultados consistentes y 100% automatizados. Unite a la nueva forma de hacer trading:
                automática, rentable, transparente y precisa.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="font-medium" asChild>
                  <a href="https://shoppy.gg/@anbacfinance" target="_blank" rel="noopener noreferrer">
                    Compra Ahora
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="font-medium bg-transparent" asChild>
                  <Link href="/backtest">Ver Backtest</Link>
                </Button>
              </div>
              <div className="flex items-center gap-4 pt-2">
                <a
                  href="https://instagram.com/fxautobots"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Instagram className="h-4 w-4" />
                  <span>@fxautobots</span>
                </a>
                <a
                  href="https://t.me/fxautobots"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>@fxautobots</span>
                </a>
              </div>
            </div>
            <div className="relative h-[350px] lg:h-[450px] rounded-lg overflow-hidden">
              <Image
                src="/images/akiradeusscalper.png"
                alt="Trading Bot Dashboard"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute bottom-4 right-4 bg-background/80 p-2 rounded-lg backdrop-blur-sm">
                <Image src="/images/fxautobots-logo.png" alt="FXAutoBots Logo" width={40} height={40} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Características Principales
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Nuestros bots de trading están diseñados para maximizar tus ganancias con mínimo esfuerzo
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Settings className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Plug & Play</h3>
              <p className="text-muted-foreground">Solo carga los archivos .preset y empieza a operar de inmediato.</p>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Probados y Optimizados</h3>
              <p className="text-muted-foreground">
                Más de 5000 horas de backtesting con resultados sólidos y consistentes.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <DollarSign className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Resultados Reales</h3>
              <p className="text-muted-foreground">Utilizados en cuentas reales por traders en LATAM y Europa.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <TestimonialCarousel />

      {/* Pricing Section */}
      <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="flex justify-center items-center gap-3 mb-4">
                <Image src="/images/fxautobots-logo.png" alt="FXAutoBots Logo" width={50} height={50} />
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Nuestros Bots de Trading
                </h2>
              </div>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Elige el bot que mejor se adapte a tu estilo de trading y objetivos de inversión
              </p>
            </div>
          </div>

          <div className="mx-auto grid max-w-7xl items-start gap-6 py-12 lg:grid-cols-4 lg:gap-6">
            {/* Bot AKIRA */}
            <Card className="relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-red-500 text-background/95 px-3 py-1 text-xs font-bold">
                AGRESIVO
              </div>
              <CardHeader className="pb-4">
                <div className="relative h-48 w-full mb-4 rounded-lg overflow-hidden flex items-center justify-center bg-background/95">
                  <Image
                    src="/images/BOTAKIRA.png"
                    alt="Bot AKIRA - Trading Algorítmico"
                    fill
                    className="object-contain"
                  />
                  <div className="absolute bottom-2 right-2 bg-background/80 p-1 rounded-lg backdrop-blur-sm">
                    <Image src="/images/fxautobots-logo.png" alt="FXAutoBots Logo" width={24} height={24} />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <BarChart3 className="h-6 w-6 text-red-500" />
                  <CardTitle className="text-2xl">Bot AKIRA</CardTitle>
                </div>
                <CardDescription className="text-lg font-semibold text-primary">$80 USD</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Temporalidad: H1</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Pares: EURGBP, EURJPY, EURUSD, GBPUSD, USDJPY</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Bot de alta frecuencia y rendimiento agresivo. Requiere buena gestión de riesgo y saldo mínimo de $400
                  USD en cuenta CENT. No incluye protector de equidad, por lo que se recomienda utilizar nuestro EA
                  adicional para protección. Para traders que buscan mayor rotación operativa.
                </p>
              </CardContent>

              <CardFooter>
                <Button className="w-full" asChild>
                  <a href="https://shoppy.gg/product/2FEcJKa" target="_blank" rel="noopener noreferrer">
                    Comprar Bot AKIRA
                  </a>
                </Button>
              </CardFooter>
            </Card>

            {/* Bot DEUS */}
            <Card className="relative overflow-hidden border-primary">
              <div className="absolute top-0 right-0 bg-primary text-background/95 px-3 py-1 text-xs font-bold">
                RECOMENDADO
              </div>
              <CardHeader className="pb-4">
                <div className="relative h-48 w-full mb-4 rounded-lg overflow-hidden flex items-center justify-center bg-background/95">
                  <Image
                    src="/images/BOTDEUS.png"
                    alt="Bot DEUS - Trading Algorítmico"
                    fill
                    className="object-contain"
                  />
                  <div className="absolute bottom-2 right-2 bg-background/80 p-1 rounded-lg backdrop-blur-sm">
                    <Image src="/images/fxautobots-logo.png" alt="FXAutoBots Logo" width={24} height={24} />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-6 w-6 text-primary" />
                  <CardTitle className="text-2xl">Bot DEUS</CardTitle>
                </div>
                <CardDescription className="text-lg font-semibold text-primary">$80 USD</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Temporalidad: H1</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">
                      Pares: AUDCAD, AUDCHF, EURJPY, EURUSD, GBPJPY, GBPUSD, USDJPY, XAUUSD
                    </span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Bot versátil y seguro para operar en múltiples pares. Ideal para cuentas desde $100 USD en cuenta
                  CENT. Perfecto para generar ingresos pasivos con riesgo controlado. Recomendado para combinar con
                  nuestro protector de equidad incluido.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <a href="https://shoppy.gg/product/aSkVuev" target="_blank" rel="noopener noreferrer">
                    Comprar Bot DEUS
                  </a>
                </Button>
              </CardFooter>
            </Card>

            {/* Bot SCALPER */}
            <Card className="relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-green-500 text-background/95 px-3 py-1 text-xs font-bold">
                TÉCNICO
              </div>
              <CardHeader className="pb-4">
                <div className="relative h-48 w-full mb-4 rounded-lg overflow-hidden flex items-center justify-center bg-background/95">
                  <Image
                    src="/images/BOTSCALPER.png"
                    alt="Bot SCALPER - Trading Algorítmico"
                    fill
                    className="object-contain"
                  />
                  <div className="absolute bottom-2 right-2 bg-background/80 p-1 rounded-lg backdrop-blur-sm">
                    <Image src="/images/fxautobots-logo.png" alt="FXAutoBots Logo" width={24} height={24} />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Settings className="h-6 w-6 text-green-500" />
                  <CardTitle className="text-2xl">Bot SCALPER</CardTitle>
                </div>
                <CardDescription className="text-lg font-semibold text-primary">$80 USD</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Temporalidad: H1</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Pares: AUDCAD, NZDCAD, AUDNZD</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Bot técnico, preciso y con gestión interna de stop loss y equity risk. Excelente complemento del Bot
                  DEUS. Recomendado operar con $100 USD en cuenta CENT. Ideal para diversificar riesgos y lograr
                  constancia en resultados.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <a href="https://shoppy.gg/product/DcWNzdU" target="_blank" rel="noopener noreferrer">
                    Comprar Bot SCALPER
                  </a>
                </Button>
              </CardFooter>
            </Card>

            <Card className="relative overflow-hidden border-2 border-amber-500">
              <div className="absolute top-0 right-0 bg-amber-500 text-background/95 px-3 py-1 text-xs font-bold">
                FUNDING
              </div>
              <div className="absolute -top-1 -left-1 bg-amber-500 text-background/95 px-3 py-1 text-xs font-bold rounded-br-lg">
                PREMIUM
              </div>
              <CardHeader className="pb-4">
                <div className="relative h-48 w-full mb-4 rounded-lg overflow-hidden flex items-center justify-center bg-background/95">
                  <Image src="/images/BOTATLAS.png" alt="Bot ATLAS - Funding Bot" fill className="object-contain" />
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
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Estrategia: Order Blocks</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Opera con: Ordenes Stop, Stop Loss y Take Profit</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  La frutillita del postre. Bot diseñado específicamente para pruebas de fondeo con rendimiento
                  constante y riesgo controlado. Opera con Order Blocks, incluye órdenes stop, stop loss y take profit.
                  Ideal para pasar y mantener cuentas fondeadas.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-amber-500 hover:bg-amber-600 text-background" asChild>
                  <a href="https://shoppy.gg/product/ATLAS" target="_blank" rel="noopener noreferrer">
                    Comprar ATLAS
                  </a>
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Comparativa de Bots */}
          <div className="mt-16 mb-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
              <h3 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">Comparativa de Bots</h3>
              <p className="max-w-[700px] text-muted-foreground">
                Compara las características de nuestros bots para elegir el que mejor se adapte a tus necesidades
              </p>
            </div>
            <div className="max-w-7xl mx-auto">
              <BotsComparison />
            </div>
          </div>

          {/* Ofertas Especiales */}
          <div className="mt-16 mb-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
              <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full">
                <Percent className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">Ofertas Especiales</h3>
              <p className="max-w-[700px] text-muted-foreground">
                Aprovecha nuestros paquetes con descuento y maximiza tu potencial de trading
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
              {/* Oferta 2 Bots */}
              <Card className="relative overflow-hidden border-2 border-primary/50">
                <div className="absolute top-0 right-0 bg-primary text-background/95 px-3 py-1 text-xs font-bold">
                  AHORRA $10
                </div>
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-2">
                    <Package className="h-6 w-6 text-primary" />
                    <CardTitle className="text-2xl">Pack Duo</CardTitle>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <CardDescription className="text-2xl font-bold text-primary">$150 USD</CardDescription>
                    <span className="text-sm line-through text-muted-foreground">$160 USD</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm">
                    Elige 2 bots de nuestra colección y comienza a diversificar tus estrategias de trading con un
                    descuento especial.
                  </p>
                  <div className="bg-muted p-3 rounded-lg">
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <svg
                          className="h-5 w-5 text-primary"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                        <span>Elige cualquier combinación de 2 bots</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <svg
                          className="h-5 w-5 text-primary"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                        <span>Soporte técnico prioritario</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <svg
                          className="h-5 w-5 text-primary"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                        <span>Actualizaciones gratuitas</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" size="lg" asChild>
                    <a href="https://shoppy.gg/@anbacfinance/groups/mCReZhH" target="_blank" rel="noopener noreferrer">
                      Comprar Pack Duo
                    </a>
                  </Button>
                </CardFooter>
              </Card>

              {/* Oferta 3 Bots */}
              <Card className="relative overflow-hidden border-2 border-primary">
                <div className="absolute top-0 right-0 bg-red-500 text-background/95 px-3 py-1 text-xs font-bold">
                  AHORRA $40
                </div>
                <div className="absolute -top-1 -left-1 bg-primary text-background/95 px-3 py-1 text-xs font-bold rounded-br-lg">
                  MEJOR OFERTA
                </div>
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-2">
                    <Package className="h-6 w-6 text-primary" />
                    <CardTitle className="text-2xl">Pack Completo</CardTitle>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <CardDescription className="text-2xl font-bold text-primary">$200 USD</CardDescription>
                    <span className="text-sm line-through text-muted-foreground">$240 USD</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm">
                    Obtén los 3 bots de nuestra colección y maximiza tus oportunidades de trading con nuestro mejor
                    descuento.
                  </p>
                  <div className="bg-muted p-3 rounded-lg">
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <svg
                          className="h-5 w-5 text-primary"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                        <span>Incluye AKIRA + DEUS + SCALPER</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <svg
                          className="h-5 w-5 text-primary"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                        <span>Soporte técnico VIP</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <svg
                          className="h-5 w-5 text-primary"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                        <span>Actualizaciones prioritarias</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <svg
                          className="h-5 w-5 text-primary"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                        <span>Guía de configuración avanzada</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" size="lg" variant="default" asChild>
                    <a href="https://shoppy.gg/@anbacfinance/groups/HZ77dbA" target="_blank" rel="noopener noreferrer">
                      Comprar Pack Completo
                    </a>
                  </Button>
                </CardFooter>
              </Card>

              <Card className="relative overflow-hidden border-2 border-amber-500">
                <div className="absolute top-0 right-0 bg-amber-500 text-background/95 px-3 py-1 text-xs font-bold">
                  AHORRA $140
                </div>
                <div className="absolute -top-1 -left-1 bg-amber-500 text-background/95 px-3 py-1 text-xs font-bold rounded-br-lg">
                  PACK ULTIMATE
                </div>
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-2">
                    <Package className="h-6 w-6 text-amber-500" />
                    <CardTitle className="text-2xl">Pack Ultimate</CardTitle>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <CardDescription className="text-2xl font-bold text-amber-500">$700 USD</CardDescription>
                    <span className="text-sm line-through text-muted-foreground">$840 USD</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm">
                    El paquete definitivo. Incluye todos nuestros bots más el exclusivo Bot ATLAS para dominar
                    cualquier mercado.
                  </p>
                  <div className="bg-muted p-3 rounded-lg">
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <svg
                          className="h-5 w-5 text-amber-500"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                        <span>AKIRA + DEUS + SCALPER + ATLAS</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <svg
                          className="h-5 w-5 text-amber-500"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                        <span>Soporte técnico VIP de por vida</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <svg
                          className="h-5 w-5 text-amber-500"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                        <span>Acceso anticipado a nuevos bots</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <svg
                          className="h-5 w-5 text-amber-500"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                        <span>Configuración personalizada incluida</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-amber-500 hover:bg-amber-600 text-background" size="lg" asChild>
                    <a href="https://shoppy.gg/@anbacfinance/groups/ULTIMATE" target="_blank" rel="noopener noreferrer">
                      Comprar Pack Ultimate
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>

          {/* Calculadora de Rentabilidad */}
          <div className="mt-16 mb-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
              <h3 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">Calcula tu Rentabilidad</h3>
              <p className="max-w-[700px] text-muted-foreground">
                Estima tus potenciales ganancias según tu capital y nivel de riesgo
              </p>
            </div>
            <div className="max-w-xl mx-auto">
              <ProfitCalculator />
            </div>
          </div>
        </div>
      </section>

      {/* Brokers Recomendados Section */}
      <section id="brokers" className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
        <RecommendedBrokers />
      </section>

      {/* Final CTA Section */}
      <section id="cta" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <Image src="/images/fxautobots-logo.png" alt="FXAutoBots Logo" width={80} height={80} className="mb-4" />
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                ¿Listo para automatizar tus ganancias?
              </h2>
              <p className="max-w-[600px] mx-auto text-muted-foreground md:text-xl/relaxed">
                Únete a cientos de traders que ya están generando ingresos consistentes con nuestros bots
              </p>
            </div>
            <Button size="lg" className="font-medium text-lg group" asChild>
              <a href="https://shoppy.gg/@anbacfinance" target="_blank" rel="noopener noreferrer">
                Obtener nuestros Bots
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <div className="flex items-center gap-6 mt-4">
              <a
                href="https://instagram.com/fxautobots"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span>@fxautobots</span>
              </a>
              <a
                href="https://t.me/fxautobots"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
                <span>@fxautobots</span>
              </a>
            </div>
          </div>
        </div>
      </section>

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
