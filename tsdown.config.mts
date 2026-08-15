import { defineConfig } from 'tsdown';

export default defineConfig({
  clean: true,
  dts: {
    sourcemap: true,
  },
  entry: {
    'client/index': 'src/client/index.ts',
    index: 'src/index.ts',
  },
  failOnWarn: true,
  fixedExtension: true,
  format: ['esm', 'cjs'],
  platform: 'neutral',
  sourcemap: true,
  target: 'es2020',
});
