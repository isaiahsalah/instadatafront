import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const randomNumber = (from: number, to: number) => {
  return Math.floor(Math.random() * (to - from + 1)) + from;
};
