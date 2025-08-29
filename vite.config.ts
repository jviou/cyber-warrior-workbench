import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc"; // garde -swc (Lovable)
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: true,              // écoute sur toutes les interfaces
    port: 4173,              // on uniformise sur 4173
    allowedHosts: true,      // autorise tout (le temps de valider)
  },
  preview: {
    host: true,
    port: 4173,
    strictPort: true,
    allowedHosts: true,      // idem en preview si tu repasses en preview
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
}));
