import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { Buffer } from 'node:buffer';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    base: '/newyear/',
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [react()],
    define: {
      'import.meta.env.VITE_GEMINI_API_KEY': JSON.stringify(
        env.GEMINI_API_KEY
          ? Buffer.from(
            env.GEMINI_API_KEY.split('').map((char, i) =>
              String.fromCharCode(char.charCodeAt(0) ^ "NewYear2026_Horse".charCodeAt(i % "NewYear2026_Horse".length))
            ).join('')
          ).toString('base64')
          : ''
      )
    },
    resolve: {
      alias: {
        '@': path.resolve(process.cwd(), '.'),
      }
    }
  };
});
