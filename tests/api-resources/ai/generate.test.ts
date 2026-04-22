// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Unlayer from '@unlayer/sdk';

const client = new Unlayer({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource generate', () => {
  test('create: only required params', async () => {
    const responsePromise = client.ai.generate.create({
      displayMode: 'email',
      input: [{ type: 'text' }],
      output: { blockType: 'template', type: 'json' },
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: required and optional params', async () => {
    const response = await client.ai.generate.create({
      displayMode: 'email',
      input: [
        {
          type: 'text',
          id: 'id',
          blockType: 'blockType',
          data: { foo: 'bar' },
          html: 'html',
          schemaVersion: 0,
          text: 'text',
          url: 'url',
        },
      ],
      output: { blockType: 'template', type: 'json' },
      projectId: 'projectId',
      context: {
        availableTools: ['string'],
        customTools: [
          {
            options: { foo: 'bar' },
            slug: 'slug',
          },
        ],
      },
      model: 'anthropic/claude-opus-4-6',
    });
  });
});
