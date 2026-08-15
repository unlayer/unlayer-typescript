import { Unlayer } from '@unlayer/sdk';
import { createClient } from '@unlayer/sdk/client';

const sdk = new Unlayer({
  client: createClient({
    auth: 'test-token',
    baseUrl: 'https://api.unlayer.com',
    throwOnError: true,
  }),
});

void sdk.templates.getTemplate({
  path: { id: 'template-id' },
});
