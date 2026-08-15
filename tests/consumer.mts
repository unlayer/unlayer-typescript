import { Unlayer } from '@unlayer/sdk';
import { createClient } from '@unlayer/sdk/client';

const sdk = new Unlayer({
  client: createClient({
    auth: 'test-token',
    baseUrl: 'https://api.unlayer.com',
    throwOnError: true,
  }),
});

void sdk.templates.listTemplates({
  query: { limit: 10, projectId: 'project-id' },
});
