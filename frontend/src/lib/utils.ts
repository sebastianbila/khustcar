import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatMileage(mileageInThousands: number) {
  return (mileageInThousands * 1000).toLocaleString('uk-UA');
}
