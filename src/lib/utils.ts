import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Remplace les caractères non-alphanumériques par des tirets
    .replace(/^-+|-+$/g, '');    // Supprime les tirets en début et fin de chaîne
}