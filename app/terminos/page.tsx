"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Instagram, MessageCircle, ChevronDown, ChevronUp, ArrowUp } from "lucide-react"
import { ThemeToggle } from "../../components/theme-toggle"

const sections = [
  {
    id: "s1",
    num: "01",
    title: "Aceptación de los Términos",
    content: `Al acceder, adquirir, instalar o utilizar cualquier producto, servicio, archivo de configuración (.preset), guía digital, acceso a canal o cualquier otro contenido ofrecido por FXAutoBots, una marca comercial de Anbac Finance (en adelante "la Empresa"), el usuario declara haber leído, comprendido y aceptado íntegramente estos Términos y Condiciones (T&C), así como la Política de Privacidad vigente.

Si el usuario accede a los servicios en nombre de una persona jurídica, declara contar con facultades suficientes para obligar a dicha entidad.

La utilización continuada de los servicios luego de cualquier modificación a estos T&C implica la aceptación tácita de los cambios publicados.

Si usted no acepta alguno de estos términos, debe abstenerse de adquirir o utilizar cualquiera de nuestros productos o servicios.`,
  },
  {
    id: "s2",
    num: "02",
    title: "Identificación del Prestador",
    content: `Razón social: Anbac Finance
Marca comercial: FXAutoBots
Sitio web: https://fxautobots.pro
País de operación: República Argentina
Canal de soporte oficial: @fxautobots_bot (Telegram)
Correo alternativo: disponible en el canal de soporte

La Empresa no es una entidad financiera regulada, no ofrece asesoramiento de inversión personalizado, ni opera como administrador de carteras o gestor de fondos de terceros bajo ninguna normativa vigente.`,
  },
  {
    id: "s3",
    num: "03",
    title: "Naturaleza y Alcance de los Productos",
    content: `Los productos y servicios que ofrece FXAutoBots incluyen, sin limitación:

a) Archivos de configuración (.preset) optimizados para bots de trading algorítmico de libre distribución, compatibles con plataformas como MetaTrader 4 (MT4).

b) Guías, tutoriales y materiales educativos vinculados al uso de herramientas de trading automatizado.

c) Acceso a canales de comunicación privados (Telegram u otras plataformas) con contenido exclusivo.

d) Servicio de CopyTrading a través de la plataforma HFM (HF Markets), mediante el cual el usuario puede replicar operaciones de cuentas administradas por la Empresa. Este servicio opera bajo la infraestructura, regulación y condiciones propias de HFM, sobre las cuales la Empresa no tiene control ni responsabilidad.

e) Bots de trading algorítmico desarrollados internamente, en los casos en que así se indique expresamente en el producto.

Aclaración sobre el software de terceros: Salvo indicación explícita en contrario, los bots incluidos en los paquetes son software de libre distribución. La Empresa no reclama autoría sobre su código fuente. El valor del servicio reside en la selección, prueba, optimización de parámetros y soporte técnico provisto.

Ningún producto constituye una oferta, recomendación ni asesoramiento de inversión en los términos de la Ley N° 26.831 (Mercado de Capitales) ni de ninguna normativa financiera aplicable.`,
  },
  {
    id: "s4",
    num: "04",
    title: "Advertencia de Riesgo — Lectura Obligatoria",
    content: `EL TRADING DE DIVISAS (FOREX), CONTRATOS POR DIFERENCIA (CFDs), CRIPTOMONEDAS Y OTROS INSTRUMENTOS FINANCIEROS IMPLICA UN ALTO NIVEL DE RIESGO Y PUEDE NO SER ADECUADO PARA TODOS LOS INVERSORES.

El usuario declara comprender y aceptar que:

a) Puede perder una parte o la totalidad del capital invertido.

b) El apalancamiento amplifica tanto las ganancias como las pérdidas, pudiendo superar el capital depositado en cuentas con margen.

c) Los resultados históricos y las proyecciones de rentabilidad mostradas en el sitio web, redes sociales o cualquier material de marketing no garantizan ni predicen resultados futuros.

d) Las condiciones de mercado (volatilidad, liquidez, eventos macroeconómicos, noticias) pueden afectar de manera impredecible el desempeño de cualquier estrategia automatizada.

e) Un bot de trading es una herramienta de ejecución, no una garantía de ganancias.

f) La Empresa no garantiza rentabilidad mínima, retornos fijos ni recuperación de pérdidas en ningún producto o servicio ofrecido.

g) El usuario es el único responsable de evaluar si el trading automatizado es adecuado para su situación financiera, nivel de experiencia y tolerancia al riesgo.

Se recomienda operar exclusivamente con capital que el usuario esté dispuesto a perder en su totalidad, sin afectar su economía personal o familiar.`,
  },
  {
    id: "s5",
    num: "05",
    title: "Uso Bajo Exclusiva Responsabilidad del Usuario",
    content: `El usuario acepta expresamente que:

a) Utiliza todos los productos y servicios bajo su propio riesgo y responsabilidad.

b) La Empresa no se hace responsable de pérdidas económicas, directas o indirectas, presentes o futuras, derivadas del uso o mal uso de los bots, configuraciones, estrategias de CopyTrading o cualquier otro contenido provisto.

c) La Empresa no es responsable de pérdidas ocasionadas por fallas técnicas de la plataforma de trading (MT4, HFM u otras), interrupciones del servidor, pérdida de conexión a internet, actualizaciones del bróker, cambios en las condiciones de mercado o cualquier otra circunstancia ajena a su control directo.

d) Las decisiones de inversión y de gestión de capital son responsabilidad exclusiva e indelegable del usuario.

e) El usuario asume plena responsabilidad por la correcta configuración, supervisión y gestión de riesgos del bot en su cuenta personal.

f) La Empresa no asume responsabilidad alguna derivada del incumplimiento de los términos de uso del bróker del usuario, de cambios en las políticas del bróker, ni de restricciones geográficas o regulatorias aplicables en la jurisdicción del usuario.`,
  },
  {
    id: "s6",
    num: "06",
    title: "CopyTrading — Condiciones Específicas",
    content: `El servicio de CopyTrading operado a través de la plataforma HFM está sujeto, adicionalmente, a las siguientes condiciones:

a) El usuario debe registrarse en HFM por cuenta propia y bajo los términos y condiciones propios de dicho bróker, utilizando opcionalmente el enlace de referido provisto por la Empresa.

b) Los fondos depositados en la cuenta HFM son de exclusiva propiedad y responsabilidad del usuario. La Empresa no tiene acceso, control ni custodia sobre dichos fondos en ningún momento.

c) La Empresa actúa únicamente como proveedor de señales / administrador de estrategia dentro del sistema de CopyTrading de HFM. No opera directamente en la cuenta del usuario ni tiene facultad para retirar fondos.

d) Los rendimientos mostrados (ej. +26% Deus Copy, +76% Akira Copy) son históricos y no garantizan resultados futuros. El desempeño pasado no es indicativo de resultados futuros.

e) HFM puede modificar, suspender o discontinuar el servicio de CopyTrading en cualquier momento. La Empresa no asume responsabilidad por dichas decisiones.

f) El usuario reconoce que el depósito mínimo indicado es un requisito operativo y puede variar según las condiciones del bróker.

g) Las comisiones del servicio de CopyTrading son determinadas y cobradas directamente por HFM conforme a su estructura tarifaria vigente.`,
  },
  {
    id: "s7",
    num: "07",
    title: "Propiedad Intelectual",
    content: `a) Los archivos de configuración (.preset), documentos, guías, materiales educativos, diseños, textos, logotipos y demás contenidos originales creados por Anbac Finance / FXAutoBots son propiedad intelectual exclusiva de la Empresa y están protegidos por las leyes argentinas e internacionales de propiedad intelectual.

b) Queda expresamente prohibida la reproducción total o parcial, reventa, redistribución, sublicencia, modificación, ingeniería inversa o cualquier otro uso comercial de los materiales sin autorización escrita previa de la Empresa.

c) El software base de los bots de libre distribución incluido en los paquetes se rige por sus propias licencias de código abierto o libre distribución, y la Empresa no reclama derechos sobre dicho código.

d) El usuario obtiene una licencia personal, intransferible, no exclusiva y revocable para utilizar los productos adquiridos únicamente para uso propio. Esta licencia no puede cederse, venderse ni transferirse a terceros bajo ningún concepto.

e) El incumplimiento de esta cláusula faculta a la Empresa a revocar el acceso al servicio sin reembolso y a iniciar las acciones legales correspondientes por daños y perjuicios.`,
  },
  {
    id: "s8",
    num: "08",
    title: "Política de Pagos y Reembolsos",
    content: `Pagos:
Los pagos se procesan a través de los métodos habilitados en cada momento (transferencia bancaria, criptomonedas, plataformas de pago digital). El usuario es responsable de verificar que el pago se realice correctamente al destinatario indicado en el canal oficial de ventas.

La Empresa no se hace responsable por pagos enviados a cuentas fraudulentas o no autorizadas.

Política de no reembolso:
Debido a la naturaleza intangible e instantáneamente entregable de los productos digitales, una vez realizada la entrega del producto (preset, acceso al canal, guía u otros), no se procesarán reembolsos salvo en los siguientes casos expresamente reconocidos:

a) Derecho de retracto: De conformidad con el Art. 34 de la Ley de Defensa del Consumidor N° 24.240 (Argentina), el usuario tiene derecho a revocar la aceptación durante el plazo de DIEZ (10) días corridos desde la compra, siempre que el producto no haya sido descargado, accedido o utilizado de ninguna manera. Ejercido este derecho, la Empresa realizará el reembolso dentro de los 10 días hábiles siguientes.

b) Falla técnica imputable exclusivamente a la Empresa: En caso de que el producto entregado no corresponda a la descripción publicada o sea completamente inaccesible por razones atribuibles exclusivamente a la Empresa, se evaluará cada caso de manera particular.

Al realizar el pago, el usuario declara haber comprendido y aceptado expresamente esta política.`,
  },
  {
    id: "s9",
    num: "09",
    title: "Política de Privacidad y Protección de Datos",
    content: `De conformidad con la Ley N° 25.326 de Protección de los Datos Personales (Argentina) y sus disposiciones reglamentarias, la Empresa informa:

Datos recopilados: La Empresa puede recopilar nombre de usuario, alias de Telegram, correo electrónico y datos de contacto proporcionados voluntariamente por el usuario al adquirir productos o acceder al soporte.

Finalidad: Los datos se utilizan exclusivamente para: (i) gestionar la relación comercial, (ii) entregar los productos adquiridos, (iii) brindar soporte técnico, y (iv) enviar comunicaciones relacionadas con el servicio (novedades, actualizaciones). No se utilizarán para fines publicitarios de terceros sin consentimiento expreso.

Custodia: Los datos no se ceden ni venden a terceros, salvo requerimiento de autoridad competente o cuando sea necesario para la prestación del servicio (ej. plataformas de pago).

Derechos del titular: El usuario tiene derecho de acceso, rectificación, supresión y confidencialidad sobre sus datos personales. Para ejercer estos derechos, puede contactar a la Empresa por los canales oficiales indicados en la cláusula de contacto.

La base de datos de usuarios se encuentra debidamente inscripta ante la Dirección Nacional de Protección de Datos Personales (DNPDP) o en proceso de inscripción conforme a la normativa vigente.

El sitio web puede utilizar cookies técnicas propias con fines de funcionamiento. No se utilizan cookies de seguimiento de terceros sin consentimiento.`,
  },
  {
    id: "s10",
    num: "10",
    title: "Conducta del Usuario y Uso Aceptable",
    content: `El usuario se compromete expresamente a:

a) Utilizar los productos de manera ética, legal y conforme a la normativa vigente en su jurisdicción.

b) No distribuir, revender, alquilar, sublicenciar, compartir públicamente ni ofrecer soporte técnico sobre los productos adquiridos sin autorización escrita de la Empresa.

c) No reclamar autoría ni propiedad intelectual sobre los bots, presets o cualquier material provisto por la Empresa.

d) No utilizar los productos para actividades ilegales, fraudulentas o contrarias a las políticas del bróker con el que opere.

e) No intentar acceder, copiar, descompilar, aplicar ingeniería inversa o modificar cualquier componente de software propietario provisto por la Empresa.

f) Mantener la confidencialidad de las credenciales de acceso a canales privados y no compartirlas con terceros.

g) No realizar maniobras de chargebacks o reversiones de pago fraudulentas tras haber recibido el producto. Dicha conducta podrá dar lugar a acciones legales por el monto reclamado y daños adicionales.

El incumplimiento de cualquiera de estos compromisos faculta a la Empresa a suspender o revocar el acceso al servicio de manera inmediata y sin reembolso.`,
  },
  {
    id: "s11",
    num: "11",
    title: "Limitación de Responsabilidad",
    content: `En la máxima medida permitida por la ley aplicable:

a) La responsabilidad total acumulada de la Empresa ante el usuario por cualquier concepto no podrá exceder el monto efectivamente abonado por el usuario por el producto o servicio específico que generó el reclamo, durante los últimos doce (12) meses.

b) La Empresa no será responsable por daños indirectos, incidentales, especiales, consecuentes o punitivos, incluyendo sin limitación: pérdidas de ganancias esperadas, pérdida de oportunidades de negocio, pérdida de datos, interrupción de la actividad comercial o cualquier otro daño intangible.

c) La Empresa no garantiza que el sitio web o los canales de soporte estén disponibles de manera ininterrumpida, libre de errores o virus.

d) El usuario reconoce que la Empresa no puede controlar las condiciones del mercado financiero, las políticas de los brókers, los eventos de fuerza mayor (guerras, pandemias, desastres naturales, decisiones regulatorias) ni fallas de infraestructura tecnológica de terceros.`,
  },
  {
    id: "s12",
    num: "12",
    title: "Disponibilidad del Servicio y Modificaciones",
    content: `a) La Empresa se reserva el derecho de modificar, suspender, discontinuar o actualizar cualquier producto o servicio en cualquier momento, con o sin previo aviso, sin que esto genere derecho a reembolso o compensación alguna.

b) Las actualizaciones de presets o materiales, cuando sean ofrecidas, se realizarán a discreción de la Empresa y no implican un compromiso contractual de mantenimiento indefinido.

c) En caso de discontinuación de un servicio de suscripción activa, la Empresa realizará su mejor esfuerzo para notificar al usuario con razonable anticipación.

d) La Empresa podrá modificar estos Términos y Condiciones en cualquier momento. La versión vigente siempre será la publicada en el sitio web. El uso continuado del servicio tras la publicación de modificaciones implica aceptación de los nuevos términos.`,
  },
  {
    id: "s13",
    num: "13",
    title: "Jurisdicción y Ley Aplicable",
    content: `Estos Términos y Condiciones se rigen en su totalidad por las leyes de la República Argentina.

Para la resolución de cualquier controversia derivada de estos T&C o de la relación comercial entre las partes, ambas acuerdan someterse a la jurisdicción de los Tribunales Ordinarios de la Ciudad Autónoma de Buenos Aires, República Argentina, con renuncia expresa a cualquier otro fuero o jurisdicción que pudiera corresponderles.

Sin perjuicio de lo anterior, el usuario que tenga la condición de consumidor conserva los derechos irrenunciables que le otorga la Ley N° 24.240 de Defensa del Consumidor y demás normativa de protección al consumidor aplicable en su jurisdicción de residencia.`,
  },
  {
    id: "s14",
    num: "14",
    title: "Divisibilidad y Acuerdo Completo",
    content: `Si alguna disposición de estos Términos y Condiciones fuera declarada nula, inválida o inaplicable por autoridad competente, dicha disposición se considerará separada del resto del acuerdo, permaneciendo las demás cláusulas en plena vigencia y efecto.

Estos Términos y Condiciones, junto con la Política de Privacidad y cualquier acuerdo específico vinculado a un producto particular, constituyen el acuerdo completo entre el usuario y la Empresa respecto del objeto aquí regulado, y reemplazan cualquier negociación, comunicación o acuerdo previo sobre la misma materia.`,
  },
  {
    id: "s15",
    num: "15",
    title: "Contacto y Canal Oficial",
    content: `Para consultas, soporte técnico, ejercicio de derechos sobre datos personales o cualquier reclamo formal, el usuario puede comunicarse a través de los canales oficiales:

Telegram (soporte técnico): @fxautobots_bot
Instagram: @botsdetrading.latam
Sitio web: https://fxautobots.pro

La Empresa se compromete a dar respuesta en un plazo razonable a través de sus canales habilitados. Las comunicaciones realizadas fuera de estos canales oficiales no generan obligación de respuesta ni crean compromisos vinculantes para la Empresa.

ADVERTENCIA: Desconfíe de cuentas o canales que se hagan pasar por FXAutoBots. Verifique siempre que esté contactando los canales listados arriba.`,
  },
]

