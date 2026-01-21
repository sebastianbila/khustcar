import { CarFilters } from '@/types/car';
import { create } from 'zustand';

interface FiltersState {
  filters: CarFilters;

  setFilter: (key: keyof CarFilters, value: any) => void;
  setFilters: (filters: CarFilters) => void;
  resetFilters: () => void;
  initializeFromParams: (searchParams: URLSearchParams) => void;
  syncURL: () => void;
}

let debounceTimer: NodeJS.Timeout | null = null;

export const useFiltersStore = create<FiltersState>((set, get) => ({
  filters: {},

  setFilter: (key, value) => {
    const currentFilters = get().filters;
    const newFilters = { ...currentFilters, [key]: value };

    // Remove undefined or empty string values to keep object clean
    if (value === "" || value === undefined || value === null) {
        delete newFilters[key];
    }

    set({ filters: newFilters });
  },

  setFilters: (filters) => set({ filters }),

  resetFilters: () => {
    if (typeof window !== 'undefined') {
        window.history.pushState(null, "", "/catalog");
    }
    set({ filters: {} });
  },

  initializeFromParams: (searchParams: URLSearchParams) => {
    const inStockParam = searchParams.get("inStock");
    let inStockVal: boolean | undefined = undefined;
    if (inStockParam === "true") inStockVal = true;
    else if (inStockParam === "false") inStockVal = false;

    const params: CarFilters = {
        search: searchParams.get("search") || undefined,
        brand: searchParams.get("brand") || undefined,
        model: searchParams.get("model") || undefined,
        minYear: searchParams.get("minYear")
            ? Number.parseInt(searchParams.get("minYear")!)
            : undefined,
        maxYear: searchParams.get("maxYear")
            ? Number.parseInt(searchParams.get("maxYear")!)
            : undefined,
        minPrice: searchParams.get("minPrice")
            ? Number.parseInt(searchParams.get("minPrice")!)
            : undefined,
        maxPrice: searchParams.get("maxPrice")
            ? Number.parseInt(searchParams.get("maxPrice")!)
            : undefined,
        minMileage: searchParams.get("minMileage")
            ? Number.parseInt(searchParams.get("minMileage")!)
            : undefined,
        maxMileage: searchParams.get("maxMileage")
            ? Number.parseInt(searchParams.get("maxMileage")!)
            : undefined,
        fuelType: (searchParams.get("fuelType") as any) || undefined,
        transmission:
            (searchParams.get("transmission") as any) || undefined,
        drivetrain: (searchParams.get("drivetrain") as any) || undefined,
        color: searchParams.get("color") || undefined,
        inStock: inStockVal,
    };

    set({ filters: params });
  },

  syncURL: () => {
      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
          const { filters } = get();
          const params = new URLSearchParams();
          if (filters.search) params.set("search", filters.search);
          if (filters.brand) params.set("brand", filters.brand);
          if (filters.model) params.set("model", filters.model);
          if (filters.minYear) params.set("minYear", filters.minYear.toString());
          if (filters.maxYear) params.set("maxYear", filters.maxYear.toString());
          if (filters.minPrice) params.set("minPrice", filters.minPrice.toString());
          if (filters.maxPrice) params.set("maxPrice", filters.maxPrice.toString());
          if (filters.minMileage) params.set("minMileage", filters.minMileage.toString());
          if (filters.maxMileage) params.set("maxMileage", filters.maxMileage.toString());
          if (filters.fuelType) params.set("fuelType", filters.fuelType);
          if (filters.transmission) params.set("transmission", filters.transmission);
          if (filters.drivetrain) params.set("drivetrain", filters.drivetrain);
          if (filters.color) params.set("color", filters.color);
          if (filters.inStock !== undefined) params.set("inStock", filters.inStock.toString());

          const queryString = params.toString();
          const url = queryString ? `/catalog?${queryString}` : "/catalog";
          if (typeof window !== 'undefined') {
              window.history.replaceState(null, "", url);
          }
      }, 500);
  }
}));
