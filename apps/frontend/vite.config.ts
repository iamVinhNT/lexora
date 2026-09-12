/**
 * @file vite.config.ts
 * @description Vite configuration for the React frontend production and development builds.
 */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
