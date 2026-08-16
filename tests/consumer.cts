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

void sdk.templates.getTemplate({
  path: { id: 'template-id' },
  // @ts-expect-error responseStyle is available only on the low-level client
  responseStyle: 'fields',
});

void sdk.templates
  .getTemplate({
    path: { id: 'template-id' },
    throwOnError: false,
  })
  .then((result) => {
    // @ts-expect-error disabling errors means the result can be undefined
    void result.data;
  });
