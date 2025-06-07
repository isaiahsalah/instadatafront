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
  group: string;
  turn: string;
  operator: string;
  product: string;
  incentive: number;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  weight: number;
  jaba: number;
}
export interface IEmpaque {
  group: string;
  turn: string;
  operator: string;
  product: string;
  incentive: number;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  weight: number;
  jaba: number;
}
export interface IEmbultaje {
  turn: string;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  weight: number;
  bulk: number;
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
  turn: string;
  total: number;
  objective: number;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
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