export default function TerminosCondiciones() {
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
            <span className="updated-chip">
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#E8192C", display: "inline-block" }} />
              Última actualización: 6 de junio de 2026
            </span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
              Términos y Condiciones
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              Anbac Finance / FXAutoBots — Lea detenidamente este documento antes de adquirir o utilizar cualquiera de nuestros productos y servicios.
            </p>

            {/* Risk Warning */}
            <div className="warning-box mt-6">
              <p className="font-semibold text-sm mb-1" style={{ color: "#E8192C" }}>⚠ Advertencia de riesgo importante</p>
              <p className="text-muted-foreground text-sm">
                El trading de instrumentos financieros con apalancamiento implica un alto riesgo de pérdida. Los resultados pasados no garantizan rendimientos futuros. Opere solo con capital que esté dispuesto a perder.
              </p>
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
              </div>
            </aside>

            {/* ── CONTENT ── */}
            <div className="space-y-0">
              {sections.map((s, i) => (
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
                    style={{ maxHeight: activeSection === s.id ? "1200px" : "0" }}
                  >
                    <div className="sec-body-inner">{s.content}</div>
                  </div>
                </div>
              ))}

              {/* Full text note */}
              <div className="pt-10 pb-4 text-sm text-muted-foreground">
                <p>
                  Este documento constituye el acuerdo completo entre el usuario y Anbac Finance / FXAutoBots. Para cualquier consulta legal, el usuario puede requerir los T&C en formato .pdf a través de los canales oficiales de soporte.
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
            <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Volver al inicio
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
