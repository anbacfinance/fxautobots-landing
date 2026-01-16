"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function BotsComparison() {
  const features = [
    { name: "Temporalidad", akira: "H1", deus: "H1", scalper: "H1", atlas: "Order Blocks" },
    {
      name: "Pares de divisas",
      akira: "EURGBP, EURJPY, EURUSD, GBPUSD, USDJPY",
      deus: "AUDCAD, AUDCHF, EURJPY, EURUSD, GBPJPY, GBPUSD, USDJPY, XAUUSD",
      scalper: "AUDCAD, NZDCAD, AUDNZD",
      atlas: "Múltiples (optimizado para fondeo)",
    },
    {
      name: "Saldo mínimo recomendado",
      akira: "$400 USD en CENT",
      deus: "$100 USD en CENT",
      scalper: "$100 USD en CENT",
      atlas: "Según reglas de fondeo",
    },
    { name: "Protector de equidad incluido", akira: false, deus: true, scalper: true, atlas: true },
    { name: "Gestión interna de stop loss", akira: false, deus: false, scalper: true, atlas: true },
    { name: "Stop Loss y Take Profit", akira: false, deus: false, scalper: false, atlas: true },
    { name: "Nivel de riesgo", akira: "Alto", deus: "Medio", scalper: "Bajo", atlas: "Controlado" },
    { name: "Operaciones promedio por dia", akira: "5-20", deus: "2-10", scalper: "0-10", atlas: "1-5" },
    {
      name: "Ideal para",
      akira: "Traders agresivos",
      deus: "Ingresos pasivos",
      scalper: "Diversificación",
      atlas: "Pruebas de Fondeo",
    },
    { name: "Precio", akira: "$80 USD", deus: "$80 USD", scalper: "$80 USD", atlas: "$600 USD" },
  ]

  return (
    <div className="w-full overflow-auto">
      <Table className="w-full border-collapse">
        <TableHeader>
          <TableRow className="bg-muted hover:bg-muted">
            <TableHead className="w-[200px] font-bold">Características</TableHead>
            <TableHead className="text-center font-bold">
              <div className="flex flex-col items-center">
                <span className="text-red-500 font-bold">Bot AKIRA</span>
                <span className="text-xs text-muted-foreground">(Agresivo)</span>
              </div>
            </TableHead>
            <TableHead className="text-center font-bold">
              <div className="flex flex-col items-center">
                <span className="text-primary font-bold">Bot DEUS</span>
                <span className="text-xs text-muted-foreground">(Recomendado)</span>
              </div>
            </TableHead>
            <TableHead className="text-center font-bold">
              <div className="flex flex-col items-center">
                <span className="text-green-500 font-bold">Bot SCALPER</span>
                <span className="text-xs text-muted-foreground">(Técnico)</span>
              </div>
            </TableHead>
            <TableHead className="text-center font-bold">
              <div className="flex flex-col items-center">
                <span className="text-amber-500 font-bold">Atlas Funding</span>
                <span className="text-xs text-muted-foreground">(Premium)</span>
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {features.map((feature) => (
            <TableRow key={feature.name} className="hover:bg-muted/50">
              <TableCell className="font-medium">{feature.name}</TableCell>
              <TableCell className="text-center">
                {typeof feature.akira === "boolean" ? (
                  feature.akira ? (
                    <Check className="mx-auto h-5 w-5 text-green-500" />
                  ) : (
                    <X className="mx-auto h-5 w-5 text-red-500" />
                  )
                ) : (
                  feature.akira
                )}
              </TableCell>
              <TableCell className="text-center">
                {typeof feature.deus === "boolean" ? (
                  feature.deus ? (
                    <Check className="mx-auto h-5 w-5 text-green-500" />
                  ) : (
                    <X className="mx-auto h-5 w-5 text-red-500" />
                  )
                ) : (
                  feature.deus
                )}
              </TableCell>
              <TableCell className="text-center">
                {typeof feature.scalper === "boolean" ? (
                  feature.scalper ? (
                    <Check className="mx-auto h-5 w-5 text-green-500" />
                  ) : (
                    <X className="mx-auto h-5 w-5 text-red-500" />
                  )
                ) : (
                  feature.scalper
                )}
              </TableCell>
              <TableCell className="text-center">
                {typeof feature.atlas === "boolean" ? (
                  feature.atlas ? (
                    <Check className="mx-auto h-5 w-5 text-green-500" />
                  ) : (
                    <X className="mx-auto h-5 w-5 text-red-500" />
                  )
                ) : (
                  feature.atlas
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <Button className="w-full" asChild>
          <a href="https://shoppy.gg/product/2FEcJKa" target="_blank" rel="noopener noreferrer">
            Comprar AKIRA
          </a>
        </Button>
        <Button className="w-full" asChild>
          <a href="https://shoppy.gg/product/aSkVuev" target="_blank" rel="noopener noreferrer">
            Comprar DEUS
          </a>
        </Button>
        <Button className="w-full" asChild>
          <a href="https://shoppy.gg/product/DcWNzdU" target="_blank" rel="noopener noreferrer">
            Comprar SCALPER
          </a>
        </Button>
        <Button className="w-full bg-amber-500 hover:bg-amber-600 text-background" asChild>
          <a href="https://shoppy.gg/product/ATLAS" target="_blank" rel="noopener noreferrer">
            Comprar ATLAS
          </a>
        </Button>
      </div>
    </div>
  )
}
