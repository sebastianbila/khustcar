import { CarFilters } from '@/types/car';
import { create } from 'zustand';

interface FiltersState {
  filters: CarFilters;
  localSearch: string;
  localBrand: string;
  localModel: string;
  localMinYear: string;
  localMaxYear: string;
  localMinPrice: string;
  localMaxPrice: string;
  localMinMileage: string;
  localMaxMileage: string;
  localFuelType: string;
  localTransmission: string;
  localDrivetrain: string;
  localColor: string;
  localInStock: string;

  setFilters: (filters: CarFilters) => void;
  setLocalSearch: (value: string) => void;
  setLocalBrand: (value: string) => void;
  setLocalModel: (value: string) => void;
  setLocalMinYear: (value: string) => void;
  setLocalMaxYear: (value: string) => void;
  setLocalMinPrice: (value: string) => void;
  setLocalMaxPrice: (value: string) => void;
  setLocalMinMileage: (value: string) => void;
  setLocalMaxMileage: (value: string) => void;
  setLocalFuelType: (value: string) => void;
  setLocalTransmission: (value: string) => void;
  setLocalDrivetrain: (value: string) => void;
  setLocalColor: (value: string) => void;
  setLocalInStock: (value: string) => void;

  updateFilters: (newFilters: CarFilters) => void;

  resetFilters: () => void;
  initializeFromParams: (searchParams: URLSearchParams) => void;
}

export const useFiltersStore = create<FiltersState>((set) => ({
  filters: {},
  localSearch: '',
  localBrand: '',
  localModel: '',
  localMinYear: '',
  localMaxYear: '',
  localMinPrice: '',
  localMaxPrice: '',
  localMinMileage: '',
  localMaxMileage: '',
  localFuelType: '',
  localTransmission: '',
  localDrivetrain: '',
  localColor: '',
  localInStock: '',

  setFilters: (filters) => set({ filters }),
  setLocalSearch: (value) => set({ localSearch: value }),
  setLocalBrand: (value) => set({ localBrand: value }),
  setLocalModel: (value) => set({ localModel: value }),
  setLocalMinYear: (value) => set({ localMinYear: value }),
  setLocalMaxYear: (value) => set({ localMaxYear: value }),
  setLocalMinPrice: (value) => set({ localMinPrice: value }),
  setLocalMaxPrice: (value) => set({ localMaxPrice: value }),
  setLocalMinMileage: (value) => set({ localMinMileage: value }),
  setLocalMaxMileage: (value) => set({ localMaxMileage: value }),
  setLocalFuelType: (value) => set({ localFuelType: value }),
  setLocalTransmission: (value) => set({ localTransmission: value }),
  setLocalDrivetrain: (value) => set({ localDrivetrain: value }),
  setLocalColor: (value) => set({ localColor: value }),
  setLocalInStock: (value) => set({ localInStock: value }),

  updateFilters: (newFilters) => {
    const params = new URLSearchParams();
    if (newFilters.search) params.set("search", newFilters.search);
    if (newFilters.brand) params.set("brand", newFilters.brand);
    if (newFilters.model) params.set("model", newFilters.model);
    if (newFilters.minYear)
        params.set("minYear", newFilters.minYear.toString());
    if (newFilters.maxYear)
        params.set("maxYear", newFilters.maxYear.toString());
    if (newFilters.minPrice)
        params.set("minPrice", newFilters.minPrice.toString());
    if (newFilters.maxPrice)
        params.set("maxPrice", newFilters.maxPrice.toString());
    if (newFilters.minMileage)
        params.set("minMileage", newFilters.minMileage.toString());
    if (newFilters.maxMileage)
        params.set("maxMileage", newFilters.maxMileage.toString());
    if (newFilters.fuelType) params.set("fuelType", newFilters.fuelType);
    if (newFilters.transmission)
        params.set("transmission", newFilters.transmission);
    if (newFilters.drivetrain)
        params.set("drivetrain", newFilters.drivetrain);
    if (newFilters.color) params.set("color", newFilters.color);
    if (newFilters.inStock !== undefined)
        params.set("inStock", newFilters.inStock.toString());

    const queryString = params.toString();
    if (typeof window !== 'undefined') {
        window.history.pushState(
            null,
            "",
            queryString ? `/catalog?${queryString}` : "/catalog",
        );
    }

    set({ filters: newFilters });
  },

  resetFilters: () => {
    if (typeof window !== 'undefined') {
        window.history.pushState(null, "", "/catalog");
    }
    set({
        localSearch: '',
        localBrand: '',
        localModel: '',
        localMinYear: '',
        localMaxYear: '',
        localMinPrice: '',
        localMaxPrice: '',
        localMinMileage: '',
        localMaxMileage: '',
        localFuelType: '',
        localTransmission: '',
        localDrivetrain: '',
        localColor: '',
        localInStock: '',
        filters: {}
    });
  },

  initializeFromParams: (searchParams: URLSearchParams) => {
    const params: CarFilters = {
        search: searchParams.get("search") || undefined,
        brand: searchParams.get("brand") || undefined,
        model: searchParams.get("model") || undefined,
        minYear: searchParams.get("minYear")
            ? parseInt(searchParams.get("minYear")!)
            : undefined,
        maxYear: searchParams.get("maxYear")
            ? parseInt(searchParams.get("maxYear")!)
            : undefined,
        minPrice: searchParams.get("minPrice")
            ? parseInt(searchParams.get("minPrice")!)
            : undefined,
        maxPrice: searchParams.get("maxPrice")
            ? parseInt(searchParams.get("maxPrice")!)
            : undefined,
        minMileage: searchParams.get("minMileage")
            ? parseInt(searchParams.get("minMileage")!)
            : undefined,
        maxMileage: searchParams.get("maxMileage")
            ? parseInt(searchParams.get("maxMileage")!)
            : undefined,
        fuelType: (searchParams.get("fuelType") as any) || undefined,
        transmission:
            (searchParams.get("transmission") as any) || undefined,
        drivetrain: (searchParams.get("drivetrain") as any) || undefined,
        color: searchParams.get("color") || undefined,
        inStock:
            searchParams.get("inStock") === "true"
                ? true
                : searchParams.get("inStock") === "false"
                  ? false
                  : undefined,
    };

    set({
        filters: params,
        localSearch: params.search || "",
        localBrand: params.brand || "",
        localModel: params.model || "",
        localMinYear: params.minYear?.toString() || "",
        localMaxYear: params.maxYear?.toString() || "",
        localMinPrice: params.minPrice?.toString() || "",
        localMaxPrice: params.maxPrice?.toString() || "",
        localMinMileage: params.minMileage?.toString() || "",
        localMaxMileage: params.maxMileage?.toString() || "",
        localFuelType: params.fuelType || "",
        localTransmission: params.transmission || "",
        localDrivetrain: params.drivetrain || "",
        localColor: params.color || "",
        localInStock: params.inStock === true
            ? "true"
            : params.inStock === false
              ? "false"
              : "",
    });
  }
}));
