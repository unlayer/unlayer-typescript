import { defineConfig } from '@hey-api/openapi-ts';

const ignoredOperations = new Set(['GET /v3/templates/generate']);

export default defineConfig({
  input: './openapi.json',
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
          if (!resource || !operation.operationId) {
            const operationKey = `${operation.method.toUpperCase()} ${operation.path}`;
            if (!ignoredOperations.has(operationKey)) {
              throw new Error(`${operationKey} must define a tag and operationId`);
            }
            console.warn(`Skipping known OpenAPI stub: ${operationKey}`);
            return [];
          }
          return [['Unlayer', resource, operation.operationId]];
        },
      },
      responseStyle: 'data',
    },
  ],
});
