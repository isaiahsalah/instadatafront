import {
  Scissors,
  Milk,
  Cylinder,
  Boxes,
  PackageOpen,
  PaintRoller,
  Waves,
  Blend,
} from "lucide-react";

export const menuData = {
  versions: ["0.0.1"],
  navMain: [
    {
      title: "Bolsas",
      url: "#",
      items: [
        {
          title: "Mezcla",
          url: "bolsas/mezcla",
          icon: Blend,
          state: true,
        },
        {
          title: "Extrusion",
          url: "bolsas/extrusion",
          icon: Cylinder,
          state: true,
        },
        {
          title: "Impresión",
          url: "bolsas/impresion",
          icon: PaintRoller,
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
          icon: PackageOpen,
          state: true,
        },
        {
          title: "Embultaje",
          url: "bolsas/embultaje",
          icon: Boxes,
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
          url: "termo/extrusion",
          icon: Cylinder,
          state: true,
        },
        {
          title: "Corte",
          url: "termo/corte",
          icon: Scissors,
          state: true,
        },
        {
          title: "Embultaje",
          url: "bolsas/embultaje",
          icon: Boxes,
          state: true,
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
          icon: Cylinder,
          state: false,
        },
        {
          title: "Corte",
          url: "termoformado",
          icon: Scissors,
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
          icon: Waves,
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
