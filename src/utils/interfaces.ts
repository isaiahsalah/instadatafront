export type IBagsExtrusion = {
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

export interface IBagsCorte {
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
export interface IBagsEmpaque {
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
export interface IBagsEmbultaje {
  turn: string;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  weight: number;
  bulk: number;
}

export interface IBagsImpresion {
  turn: string;
  total: number;
  objective: number;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
}

export interface IBagsMezcla {
  turn: string;
  weight: number;
  total: number;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
}

export interface IThermoExtrusion {
  group: string;
  turn: string;
  machine: string;
  good: number;
  bad: number;
  objective: number;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
}

export interface IThermoCorte {
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

export interface IThermoEmbultaje {
  turn: string;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  weight: number;
  bulk: number;
}

// export type Extrusion_pa_po_withoutTurno = Omit<IExtrusion, 'turno'>; // Excluye 'turno' del tipo

export type IGeneral =
  | IThermoExtrusion
  | IBagsExtrusion
  | IBagsCorte
  | IThermoEmbultaje
  | IThermoEmbultaje
  | IBagsEmpaque
  | IBagsEmbultaje
  | IBagsImpresion
  | IBagsMezcla;
