
export interface Impresion_pa_po {
  turno: string; // "Dia" o "Noche"
  avance: number; // Valor numérico del acumulado de producción
  objetivo: number; // Valor numérico del objetivo de producción
  promedio: number; // Promedio entre cumplimiento y calidad
}

//export type Impresion_pa_po_withoutTurno = Omit<Impresion_pa_po, 'turno'>; // Excluye 'turno' del tipo

