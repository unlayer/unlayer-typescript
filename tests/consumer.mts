import { Unlayer } from '@unlayer/sdk';
import { createClient } from '@unlayer/sdk/client';

const client = createClient({
  auth: 'test-token',
});

const sdk = new Unlayer({
  client,
});

// @ts-expect-error the high-level SDK requires an explicitly configured client
new Unlayer();

// @ts-expect-error generated registry keys are not part of the public SDK
new Unlayer({ client, key: 'tenant' });

// @ts-expect-error generated clients are not globally discoverable
void Unlayer.__registry;

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
