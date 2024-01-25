import { defineConfig } from "vite"

export default defineConfig(() => {
    return {
        plugins: [],
        build: {
            target: "ES2022"
        }
    };
});