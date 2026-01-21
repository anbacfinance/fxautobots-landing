import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, ExternalLink, Server } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function RecommendedVPS() {
  const vpsProviders = [
    {
      name: "FXVM",
      logo: "/images/fxvm-logo.png",
      logoWidth: 120,
      logoHeight: 40,
      features: [
        "VPS optimizado para Forex y MT4/MT5",
        "Latencia ultra baja a brokers",
        "Soporte 24/7 especializado en trading",
        "99.99% de uptime garantizado",
        "Instalacion facil y rapida",
      ],
      link: "https://fxvm.net/?aff=45477",
      badge: "Recomendado",
    },
  ]

  return (
    <section id="vps" className="w-full py-12 md:py-24 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
          <div className="flex items-center gap-2">
            <Server className="h-8 w-8 text-primary" />
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">VPS Recomendado</h2>
          </div>
          <p className="max-w-[800px] text-muted-foreground md:text-xl/relaxed">
            Para mantener tus bots operando 24/7 sin interrupciones, te recomendamos utilizar un VPS especializado en
            trading
          </p>
        </div>

        <div className="max-w-md mx-auto">
          {vpsProviders.map((vps) => (
            <Card key={vps.name} className="flex flex-col h-full border-primary">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div className="h-[50px] flex items-center bg-background rounded-lg p-2">
                    <Image
                      src={vps.logo || "/placeholder.svg"}
                      alt={`${vps.name} Logo`}
                      width={vps.logoWidth}
                      height={vps.logoHeight}
                      className="object-contain"
                    />
                  </div>
                  {vps.badge && (
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      {vps.badge}
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-2xl mt-4">{vps.name}</CardTitle>
                <CardDescription>VPS especializado para trading algoritmico</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-2">
                  {vps.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <a
                    href={vps.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    Obtener VPS
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm text-muted-foreground max-w-[800px] mx-auto">
            Un VPS (Servidor Privado Virtual) te permite ejecutar tus bots de trading las 24 horas del dia, los 7 dias
            de la semana, sin depender de tu computadora personal. FXVM ofrece servidores optimizados especificamente
            para trading con conexiones de baja latencia a los principales brokers.
          </p>
        </div>
      </div>
    </section>
  )
}
