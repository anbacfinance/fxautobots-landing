"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect } from "react"
import { Instagram, MessageCircle } from "lucide-react"
import { ThemeToggle } from "../../components/theme-toggle"

export default function TerminosCondiciones() {
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
              📄 Términos y Condiciones de Anbac Finance / FXAutoBots
            </h1>
            <p className="text-muted-foreground">Última actualización: 12 de junio de 2025</p>
          </div>

          <section className="space-y-6">
            <div className="space-y-3">
              <h2 className="text-2xl font-bold">1. ACEPTACIÓN DE LOS TÉRMINOS</h2>
              <p>
                Al adquirir, instalar o utilizar cualquier bot, configuración .preset, guía o producto ofrecido por
                FXAutoBots, una división de Anbac Finance, usted acepta todos los términos y condiciones aquí
                establecidos. Si no está de acuerdo con estos términos, absténgase de realizar cualquier compra o
                descarga.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-bold">2. NATURALEZA DEL PRODUCTO</h2>
              <p>
                Los productos ofrecidos consisten en archivos .preset optimizados y guías para bots de libre
                distribución en plataformas como MT4.
              </p>
              <p>No reclamamos autoría sobre el código original de los bots, salvo que se indique lo contrario.</p>
              <p>
                Nuestro servicio se basa en la selección, mejora, prueba y soporte técnico personalizado para el uso
                eficiente de estas herramientas.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-bold">3. USO BAJO SU PROPIO RIESGO</h2>
              <p>El usuario acepta expresamente que:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Utiliza los productos bajo su propio riesgo y responsabilidad.</li>
                <li>
                  Anbac Finance / FXAutoBots no se hace responsable de ninguna pérdida económica, directa o indirecta,
                  derivada del uso de los bots o configuraciones.
                </li>
                <li>
                  Las decisiones de inversión o de trading tomadas con estos productos son responsabilidad exclusiva del
                  usuario.
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-bold">4. LIMITACIÓN DE GARANTÍAS</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Todos los productos se ofrecen "tal cual", sin garantías de rendimiento, compatibilidad ni
                  funcionamiento continuo.
                </li>
                <li>
                  No garantizamos que el bot funcione en todos los brokers ni en todas las condiciones del mercado.
                </li>
                <li>El soporte técnico puede variar según el producto adquirido y las condiciones del servicio.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-bold">5. PROPIEDAD INTELECTUAL</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Las configuraciones .preset, documentos, guías y materiales creados por Anbac Finance son de propiedad
                  exclusiva.
                </li>
                <li>
                  Está prohibida su reventa, copia, redistribución o modificación con fines comerciales sin autorización
                  expresa.
                </li>
                <li>
                  El software base (bots) es de libre circulación, y se incluye únicamente como parte complementaria del
                  servicio de optimización.
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-bold">6. POLÍTICA DE REEMBOLSO</h2>
              <p>
                Debido a la naturaleza digital de los productos, no se aceptan reembolsos en ningún caso una vez
                realizada la compra.
              </p>
              <p>Al efectuar el pago, el usuario declara haber comprendido y aceptado esta condición.</p>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-bold">7. CONDUCTA DEL USUARIO</h2>
              <p>El usuario se compromete a:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Utilizar los productos de manera ética y legal.</li>
                <li>No distribuir, revender ni ofrecer soporte con los productos sin autorización.</li>
                <li>No reclamar la creación o autoría de los bots incluidos.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-bold">8. JURISDICCIÓN LEGAL</h2>
              <p>Estos términos se rigen por las leyes de Argentina</p>
              <p>
                En caso de conflicto, ambas partes se someten a los tribunales ordinarios de la ciudad donde opera Anbac
                Finance.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-bold">9. MODIFICACIONES</h2>
              <p>
                Anbac Finance se reserva el derecho de modificar estos Términos y Condiciones sin previo aviso. Las
                actualizaciones estarán siempre disponibles en nuestra plataforma oficial.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-bold">10. CONTACTO</h2>
              <p>Para consultas, soporte técnico o información adicional, puede comunicarse vía Telegram a:</p>
              <div className="flex items-center gap-2 font-medium">
                <MessageCircle className="h-5 w-5 text-primary" />
                <a
                  href="https://t.me/anbacfinance"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  @anbacfinance
                </a>
              </div>
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
