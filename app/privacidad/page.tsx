"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Instagram, MessageCircle, ChevronDown, ChevronUp, ArrowUp } from "lucide-react"
import { ThemeToggle } from "../../components/theme-toggle"

const sections = [
  {
    id: "p1",
    num: "01",
    title: "Identidad del Responsable",
    content: `Este sitio web y sus servicios son operados por Anbac Finance, empresa responsable del tratamiento de los datos personales recopilados a través de la plataforma FXAutoBots.

Razón social: Anbac Finance
Marca comercial: FXAutoBots
Sitio web: https://fxautobots.pro
País de operación: República Argentina
Canal oficial de contacto: @fxautobots_bot (Telegram)

Esta Política de Privacidad se rige por la Ley N° 25.326 de Protección de los Datos Personales de la República Argentina y sus disposiciones reglamentarias.`,
  },
  {
    id: "p2",
    num: "02",
    title: "Datos que Recopilamos",
    content: `Recopilamos únicamente los datos necesarios para la prestación de nuestros servicios. Estos pueden incluir:

Datos proporcionados directamente por el usuario:
— Nombre o alias
— Correo electrónico
— Usuario de Telegram
— Información de pago (procesada por terceros; no almacenamos datos de tarjetas)

Datos recopilados automáticamente al navegar el sitio:
— Dirección IP (anonimizada cuando sea posible)
— Tipo de navegador y sistema operativo
— Páginas visitadas y tiempo de permanencia
— País o región de acceso aproximado

Datos recopilados a través de herramientas de análisis y publicidad:
— Comportamiento de navegación (a través de cookies o píxeles, con consentimiento)

No recopilamos datos sensibles (salud, religión, orientación política, biometría) en ningún caso.`,
  },
  {
    id: "p3",
    num: "03",
    title: "Finalidad del Tratamiento",
    content: `Los datos personales recopilados se utilizan exclusivamente para las siguientes finalidades:

a) Gestión comercial: procesar compras, entregar productos digitales y gestionar el acceso a canales privados o servicios adquiridos.

b) Soporte técnico: responder consultas, resolver incidencias y brindar asistencia relacionada con los productos.

c) Comunicaciones del servicio: enviar actualizaciones, novedades de productos o información técnica relevante. El usuario puede darse de baja en cualquier momento.

d) Marketing digital: realizar campañas publicitarias propias en plataformas como Meta (Instagram/Facebook) o Google, utilizando datos de comportamiento de navegación con el consentimiento del usuario.

e) Mejora del servicio: analizar el comportamiento general de los usuarios para optimizar el sitio y la experiencia de uso (datos agregados y anonimizados).

f) Cumplimiento legal: atender requerimientos de autoridades competentes conforme a la normativa aplicable.

No utilizamos los datos para fines distintos a los aquí listados sin previo consentimiento expreso del titular.`,
  },
  {
    id: "p4",
    num: "04",
    title: "Base Legal del Tratamiento",
    content: `El tratamiento de datos personales se realiza bajo las siguientes bases legales:

a) Ejecución contractual: el tratamiento es necesario para cumplir con la relación comercial establecida al adquirir un producto o servicio (entrega del producto, soporte, acceso al canal).

b) Consentimiento del usuario: para el uso de cookies no esenciales, píxeles de seguimiento y comunicaciones de marketing. El usuario puede retirar su consentimiento en cualquier momento sin que ello afecte la licitud del tratamiento previo.

c) Interés legítimo: para el análisis agregado y anonimizado del tráfico del sitio con fines de mejora del servicio.

d) Obligación legal: cuando el tratamiento sea requerido por ley o autoridad competente.`,
  },
  {
    id: "p5",
    num: "05",
    title: "Cookies y Tecnologías de Seguimiento",
    content: `Nuestro sitio puede utilizar las siguientes categorías de cookies:

Cookies esenciales (siempre activas):
Necesarias para el funcionamiento básico del sitio. No requieren consentimiento. Ejemplos: sesión de usuario, preferencias de idioma.

Cookies de análisis (requieren consentimiento):
Utilizamos herramientas como Google Analytics para comprender cómo los usuarios interactúan con el sitio. Los datos se procesan de forma agregada y anonimizada.

Cookies de publicidad (requieren consentimiento):
Podemos utilizar el Meta Pixel (Facebook/Instagram) u otras herramientas similares para medir la efectividad de nuestras campañas publicitarias y mostrar anuncios relevantes.

El usuario puede gestionar sus preferencias de cookies a través de la configuración de su navegador o mediante el banner de consentimiento habilitado en el sitio. El rechazo de cookies no esenciales no afecta la funcionalidad principal del sitio ni el acceso a los productos adquiridos.

Para más información sobre las cookies de Google: https://policies.google.com/technologies/cookies
Para más información sobre el Meta Pixel: https://www.facebook.com/policy/cookies`,
  },
  {
    id: "p6",
    num: "06",
    title: "Compartición de Datos con Terceros",
    content: `No vendemos, alquilamos ni comercializamos datos personales. Los datos pueden ser compartidos con terceros únicamente en los siguientes supuestos:

a) Proveedores de servicios tecnológicos esenciales: plataformas de procesamiento de pagos (ej. Stripe, MercadoPago, procesadores de criptomonedas), servicios de hosting o infraestructura cloud. Estos terceros actúan como encargados del tratamiento y están contractualmente obligados a mantener la confidencialidad de los datos.

b) Plataformas de marketing y análisis: Meta Ads, Google Ads, Google Analytics, únicamente con el consentimiento previo del usuario y para los fines declarados en la cláusula de cookies.

c) HFM (HF Markets): en el marco del servicio de CopyTrading, el usuario se registra directamente en HFM bajo los términos y política de privacidad propios de dicha plataforma. FXAutoBots no transfiere datos personales a HFM; el usuario los provee directamente al bróker.

d) Requerimiento legal: cuando sea obligatorio por ley, orden judicial o requerimiento de autoridad competente (ej. DNPDP, organismos fiscales, fuerzas de seguridad con orden judicial).

e) Reorganización societaria: en caso de fusión, adquisición o venta de activos de la Empresa, los datos podrán ser transferidos al sucesor, quien quedará obligado por esta Política.

En ningún caso cedemos datos a terceros con fines publicitarios propios de esos terceros sin consentimiento explícito.`,
  },
  {
    id: "p7",
    num: "07",
    title: "Transferencias Internacionales de Datos",
    content: `Algunos de los proveedores tecnológicos que utilizamos (Google, Meta, plataformas de pago internacionales) procesan datos en servidores ubicados fuera de Argentina.

Al utilizar nuestros servicios y aceptar el uso de cookies de análisis y publicidad, el usuario consiente la transferencia de datos hacia estos países, que pueden incluir Estados Unidos, países de la Unión Europea u otros.

La Empresa verifica que dichos terceros cuenten con mecanismos adecuados de protección de datos conforme a estándares internacionales (Privacy Shield, Cláusulas Contractuales Tipo, etc.).

Para transferencias que no cuenten con nivel de protección adecuado reconocido por la DNPDP, la Empresa solicitará el consentimiento expreso del usuario previamente.`,
  },
  {
    id: "p8",
    num: "08",
    title: "Plazo de Conservación de los Datos",
    content: `Los datos personales se conservan durante el tiempo estrictamente necesario para cumplir con las finalidades para las que fueron recopilados:

— Datos de clientes activos: durante toda la vigencia de la relación comercial y hasta 5 años después de su finalización, conforme a obligaciones contables y fiscales.

— Datos de soporte técnico: hasta 2 años desde la última interacción.

— Datos de cookies de análisis y publicidad: según los plazos establecidos por cada herramienta (generalmente entre 14 meses y 2 años).

— Datos requeridos por ley: el tiempo que exija la normativa aplicable (ej. obligaciones fiscales, comerciales).

Una vez vencidos estos plazos, los datos son eliminados o anonimizados de forma irreversible.`,
  },
  {
    id: "p9",
    num: "09",
    title: "Seguridad de los Datos",
    content: `La Empresa aplica medidas técnicas y organizativas razonables para proteger los datos personales contra acceso no autorizado, pérdida, alteración, divulgación o destrucción accidental.

Las medidas implementadas incluyen, sin limitación:
— Acceso restringido a los datos por personal autorizado
— Uso de conexiones cifradas (HTTPS/TLS) en el sitio web
— Almacenamiento seguro de credenciales (sin contraseñas en texto plano)
— Revisión periódica de los procedimientos de seguridad

Sin embargo, ningún sistema de transmisión o almacenamiento electrónico es 100% seguro. En caso de detectarse una brecha de seguridad que afecte datos personales, la Empresa notificará a los afectados y a la DNPDP conforme a los plazos y procedimientos establecidos por la normativa vigente.`,
  },
  {
    id: "p10",
    num: "10",
    title: "Derechos del Titular de los Datos",
    content: `Conforme a la Ley N° 25.326 y normativa concordante, el usuario titular de los datos personales tiene los siguientes derechos:

a) Acceso: conocer qué datos personales suyos son tratados y cómo.

b) Rectificación: solicitar la corrección de datos inexactos, incompletos o desactualizados.

c) Supresión ("derecho al olvido"): solicitar la eliminación de sus datos cuando ya no sean necesarios para los fines declarados, salvo obligación legal de conservación.

d) Oposición: oponerse al tratamiento de sus datos para fines de marketing directo, en cualquier momento y sin necesidad de justificación.

e) Limitación del tratamiento: solicitar que el tratamiento quede restringido mientras se resuelve una impugnación sobre la exactitud de los datos o la legitimidad del tratamiento.

f) Portabilidad: recibir sus datos en formato estructurado y de uso común.

g) Revocación del consentimiento: retirar el consentimiento otorgado en cualquier momento, sin efecto retroactivo.

Para ejercer cualquiera de estos derechos, el usuario debe enviar una solicitud por escrito a través del canal oficial de Telegram (@fxautobots_bot), indicando su identidad, el derecho que desea ejercer y los datos afectados. La Empresa responderá en un plazo máximo de 5 días hábiles para acusar recibo y 15 días hábiles para resolver la solicitud, conforme al Art. 14 de la Ley 25.326.

El usuario también puede presentar una reclamación ante la Dirección Nacional de Protección de Datos Personales (DNPDP): https://www.argentina.gob.ar/aaip/datospersonales`,
  },
  {
    id: "p11",
    num: "11",
    title: "Menores de Edad",
    content: `Los servicios de FXAutoBots están destinados exclusivamente a personas mayores de 18 años. El trading de instrumentos financieros con apalancamiento no es adecuado para menores de edad.

La Empresa no recopila intencionalmente datos personales de menores de 18 años. Si se detecta que se han recopilado datos de un menor sin consentimiento parental, se procederá a su eliminación inmediata.

Si usted es padre, madre o tutor y considera que su hijo/a ha proporcionado datos personales a este sitio, le rogamos que nos contacte de inmediato a través del canal oficial.`,
  },
  {
    id: "p12",
    num: "12",
    title: "Enlace a Sitios de Terceros",
    content: `El sitio web puede contener enlaces a plataformas externas como HFM (hfm.com), Telegram, Instagram u otras.

La Empresa no se hace responsable por las prácticas de privacidad ni por el contenido de dichos sitios externos. El usuario accede a ellos bajo su propia responsabilidad y queda sujeto a las políticas de privacidad propias de cada plataforma.

Se recomienda leer las políticas de privacidad de cualquier sitio externo antes de proporcionar datos personales en ellos.`,
  },
  {
    id: "p13",
    num: "13",
    title: "Modificaciones a esta Política",
    content: `Anbac Finance se reserva el derecho de modificar esta Política de Privacidad en cualquier momento para adaptarla a cambios legislativos, novedades jurisprudenciales, prácticas del sector o cambios en los servicios ofrecidos.

Cualquier modificación relevante será notificada mediante:
— Publicación de la nueva versión en el sitio web (https://fxautobots.pro/privacidad) con la fecha de actualización visible.
— Aviso en los canales oficiales de Telegram o Instagram cuando los cambios sean sustanciales.

La versión vigente siempre será la publicada en el sitio web. El uso continuado del servicio tras la publicación de cambios implica la aceptación de la nueva versión.`,
  },
  {
    id: "p14",
    num: "14",
    title: "Contacto y Canal Oficial",
    content: `Para ejercer sus derechos, realizar consultas sobre el tratamiento de sus datos o reportar cualquier incidencia de seguridad, puede contactarnos a través de:

Telegram (canal oficial): @fxautobots_bot
Instagram: @botsdetrading.latam
Sitio web: https://fxautobots.pro

La Empresa se compromete a atender todas las solicitudes relacionadas con datos personales dentro de los plazos legalmente establecidos.

AVISO DE SEGURIDAD: Desconfíe de cuentas o canales que se hagan pasar por FXAutoBots o Anbac Finance. Verifique siempre que esté contactando los canales listados anteriormente antes de compartir cualquier información personal.`,
  },
]

