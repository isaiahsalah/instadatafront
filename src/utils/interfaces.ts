export type IExtrusion = {
  group: string;
  turn: string;
  line: number;
  good: number;
  bad: number;
  objective: number;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
};

export interface ICorte {
  turno: string; // "Dia" o "Noche"
  avance: number; // Valor numérico del acumulado de producción
  objetivo: number; // Valor numérico del objetivo de producción
  promedio: number;
}

export interface ITermoformado {
  turno: string;
}
export interface IEmpaque {
  turno: string;
}
export interface IEmbultaje {
  turno: string;
}

export interface IImpresion {
  turno: string; // "Dia" o "Noche"
  avance: number; // Valor numérico del acumulado de producción
  objetivo: number; // Valor numérico del objetivo de producción
  promedio: number; // Promedio entre cumplimiento y calidad
}

export interface IMezcla {
  turno: string;
}

// export type Extrusion_pa_po_withoutTurno = Omit<IExtrusion, 'turno'>; // Excluye 'turno' del tipo

export type IGeneral =
  | IExtrusion
  | ICorte
  | ITermoformado
  | IEmpaque
  | IEmbultaje
  | IImpresion
  | IMezcla;
