import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { viteCommonjs } from '@originjs/vite-plugin-commonjs'


// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), Components(), viteCommonjs()],
    optimizeDeps: {
        include: [
            '@cpaassdk/cpaas-sdk'
        ]
    },
    define: { 'global': {} }
})