export default function PoliticaPrivacidad() {
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    const onScroll = () => setShowBackToTop(window.scrollY > 600)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const toggle = (id: string) => setActiveSection(activeSection === id ? null : id)

  return (
    <div className="flex min-h-screen flex-col bg-background">

      <style>{`
        .legal-root {
          --accent: #E8192C;
          --gold: #C9A84C;
          --bd: rgba(255,255,255,0.07);
        }
        .sec-num {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--accent);
          font-family: monospace;
        }
        .sec-trigger {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 0;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          gap: 16px;
        }
        .sec-trigger:hover .sec-title-txt { opacity: 0.75; }
        .sec-title-txt {
          font-size: 16px;
          font-weight: 600;
          transition: opacity 0.2s;
        }
        .sec-item {
          border-bottom: 1px solid rgba(0,0,0,0.1);
        }
        .dark .sec-item { border-color: rgba(255,255,255,0.07); }
        .sec-body {
          overflow: hidden;
          transition: max-height 0.38s cubic-bezier(0.4,0,0.2,1);
        }
        .sec-body-inner {
          padding-bottom: 24px;
          font-size: 14px;
          line-height: 1.75;
          color: rgba(0,0,0,0.6);
          white-space: pre-line;
        }
        .dark .sec-body-inner { color: rgba(240,237,232,0.55); }
        .sec-num-big {
          font-size: 64px;
          font-weight: 900;
          line-height: 1;
          color: rgba(232,25,44,0.08);
          font-family: monospace;
          user-select: none;
        }
        .toc-link {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          padding: 8px 12px;
          border-radius: 8px;
          text-decoration: none;
          color: rgba(0,0,0,0.55);
          transition: background 0.2s, color 0.2s;
        }
        .dark .toc-link { color: rgba(240,237,232,0.45); }
        .toc-link:hover {
          background: rgba(232,25,44,0.07);
          color: #E8192C;
        }
        .toc-num {
          font-size: 10px;
          font-weight: 700;
          font-family: monospace;
          color: #E8192C;
          min-width: 22px;
        }
        .warning-box {
          border-left: 3px solid #E8192C;
          background: rgba(232,25,44,0.05);
          border-radius: 0 8px 8px 0;
          padding: 16px 20px;
          font-size: 13px;
          line-height: 1.65;
        }
        .info-box {
          border-left: 3px solid #C9A84C;
          background: rgba(201,168,76,0.05);
          border-radius: 0 8px 8px 0;
          padding: 16px 20px;
          font-size: 13px;
          line-height: 1.65;
        }
        .updated-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          padding: 4px 12px;
          border-radius: 100px;
          border: 1px solid rgba(232,25,44,0.25);
          color: #E8192C;
          background: rgba(232,25,44,0.07);
        }
        .shield-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          padding: 4px 12px;
          border-radius: 100px;
          border: 1px solid rgba(201,168,76,0.3);
          color: #C9A84C;
          background: rgba(201,168,76,0.07);
        }
      `}</style>

      {/* ── HEADER ── */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur legal-root">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/images/fxautobots-logo.png" alt="FXAutoBots Logo" width={36} height={36} />
            <span className="font-bold text-xl hidden md:inline">FXAutoBots</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-3">
              <a href="https://instagram.com/botsdetrading.latam" target="_blank" rel="noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://t.me/fxautobots_bot" target="_blank" rel="noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors">
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
            <ThemeToggle />
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
              ← Volver al inicio
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 legal-root">
        <div className="container py-12 max-w-5xl">

          {/* ── HERO HEADER ── */}
          <div className="mb-12 space-y-4">
            <div className="flex flex-wrap gap-3">
              <span className="updated-chip">
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#E8192C", display: "inline-block" }} />
                Última actualización: 9 de junio de 2026
              </span>
              <span className="shield-badge">
                🛡 Ley 25.326 — Argentina
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
              Política de Privacidad
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              Anbac Finance / FXAutoBots — Cómo recopilamos, usamos y protegemos sus datos personales.
            </p>

            {/* Info box */}
            <div className="info-box mt-6">
              <p className="font-semibold text-sm mb-1" style={{ color: "#C9A84C" }}>ℹ Tu privacidad es importante</p>
              <p className="text-muted-foreground text-sm">
                Solo recopilamos los datos necesarios para brindarte el servicio. Nunca vendemos tus datos a terceros.
                Podés ejercer tus derechos de acceso, rectificación y eliminación en cualquier momento contactándonos por Telegram.
              </p>
            </div>

            {/* Quick links to T&C */}
            <div className="flex flex-wrap gap-3 pt-2">
              <Link href="/terminos" className="text-sm text-muted-foreground hover:text-primary transition-colors underline underline-offset-4">
                Ver Términos y Condiciones →
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-12">

            {/* ── TOC SIDEBAR ── */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-1">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 px-3">
                  Índice
                </p>
                {sections.map((s) => (
                  <a key={s.id} href={`#${s.id}`} className="toc-link">
                    <span className="toc-num">{s.num}</span>
                    <span className="truncate">{s.title}</span>
                  </a>
                ))}
                <div className="mt-6 px-3">
                  <div className="text-xs text-muted-foreground leading-relaxed border-t pt-4" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
                    <p className="font-semibold mb-1">¿Dudas?</p>
                    <a href="https://t.me/fxautobots_bot" target="_blank" rel="noreferrer"
                      className="hover:text-primary transition-colors">
                      @fxautobots_bot
                    </a>
                  </div>
                </div>
              </div>
            </aside>

            {/* ── CONTENT ── */}
            <div className="space-y-0">
              {sections.map((s) => (
                <div key={s.id} id={s.id} className="sec-item">
                  <button
                    className="sec-trigger"
                    onClick={() => toggle(s.id)}
                    aria-expanded={activeSection === s.id}
                  >
                    <div className="flex items-center gap-4">
                      <span className="sec-num-big" aria-hidden="true">{s.num}</span>
                      <div>
                        <div className="sec-num">{s.num}</div>
                        <div className="sec-title-txt">{s.title}</div>
                      </div>
                    </div>
                    {activeSection === s.id
                      ? <ChevronUp className="flex-shrink-0" size={18} style={{ color: "#E8192C" }} />
                      : <ChevronDown className="flex-shrink-0 text-muted-foreground" size={18} />
                    }
                  </button>
                  <div
                    className="sec-body"
                    style={{ maxHeight: activeSection === s.id ? "1400px" : "0" }}
                  >
                    <div className="sec-body-inner">{s.content}</div>
                  </div>
                </div>
              ))}

              <div className="pt-10 pb-4 text-sm text-muted-foreground space-y-3">
                <p>
                  Esta Política de Privacidad complementa los{" "}
                  <Link href="/terminos" className="underline underline-offset-4 hover:text-primary transition-colors">
                    Términos y Condiciones
                  </Link>{" "}
                  de FXAutoBots. Ambos documentos forman parte del acuerdo completo entre el usuario y Anbac Finance.
                </p>
                <p>
                  Podés solicitar esta política en formato .pdf a través del canal oficial de soporte en Telegram.
                </p>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* ── FOOTER ── */}
      <footer className="w-full border-t py-6">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Image src="/images/fxautobots-logo.png" alt="FXAutoBots Logo" width={28} height={28} />
            <p className="text-sm text-muted-foreground">
              FXAutoBots © 2026 — Anbac Finance. Todos los derechos reservados.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/terminos" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Términos y Condiciones
            </Link>
            <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Inicio
            </Link>
            <a href="https://instagram.com/botsdetrading.latam" target="_blank" rel="noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="https://t.me/fxautobots_bot" target="_blank" rel="noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors">
              <MessageCircle className="h-4 w-4" />
            </a>
          </div>
        </div>
      </footer>

      {/* ── BACK TO TOP ── */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            position: "fixed", bottom: 24, right: 24, zIndex: 200,
            width: 44, height: 44, borderRadius: "50%",
            background: "#E8192C", color: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center",
            border: "none", cursor: "pointer",
            boxShadow: "0 4px 16px rgba(232,25,44,0.4)",
            transition: "transform 0.2s",
          }}
          aria-label="Volver arriba"
        >
          <ArrowUp size={18} />
        </button>
      )}
    </div>
  )
}
