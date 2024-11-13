import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from "@vitejs/plugin-vue";
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
    plugins: [
        vue(),
        vueDevTools(),
        laravel({
            input: ['src/main.ts'],
            refresh: true,
        }),
    ],
    resolve: {
        alias: {
            vue: "vue/dist/vue.esm-bundler.js",
            '@': fileURLToPath(new URL('src', import.meta.url))
        },
    },
});
