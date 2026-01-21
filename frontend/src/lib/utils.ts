import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatMileage(mileageInThousands: number) {
  return (mileageInThousands * 1000).toLocaleString('uk-UA');
}

export const getTransmissionLabel = (transmission: string) => {
  return transmission === "automatic" ? "Автомат" : "Механіка";
};

export const getFuelTypeLabel = (fuelType: string) => {
  switch (fuelType) {
      case "diesel":
          return "Дизель";
      case "electric":
          return "Електро";
      case "hybrid":
          return "Гібрид";
      default:
          return "Бензин";
  }
};

export const getDrivetrainLabel = (drivetrain: string) => {
  switch (drivetrain) {
      case "fwd":
          return "Передній";
      case "rwd":
          return "Задній";
      case "awd":
          return "Повний";
      default:
          return drivetrain;
  }
};

export const getSectionBg = (index: number) => {
    return index % 2 === 0 ? "bg-background" : "bg-background-muted";
};
