import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
  },
  base: "/", //Asegura que las rutas sean relativas
  server: {
    fs: {
      strict: false, //Permite servir archivos fuera del root
    },
  },
});
