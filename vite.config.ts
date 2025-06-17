import { defineConfig } from 'vite';
// import basicSsl from '@vitejs/plugin-basic-ssl';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        // basicSsl(),  // For Dev only
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
});
