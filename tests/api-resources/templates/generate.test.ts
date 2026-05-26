// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Unlayer from '@unlayer/sdk';

const client = new Unlayer({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource generate', () => {
  test('create: only required params', async () => {
    const responsePromise = client.templates.generate.create({
      messages: [{ content: [{ type: 'text' }], role: 'user' }],
      output: { displayMode: 'email', kind: 'template' },
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
    const response = await client.templates.generate.create({
      messages: [
        {
          content: [
            {
              type: 'text',
              file: { url: 'url', mediaType: 'mediaType' },
              image: 'image',
              text: 'text',
            },
          ],
          role: 'user',
          metadata: { action: { id: 'id' } },
        },
      ],
      output: {
        displayMode: 'email',
        kind: 'template',
        schemaVersion: 0,
      },
      projectId: 'projectId',
      context: {
        availableTools: ['string'],
        customTools: [
          {
            options: { foo: 'bar' },
            slug: 'slug',
          },
        ],
        fullDesign: { foo: 'bar' },
        selection: {
          id: 'string',
          collection: 'pages',
          value: 'value',
        },
      },
      conversationId: 'conversationId',
      locale: 'locale',
      model: 'model',
    });
  });

  test('retrieve', async () => {
    const responsePromise = client.templates.generate.retrieve();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
