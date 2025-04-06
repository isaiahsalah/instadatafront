
export interface Extrusion_pa_po {
  turno: string; // "Dia" o "Noche"
  linea: number; // "Linea 1", "Linea 2", etc.
  acumulado: number; // Valor numérico del acumulado de producción
  objetivo: number; // Valor numérico del objetivo de producción
  mala: number; // Valor numérico de la producción mala
  cumplimiento: number; // Porcentaje de cumplimiento
  calidad: number; // Porcentaje de calidad
  promedio: number; // Promedio entre cumplimiento y calidad
}

export type Extrusion_pa_po_withoutTurno = Omit<Extrusion_pa_po, 'turno'>; // Excluye 'turno' del tipo
