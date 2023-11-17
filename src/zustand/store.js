import { create } from "zustand";

export const useStore = create((set) => ({
  datoscontratoData: [],
  setDatoscontratoData: (data) => {
    console.log("Actualizando datoscontratoData:", data);
    set({ datoscontratoData: data });
  },
}));
