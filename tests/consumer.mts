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

// SDK methods have one stable, data-only response shape.
void sdk.templates.listTemplates({
  // @ts-expect-error responseStyle is available only on the low-level client
  responseStyle: 'fields',
});

void sdk.templates.listTemplates({ throwOnError: false }).then((result) => {
  // @ts-expect-error disabling errors means the result can be undefined
  void result.has_more;
});
