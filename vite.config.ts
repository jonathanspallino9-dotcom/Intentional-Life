import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
export default defineConfig({plugins:[react(),VitePWA({registerType:'autoUpdate',includeAssets:[],manifest:{name:'Intentional',short_name:'Intentional',description:'Local-first intentional productivity',theme_color:'#0b1424',background_color:'#0b1424',display:'standalone',start_url:'/'},workbox:{navigateFallback:'index.html'}})]});
