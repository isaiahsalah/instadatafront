import {Scissors, GlassWater, Stamp, Milk, Heater} from "lucide-react";

export const menuData = {
  versions: ["0.0.1"],
  navMain: [
    {
      title: "Bolsas",
      url: "#",
      items: [
        {
          title: "Extrusion",
          url: "bolsas/extrusion",
          icon: GlassWater,
          state: true,
        },
        {
          title: "Impresión",
          url: "bolsas/impresion",
          icon: Stamp,
          state: true,
        },
        {
          title: "Corte",
          url: "bolsas/corte",
          icon: Scissors,
          state: true,
        },
        {
          title: "Empaque",
          url: "bolsas/empaque",
          icon: Stamp,
          state: true,
        },
        {
          title: "Embultaje",
          url: "bolsas/embultaje",
          icon: Stamp,
          state: true,
        },
      ],
    },
    {
      title: "Termoformado",
      url: "#",
      items: [
        {
          title: "Extrusion",
          url: "extrusion",
          icon: GlassWater,
          state: true,
        },
        {
          title: "Termoformado",
          url: "termoformado",
          icon: Heater,
          state: false,
        },
      ],
    },
    {
      title: "Expandido",
      url: "#",
      items: [
        {
          title: "Extrusion",
          url: "extrusion",
          icon: GlassWater,
          state: true,
        },
        {
          title: "Termoformado",
          url: "termoformado",
          icon: Heater,
          state: false,
        },
      ],
    },
    {
      title: "Inyeción",
      url: "#",
      items: [
        {
          title: "Termoformado",
          url: "termoformado",
          icon: Heater,
          state: false,
        },
      ],
    },
    {
      title: "Tanque",
      url: "#",
      items: [
        {
          title: "Tanques",
          url: "tanque",
          icon: Milk,
          state: false,
        },
      ],
    },
  ],
};
