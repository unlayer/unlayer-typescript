import { Unlayer } from '@unlayer/sdk';
import { createClient } from '@unlayer/sdk/client';

const sdk = new Unlayer({
  client: createClient({
    auth: 'test-token',
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

void sdk.templates.getTemplate({
  path: { id: 'template-id' },
  // @ts-expect-error high-level SDK operations always throw
  throwOnError: false,
});
