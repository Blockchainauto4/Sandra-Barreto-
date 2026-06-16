import path from 'path';
import fs from 'fs';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    
    // Dynamically detect where the 'components' folder is located (root /components or /src/components)
    const hasSrcComponents = fs.existsSync(path.resolve(__dirname, 'src/components'));
    const componentsPath = hasSrcComponents 
      ? path.resolve(__dirname, 'src/components')
      : path.resolve(__dirname, 'components');

    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.VITE_ADMIN_PASSWORD': JSON.stringify(env.VITE_ADMIN_PASSWORD)
      },
      resolve: {
        alias: [
          { find: '@', replacement: path.resolve(__dirname, '.') },
          { find: /^\.\/components\//, replacement: componentsPath + '/' },
          { find: /^\.\.\/components\//, replacement: componentsPath + '/' }
        ]
      }
    };
});
