import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, AlertTriangle, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function RecommendedBrokers() {
  const brokers = [
    {
      name: "Exness",
      logo: "/images/brokers/exness-logo.png",
      logoWidth: 200,
      logoHeight: 40,
      features: [
        "Cuenta Cent desde $10 USD",
        "Ejecución de órdenes sin mesa de dinero",
        "Apalancamiento alto disponible (aumenta el riesgo)",
      ],
      link: "https://one.exnessonelink.com/boarding/sign-up/a/551pw645r9?lng=es",
      badge: "Cuenta Cent",
    },
    {
      name: "HFM (HotForex)",
      logo: "/images/brokers/hfm-logo.jpeg",
      logoWidth: 60,
      logoHeight: 60,
      features: [
        "VPS sin cargo desde $400 USD de depósito y 2 lotes/mes",
        "Cuentas Cent compatibles con Expert Advisors",
        "Apalancamiento alto disponible (aumenta el riesgo)",
      ],
      warning:
        "El VPS sin cargo de HFM requiere un depósito mínimo de $400 USD. Para mantenerlo activo hay que cumplir mes a mes los requisitos de volumen de trading que fija el broker.",
      link: "https://register.hfm.com/sv/en/new-live-account/?refid=364904",
      badge: "Incluye VPS",
    },
    {
      name: "RoboForex",
      logo: "/images/brokers/roboforex-logo.png",
      logoWidth: 100,
      logoHeight: 40,
      features: [
        "VPS sin cargo desde $300 USD de depósito y 3 lotes/mes",
        "Cuenta Cent desde $10 USD",
        "Varias plataformas disponibles (MT4, MT5, cTrader)",
      ],
      warning:
        "El VPS sin cargo de RoboForex requiere un depósito mínimo de $300 USD y un volumen de 3 lotes por mes.",
      link: "https://my.roboforex.com/es/?a=sejr",
      badge: "Incluye VPS",
    },
  ]

  return (
    // Antes era <section py-12 md:py-24>. La página ya envuelve este componente
    // en su propia <section> con padding, así que quedaba el doble de espacio.
    <div className="w-full">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Brokers compatibles</h2>
          <p className="max-w-[800px] text-muted-foreground md:text-xl/relaxed">
            Nuestros bots funcionan en cualquier broker con MetaTrader 4. Estos tres los probamos nosotros y ofrecen
            cuentas Cent, que son las que usamos en la documentación de cada bot.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {brokers.map((broker) => (
            <Card key={broker.name} className="flex flex-col h-full">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div className="h-[50px] flex items-center">
                    <Image
                      src={broker.logo || "/placeholder.svg"}
                      alt={`${broker.name} Logo`}
                      width={broker.logoWidth}
                      height={broker.logoHeight}
                      className="object-contain max-h-[50px] w-auto"
                    />
                  </div>
                  {broker.badge && (
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      {broker.badge}
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-2xl mt-4">{broker.name}</CardTitle>
                <CardDescription>Compatible con nuestros bots para MT4</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-2">
                  {broker.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                {broker.warning && (
                  <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-md flex items-start gap-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-yellow-600 dark:text-yellow-400">{broker.warning}</p>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <a
                    href={broker.link}
                    target="_blank"
                    rel="nofollow sponsored noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    Abrir Cuenta
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm text-muted-foreground max-w-[800px] mx-auto">
            Sugerimos cuentas Cent para operar con nuestros bots porque permiten un control más fino del lotaje y del
            riesgo con capital reducido. Los VPS sin cargo dependen de los requisitos de depósito y volumen que fija
            cada broker, y esas condiciones pueden cambiar sin previo aviso: verificalas en su sitio antes de abrir
            la cuenta. FXAutoBots no es un broker ni actúa como agente de estas entidades.
          </p>
        </div>
      </div>
    </div>
  )
}
