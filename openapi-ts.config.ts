import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: 'https://api.unlayer.com/v3/docs/json',
  output: {
    clean: true,
    path: 'src',
  },
  plugins: [
    {
      name: '@hey-api/client-fetch',
      throwOnError: true,
    },
    {
      name: '@hey-api/sdk',
      operations: {
        methods: 'instance',
        strategy: (operation) => {
          const resource = operation.tags?.[0];
          if (!resource || !operation.operationId) return [];
          return [['Unlayer', resource, operation.operationId]];
        },
      },
      responseStyle: 'data',
    },
  ],
});
