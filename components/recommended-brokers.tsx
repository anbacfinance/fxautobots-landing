import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, AlertTriangle, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function RecommendedBrokers() {
  const brokers = [
    {
      name: "FBS",
      logo: "/images/brokers/fbs-logo.png",
      logoWidth: 60,
      logoHeight: 60,
      features: [
        "VPS GRATIS con 3 lotes/mes y $450 de depósito",
        "Cuenta Cent desde $1",
        "Apalancamiento hasta 1:3000",
      ],
      link: "https://fbs.partners?ibl=690066&ibp=24567078",
      badge: "Popular",
    },
    {
      name: "RoboForex",
      logo: "/images/brokers/roboforex-logo.png",
      logoWidth: 100,
      logoHeight: 40,
      features: [
        "VPS GRATIS con 3 lotes/mes y $300 de depósito",
        "Cuenta Cent desde $10",
        "Más variedad de plataformas (MT4, cTrader, etc.)",
      ],
      link: "https://my.roboforex.com/es/?a=sejr",
      badge: "Recomendado",
    },
    {
      name: "HFM (HotForex)",
      logo: "/images/brokers/hfm-logo.jpeg",
      logoWidth: 60,
      logoHeight: 30,
      features: [
        "Ejecución rápida y confiable",
        "Cuentas cent ideales para bots",
        "Apalancamiento alto y spreads competitivos",
        "Plataforma MT4 y MT5 compatibles",
      ],
      warning:
        "HFM no ofrece VPS gratuito, por lo que deberás contratar uno externo si querés mantener tus bots funcionando 24/7.",
      link: "https://www.hfm.com/int/es/?refid=364904",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Brokers Recomendados</h2>
          <p className="max-w-[800px] text-muted-foreground md:text-xl/relaxed">
            Nuestros bots funcionan perfectamente con estos brokers que ofrecen cuentas cent ideales para trading
            algorítmico
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
                      className="object-contain"
                    />
                  </div>
                  {broker.badge && (
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      {broker.badge}
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-2xl mt-4">{broker.name}</CardTitle>
                <CardDescription>Broker compatible con nuestros bots</CardDescription>
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
                    rel="noopener noreferrer"
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
            Recomendamos utilizar cuentas cent para operar con nuestros bots, ya que permiten un mejor control del
            riesgo y son ideales para traders con capital limitado. Los VPS gratuitos requieren cumplir con los
            requisitos de volumen y depósito especificados por cada broker.
          </p>
        </div>
      </div>
    </section>
  )
}
