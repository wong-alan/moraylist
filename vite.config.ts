import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        rollupOptions: {
            output: {
                manualChunks: (id) => {
                    if (id.includes("node_modules")) {
                        if (id.includes("@mui")) {
                            return "mui";
                        }
                        if (id.includes("gsap")) {
                            return "gsap"
                        }
                        return "vendor";
                    }
                }
            },
        },
    },
    plugins: [
        react(),
        svgr(),
        visualizer({
            template: "treemap",
            open: true,
            gzipSize: true,
            brotliSize: true,
            filename: "analyse.html",
        })
    ],
})
