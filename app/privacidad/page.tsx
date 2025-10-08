"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect } from "react"
import { Instagram, MessageCircle } from "lucide-react"
import { ThemeToggle } from "../../components/theme-toggle"

export default function PoliticaPrivacidad() {
  // Scroll to top when the page loads
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

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
            <Link href="/" className="text-sm font-medium hover:text-primary">
              Volver al inicio
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 container py-12 max-w-4xl">
        <div className="space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              📄 Política de Privacidad de Anbac Finance / FXAutoBots
            </h1>
            <p className="text-muted-foreground">Última actualización: 12 de junio de 2025</p>
          </div>

          <section className="space-y-6">
            <div className="space-y-3">
              <h2 className="text-2xl font-bold">1. IDENTIDAD DEL RESPONSABLE</h2>
              <p>
                Este sitio y sus servicios son operados por Anbac Finance, empresa responsable del tratamiento de los
                datos recopilados a través de FXAutoBots.
              </p>
              <div className="flex items-center gap-2 font-medium">
                <MessageCircle className="h-5 w-5 text-primary" />
                <a
                  href="https://t.me/fxautobots"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  @anbacfinance
                </a>
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-bold">2. DATOS QUE RECOPILAMOS</h2>
              <p>
                Podemos recopilar los siguientes datos cuando un usuario interactúa con nuestro sitio, canal o
                productos:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Nombre</li>
                <li>Correo electrónico</li>
                <li>Usuario de Telegram</li>
                <li>Información técnica (IP, navegador, ubicación aproximada)</li>
                <li>Datos de comportamiento (mediante herramientas como cookies o píxeles)</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-bold">3. FINALIDAD DEL TRATAMIENTO</h2>
              <p>La información recopilada se usa para:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Enviar información comercial o técnica sobre nuestros productos</li>
                <li>Proporcionar soporte</li>
                <li>Mejorar la experiencia del usuario</li>
                <li>Realizar campañas de marketing digital</li>
                <li>Cumplir obligaciones legales</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-bold">4. USO DE COOKIES Y TECNOLOGÍAS DE TERCEROS</h2>
              <p>
                Podemos utilizar cookies propias y de terceros (como Google Analytics, Meta/Facebook Pixel, etc.) para
                analizar la navegación y mejorar nuestras campañas de publicidad. Al continuar usando nuestro sitio,
                usted acepta este uso.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-bold">5. COMPARTICIÓN DE DATOS</h2>
              <p>
                No vendemos, alquilamos ni compartimos datos personales con terceros, excepto en los siguientes casos:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Cuando sea requerido por ley</li>
                <li>Para operar plataformas de pago (ej. Stripe, PayPal)</li>
                <li>Para ejecutar campañas con servicios externos (ej. Meta Ads)</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-bold">6. SEGURIDAD DE LOS DATOS</h2>
              <p>
                Aplicamos medidas razonables para proteger sus datos personales contra acceso no autorizado, pérdida o
                mal uso. Sin embargo, ningún sistema es 100% infalible.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-bold">7. DERECHOS DEL USUARIO</h2>
              <p>Usted tiene derecho a:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Solicitar acceso a los datos almacenados</li>
                <li>Solicitar rectificación o eliminación</li>
                <li>Retirar su consentimiento en cualquier momento</li>
              </ul>
              <p>Para ejercer estos derechos, contáctenos a través de nuestro canal oficial en Telegram:</p>
              <div className="flex items-center gap-2 font-medium">
                <MessageCircle className="h-5 w-5 text-primary" />
                <a
                  href="https://t.me/fxautobots"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  @anbacfinance
                </a>
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-bold">8. CAMBIOS EN ESTA POLÍTICA</h2>
              <p>
                Anbac Finance se reserva el derecho de modificar esta política en cualquier momento. Las actualizaciones
                estarán disponibles en nuestra web oficial o canales de distribución.
              </p>
            </div>
          </section>
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
            <Link href="/" className="text-sm text-muted-foreground hover:underline">
              Volver al inicio
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
