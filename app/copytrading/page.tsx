"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  Shield,
  DollarSign,
  Users,
  CheckCircle2,
  ExternalLink,
  ArrowRight,
  Instagram,
  MessageCircle,
  ChevronDown,
  Percent,
  BarChart3,
  Zap,
  Copy,
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { MobileNav } from "@/components/mobile-nav"

// Datos de las estrategias
const strategies = [
  {
    name: "Deus Copy",
    description: "Estrategia conservadora con bajo drawdown, ideal para principiantes",
    profit: "+26%",
    drawdown: "2.88%",
    minDeposit: 30,
    link: "https://my.hfm.com/es/copy-trading/provider-details.html?provider=78098671",
    features: [
      "Bajo riesgo",
      "Operativa conservadora",
      "Ideal para cuentas pequenas",
      "Drawdown controlado",
    ],
    badge: "Conservador",
    badgeColor: "bg-emerald-500",
  },
  {
    name: "Akira Copy",
    description: "Estrategia mas agresiva con mayor rentabilidad potencial",
    profit: "+76%",
    drawdown: "6.47%",
    minDeposit: 50,
    link: "https://my.hfm.com/es/copy-trading/provider-details.html?provider=78098426",
    features: [
      "Mayor rentabilidad",
      "Estrategia dinamica",
      "Para traders con mas experiencia",
      "Excelente ratio riesgo/beneficio",
    ],
    badge: "Rentable",
    badgeColor: "bg-orange-500",
  },
]

const steps = [
  {
    number: 1,
    title: "Registrate en HFM",
    description: "Crea tu cuenta en HFM usando nuestro enlace de referido. El proceso toma menos de 5 minutos.",
    action: "Registrarse",
    link: "https://register.hfm.com/sv/en/new-live-account/?refid=364904",
  },
  {
    number: 2,
    title: "Deposita fondos",
    description: "Deposita un minimo de $30 USD para Deus Copy o $50 USD para Akira Copy. Acepta criptomonedas.",
    action: null,
    link: null,
  },
  {
    number: 3,
    title: "Accede a HFM Copy",
    description: "Una vez logeado, accede a la seccion de HFM Copy desde tu panel de cliente.",
    action: null,
    link: null,
  },
  {
    number: 4,
    title: "Copia la estrategia",
    description: "Busca la estrategia que prefieras y comienza a copiar nuestras operaciones automaticamente.",
    action: "Ver Estrategias",
    link: "#strategies",
  },
]

