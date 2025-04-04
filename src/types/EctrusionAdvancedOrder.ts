
export interface ProductionData {
  turno: string; // "Dia" o "Noche"
  linea: string; // "Linea 1", "Linea 2", etc.
  acumulado: number; // Valor numérico del acumulado de producción
  objetivo: number; // Valor numérico del objetivo de producción
  mala: number; // Valor numérico de la producción mala
  cumplimiento: number; // Porcentaje de cumplimiento
  calidad: number; // Porcentaje de calidad
  promedio: number; // Promedio entre cumplimiento y calidad
}

export type WithoutTurno = Omit<ProductionData, 'turno'>; // Excluye 'turno' del tipo
