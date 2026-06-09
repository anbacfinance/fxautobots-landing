import type { Metadata } from "next"
import { EmpezarContent } from "./empezar-content"

export const metadata: Metadata = {
  title: "Bots de Trading para MT4 | FX AutoBots",
  description:
    "Automatización para MetaTrader 4 con bots, copytrading, instalación guiada y gestión de riesgo.",
}

export default function EmpezarPage() {
  return <EmpezarContent />
}
