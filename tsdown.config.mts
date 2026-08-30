import { defineConfig } from 'tsdown';

export default defineConfig({
  clean: true,
  dts: {
    sourcemap: true,
  },
  entry: {
    index: 'src/index.ts',
  },
  failOnWarn: true,
  fixedExtension: true,
  format: ['esm', 'cjs'],
  outputOptions: {
    exports: 'named',
  },
  platform: 'neutral',
  sourcemap: true,
  target: 'es2020',
});
