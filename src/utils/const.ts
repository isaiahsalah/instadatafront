import {
  Scissors,
  Milk,
  Cylinder,
  Boxes,
  PackageOpen,
  PaintRoller,
  Blend,
  CircleOff,
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
      title: "Tanque",
      url: "#",
      items: [
        {
          title: "Mezcla",
          url: "tanque/mezcla",
          icon: Blend,
          state: true,
        },
        {
          title: "Rotomoldeo",
          url: "tanque/roto",
          icon: CircleOff,
          state: true,
        },
        {
          title: "Conexiones",
          url: "tanque/conex",
          icon: Milk,
          state: true,
        },
        {
          title: "Terminaciones",
          url: "tanque/term",
          icon: Milk,
          state: true,
        },
      ],
    },
  ],
};
