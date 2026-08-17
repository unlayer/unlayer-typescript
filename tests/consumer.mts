import { Unlayer } from '@unlayer/sdk';
import { createClient } from '@unlayer/sdk/client';

const sdk = new Unlayer({
  client: createClient({
    auth: 'test-token',
  }),
});

void sdk.templates.listTemplates({
  query: { limit: 10, projectId: 'project-id' },
});

// SDK methods have one stable, data-only response shape.
void sdk.templates.listTemplates({
  // @ts-expect-error responseStyle is available only on the low-level client
  responseStyle: 'fields',
});

void sdk.templates.listTemplates({
  // @ts-expect-error high-level SDK operations always throw
  throwOnError: false,
});