export default function CopyTradingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const faqs = [
    {
      question: "Que es el CopyTrading?",
      answer: "El CopyTrading te permite copiar automaticamente las operaciones de traders profesionales. Cuando nosotros abrimos una operacion, se replica automaticamente en tu cuenta con el mismo ratio de riesgo.",
    },
    {
      question: "Cual es el deposito minimo?",
      answer: "Para Deus Copy necesitas minimo $30 USD y para Akira Copy minimo $50 USD. Ambas estrategias operan en cuentas CENT, lo que te permite empezar con poco capital.",
    },
    {
      question: "Que son las cuentas CENT?",
      answer: "Las cuentas CENT dividen tu capital en centavos, permitiendo operar con microlotes. Esto reduce significativamente el riesgo y es ideal para cuentas pequenas.",
    },
    {
      question: "Cuanto puedo ganar?",
      answer: "Los rendimientos varian. Deus Copy lleva actualmente +26% de profit con un drawdown maximo de 2.88%, mientras que Akira Copy lleva +76% con un drawdown de 6.47%. Rendimientos pasados no garantizan resultados futuros.",
    },
    {
      question: "Hay comisiones?",
      answer: "HFM cobra una pequena comision sobre las ganancias obtenidas. No hay comisiones fijas mensuales ni costos ocultos.",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center">
              <Image src="/images/fxautobots-logo.png" alt="FXAutoBots Logo" width={40} height={40} className="md:mr-2" />
              <span className="font-bold text-xl hidden md:inline">FXAutoBots</span>
            </Link>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
              Inicio
            </Link>
            <Link href="/comprar" className="text-sm font-medium hover:text-primary transition-colors">
              Comprar Bots
            </Link>
            <Link href="/tutoriales" className="text-sm font-medium hover:text-primary transition-colors">
              Tutoriales
            </Link>
            <Link href="#strategies" className="text-sm font-medium hover:text-primary transition-colors">
              Estrategias
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
            <Button asChild className="hidden md:inline-flex bg-orange-500 hover:bg-orange-600">
              <a href="https://register.hfm.com/sv/en/new-live-account/?refid=364904" target="_blank" rel="noopener noreferrer">
                Registrarse
              </a>
            </Button>
            <MobileNav
              links={[
                { href: "/", label: "Inicio" },
                { href: "/comprar", label: "Comprar Bots" },
                { href: "/tutoriales", label: "Tutoriales" },
                { href: "#strategies", label: "Estrategias" },
              ]}
            />
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section con tematica HFM */}
        <section className="relative w-full py-16 md:py-24 lg:py-32 overflow-hidden">
          {/* Background con gradiente HFM */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-background to-red-500/10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-500/20 via-transparent to-transparent" />
          
          {/* Particulas decorativas */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
          
          <div className="container relative px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-8">
              {/* Badge HFM */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20">
                <Image 
                  src="/images/brokers/hfm-logo.jpeg" 
                  alt="HFM Logo" 
                  width={24} 
                  height={24} 
                  className="rounded"
                />
                <span className="text-sm font-medium text-orange-500">Powered by HFM Copy</span>
              </div>
              
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl">
                Copia Nuestras{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
                  Estrategias Ganadoras
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl">
                Replica automaticamente nuestras operaciones en tu cuenta. Sin experiencia requerida.
                Comienza desde solo <span className="text-orange-500 font-bold">$30 USD</span>.
              </p>
              
              {/* Stats rapidas */}
              <div className="flex flex-wrap justify-center gap-8 mt-8">
                <div className="text-center">
                  <p className="text-3xl md:text-4xl font-bold text-orange-500">+76%</p>
                  <p className="text-sm text-muted-foreground">Mejor Rentabilidad</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl md:text-4xl font-bold text-emerald-500">2.88%</p>
                  <p className="text-sm text-muted-foreground">Menor Drawdown</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl md:text-4xl font-bold text-foreground">$30</p>
                  <p className="text-sm text-muted-foreground">Deposito Minimo</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white" asChild>
                  <a href="https://register.hfm.com/sv/en/new-live-account/?refid=364904" target="_blank" rel="noopener noreferrer">
                    Comenzar Ahora
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="#strategies">
                    Ver Estrategias
                    <ChevronDown className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Como funciona - Pasos */}
        <section className="w-full py-16 md:py-24 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
                Como Empezar
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Sigue estos simples pasos para comenzar a copiar nuestras estrategias
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step, index) => (
                <div key={step.number} className="relative">
                  {/* Linea conectora */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-orange-500 to-transparent -translate-x-4" />
                  )}
                  
                  <Card className="h-full bg-background/50 backdrop-blur border-orange-500/20 hover:border-orange-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold text-xl mb-4">
                        {step.number}
                      </div>
                      <CardTitle className="text-xl">{step.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground">{step.description}</p>
                      {step.action && step.link && (
                        <Button className="w-full bg-orange-500 hover:bg-orange-600" asChild>
                          <a href={step.link} target={step.link.startsWith("http") ? "_blank" : undefined} rel={step.link.startsWith("http") ? "noopener noreferrer" : undefined}>
                            {step.action}
                            <ExternalLink className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Estrategias */}
        <section id="strategies" className="w-full py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
                Nuestras Estrategias
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Elige la estrategia que mejor se adapte a tu perfil de riesgo
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {strategies.map((strategy) => (
                <Card key={strategy.name} className="relative overflow-hidden border-2 hover:border-orange-500/50 transition-all duration-300 group">
                  {/* Efecto de brillo */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start mb-2">
                      <Badge className={`${strategy.badgeColor} text-white`}>
                        {strategy.badge}
                      </Badge>
                      <div className="flex items-center gap-1 text-orange-500">
                        <Copy className="h-4 w-4" />
                        <span className="text-sm font-medium">Copy</span>
                      </div>
                    </div>
                    <CardTitle className="text-2xl md:text-3xl">{strategy.name}</CardTitle>
                    <CardDescription className="text-base">{strategy.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    {/* Estadisticas */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-3 rounded-lg bg-muted/50">
                        <TrendingUp className="h-5 w-5 mx-auto mb-1 text-emerald-500" />
                        <p className="text-2xl font-bold text-emerald-500">{strategy.profit}</p>
                        <p className="text-xs text-muted-foreground">Profit</p>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-muted/50">
                        <BarChart3 className="h-5 w-5 mx-auto mb-1 text-orange-500" />
                        <p className="text-2xl font-bold">{strategy.drawdown}</p>
                        <p className="text-xs text-muted-foreground">Max DD</p>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-muted/50">
                        <DollarSign className="h-5 w-5 mx-auto mb-1 text-primary" />
                        <p className="text-2xl font-bold">${strategy.minDeposit}</p>
                        <p className="text-xs text-muted-foreground">Minimo</p>
                      </div>
                    </div>
                    
                    {/* Features */}
                    <ul className="space-y-2">
                      {strategy.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-orange-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {/* CTA */}
                    <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white" asChild>
                      <a href={strategy.link} target="_blank" rel="noopener noreferrer">
                        Copiar Estrategia
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                    
                    <p className="text-xs text-center text-muted-foreground">
                      Necesitas estar logeado en HFM para ver la estrategia
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Ventajas */}
        <section className="w-full py-16 md:py-24 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
                Por Que Elegirnos
              </h2>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center p-6 bg-background/50 backdrop-blur border-orange-500/20">
                <div className="w-14 h-14 rounded-full bg-orange-500/10 flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="h-7 w-7 text-orange-500" />
                </div>
                <h3 className="font-bold text-lg mb-2">Desde $30 USD</h3>
                <p className="text-sm text-muted-foreground">
                  Comienza con poco capital gracias a las cuentas CENT
                </p>
              </Card>
              
              <Card className="text-center p-6 bg-background/50 backdrop-blur border-orange-500/20">
                <div className="w-14 h-14 rounded-full bg-orange-500/10 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-7 w-7 text-orange-500" />
                </div>
                <h3 className="font-bold text-lg mb-2">Bajo Riesgo</h3>
                <p className="text-sm text-muted-foreground">
                  Drawdown controlado y gestion de riesgo profesional
                </p>
              </Card>
              
              <Card className="text-center p-6 bg-background/50 backdrop-blur border-orange-500/20">
                <div className="w-14 h-14 rounded-full bg-orange-500/10 flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-7 w-7 text-orange-500" />
                </div>
                <h3 className="font-bold text-lg mb-2">Automatico</h3>
                <p className="text-sm text-muted-foreground">
                  Las operaciones se copian automaticamente 24/7
                </p>
              </Card>
              
              <Card className="text-center p-6 bg-background/50 backdrop-blur border-orange-500/20">
                <div className="w-14 h-14 rounded-full bg-orange-500/10 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-7 w-7 text-orange-500" />
                </div>
                <h3 className="font-bold text-lg mb-2">Soporte</h3>
                <p className="text-sm text-muted-foreground">
                  Asesoramiento personalizado via Telegram
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="w-full py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
                Preguntas Frecuentes
              </h2>
            </div>
            
            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <Card 
                  key={index} 
                  className="cursor-pointer transition-all duration-300 hover:border-orange-500/50"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg font-medium">{faq.question}</CardTitle>
                      <ChevronDown className={`h-5 w-5 text-orange-500 transition-transform duration-300 ${openFaq === index ? "rotate-180" : ""}`} />
                    </div>
                  </CardHeader>
                  <div className={`overflow-hidden transition-all duration-300 ${openFaq === index ? "max-h-40" : "max-h-0"}`}>
                    <CardContent className="pt-0">
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="w-full py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-500" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />
          
          <div className="container relative px-4 md:px-6 text-center text-white">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
              Comienza a Copiar Hoy
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
              Unete a los traders que ya estan generando ganancias con nuestras estrategias. 
              Sin experiencia requerida, sin complicaciones.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-orange-500 hover:bg-white/90" asChild>
                <a href="https://register.hfm.com/sv/en/new-live-account/?refid=364904" target="_blank" rel="noopener noreferrer">
                  Crear Cuenta en HFM
                  <ExternalLink className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <a href="https://t.me/fxautobots" target="_blank" rel="noopener noreferrer">
                  Contactar por Telegram
                  <MessageCircle className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-background">
        <div className="container px-4 py-8 md:py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Image src="/images/fxautobots-logo.png" alt="FXAutoBots Logo" width={32} height={32} />
              <span className="font-bold">FXAutoBots</span>
            </div>
            <div className="flex items-center gap-4">
              <a href="https://instagram.com/fxautobots" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-orange-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://t.me/fxautobots" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-orange-500 transition-colors">
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} FXAutoBots. Todos los derechos reservados.
            </p>
          </div>
          <div className="mt-6 pt-6 border-t text-center">
            <p className="text-xs text-muted-foreground max-w-3xl mx-auto">
              Advertencia de riesgo: El trading de divisas y CFDs conlleva un alto nivel de riesgo y puede no ser adecuado para todos los inversores. 
              Rendimientos pasados no garantizan resultados futuros. Opera solo con capital que puedas permitirte perder.
            </p>
          </div>
        </div>
      </footer>

      {/* Burbuja flotante de Telegram */}
      <a
        href="https://t.me/fxautobots"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 group"
      >
        <div className="relative">
          <div className="absolute bottom-full right-0 mb-3 w-64 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 pointer-events-none group-hover:pointer-events-auto">
            <div className="bg-card border border-border rounded-2xl p-4 shadow-2xl">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="h-5 w-5 text-orange-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">
                    Necesitas ayuda?
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Contactanos por Telegram para asesoramiento personalizado.
                  </p>
                </div>
              </div>
              <div className="absolute -bottom-2 right-8 w-4 h-4 bg-card border-r border-b border-border transform rotate-45"></div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <MessageCircle className="h-5 w-5" />
            <span className="text-sm font-medium">Ayuda</span>
          </div>
          
          <div className="absolute inset-0 rounded-full bg-orange-500 animate-ping opacity-20"></div>
        </div>
      </a>
    </div>
  )
}
