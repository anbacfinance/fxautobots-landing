"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Calculator, AlertTriangle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function ProfitCalculator() {
  const [capital, setCapital] = useState(10000)
  const [bot, setBot] = useState("deus")
  const [riskLevel, setRiskLevel] = useState(5)
  const [timeframe, setTimeframe] = useState(6) // meses
  const [showRiskWarning, setShowRiskWarning] = useState(false)

  // Factores de rendimiento mensual máximo por bot (según los valores proporcionados)
  const maxMonthlyReturnFactors = {
    akira: 0.4, // 40% mensual en escenario de máximo riesgo
    deus: 0.3, // 30% mensual en escenario de máximo riesgo
    scalper: 0.15, // 15% mensual en escenario de máximo riesgo
    atlas: 0.7, // 70% mensual en escenario de máximo riesgo
  }

  // Mostrar advertencia de alto riesgo cuando se selecciona AKIRA con nivel de riesgo alto
  useEffect(() => {
    if (bot === "akira" && riskLevel > 7) {
      setShowRiskWarning(true)
    } else {
      setShowRiskWarning(false)
    }
  }, [bot, riskLevel])

  // Ajuste por nivel de riesgo (1-10)
  const riskAdjustment = riskLevel / 10

  // Cálculo de rendimiento
  const calculateProfit = () => {
    const maxMonthlyFactor = maxMonthlyReturnFactors[bot as keyof typeof maxMonthlyReturnFactors]
    // El rendimiento se escala según el nivel de riesgo
    const monthlyFactor = maxMonthlyFactor * riskAdjustment
    let finalCapital = capital

    for (let i = 0; i < timeframe; i++) {
      finalCapital = finalCapital * (1 + monthlyFactor)
    }

    return {
      finalCapital: Math.round(finalCapital),
      totalProfit: Math.round(finalCapital - capital),
      percentageGain: Math.round((finalCapital / capital - 1) * 100),
      monthlyAverage: Math.round(monthlyFactor * 100),
    }
  }

  const results = calculateProfit()

  const botNames = {
    akira: "AKIRA (Agresivo)",
    deus: "DEUS (Recomendado)",
    scalper: "SCALPER (Técnico)",
    atlas: "ATLAS (Funding)",
  }

  const botMaxReturns = {
    akira: "hasta 40% mensual",
    deus: "hasta 30% mensual",
    scalper: "hasta 15% mensual",
    atlas: "hasta 70% mensual",
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Calculator className="h-6 w-6 text-primary" />
          <CardTitle>Calculadora de Rentabilidad</CardTitle>
        </div>
        <CardDescription>Estima tus potenciales ganancias según tu capital y nivel de riesgo</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="capital">Capital inicial (USD)</Label>
            <Input
              id="capital"
              type="number"
              min={1000}
              value={capital}
              onChange={(e) => setCapital(Number(e.target.value))}
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="bot">Selecciona el Bot</Label>
            <Select value={bot} onValueChange={setBot}>
              <SelectTrigger id="bot">
                <SelectValue placeholder="Selecciona un bot" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="akira">AKIRA (Agresivo - {botMaxReturns.akira})</SelectItem>
                <SelectItem value="deus">DEUS (Recomendado - {botMaxReturns.deus})</SelectItem>
                <SelectItem value="scalper">SCALPER (Técnico - {botMaxReturns.scalper})</SelectItem>
                <SelectItem value="atlas">ATLAS (Funding - {botMaxReturns.atlas})</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-3">
            <div className="flex justify-between">
              <Label htmlFor="risk">Nivel de riesgo</Label>
              <span className="text-sm text-muted-foreground">{riskLevel}/10</span>
            </div>
            <Slider
              id="risk"
              min={1}
              max={10}
              step={1}
              value={[riskLevel]}
              onValueChange={(value) => setRiskLevel(value[0])}
              className="py-4"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Conservador</span>
              <span>Agresivo</span>
            </div>
          </div>

          {showRiskWarning && (
            <Alert variant="destructive" className="bg-red-500/10 border-red-500/50 text-red-500">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                ¡Advertencia! Con el Bot AKIRA en nivel de riesgo alto existe una probabilidad significativa de perder
                la cuenta. Recomendamos usar protección de equidad adicional.
              </AlertDescription>
            </Alert>
          )}

          <div className="grid gap-3">
            <Label htmlFor="timeframe">Período de tiempo</Label>
            <Select value={timeframe.toString()} onValueChange={(v) => setTimeframe(Number(v))}>
              <SelectTrigger id="timeframe">
                <SelectValue placeholder="Selecciona un período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 mes</SelectItem>
                <SelectItem value="3">3 meses</SelectItem>
                <SelectItem value="6">6 meses</SelectItem>
                <SelectItem value="12">12 meses</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mt-4 p-4 bg-muted rounded-lg">
            <h4 className="font-medium mb-3">Resultados estimados con {botNames[bot as keyof typeof botNames]}</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Capital final estimado:</span>
                <span className="font-bold">${results.finalCapital.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Ganancia total:</span>
                <span className="font-bold text-green-500">+${results.totalProfit.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Rendimiento porcentual:</span>
                <span className="font-bold text-green-500">+{results.percentageGain}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Promedio mensual estimado:</span>
                <span className="font-bold">~{results.monthlyAverage}%</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              * Estos resultados son estimaciones basadas en rendimientos históricos y no garantizan ganancias futuras.
              El trading conlleva riesgos.
            </p>
            {bot === "akira" && (
              <p className="text-xs text-red-500 mt-2">
                ** El Bot AKIRA tiene un perfil de riesgo más alto y puede generar mayores pérdidas. Recomendamos
                utilizarlo solo con capital que pueda permitirse perder.
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
