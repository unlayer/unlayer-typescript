// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Unlayer from 'unlayer';

const client = new Unlayer({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource generate', () => {
  // Prism tests are disabled
  test.skip('create', async () => {
    const responsePromise = client.documents.v1.generate.create();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('create: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.documents.v1.generate.create(
        {
          design: {},
          filename: 'filename',
          html: 'html',
          mergeTags: { foo: 'string' },
          url: 'https://example.com',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Unlayer.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('createFromTemplate: only required params', async () => {
    const responsePromise = client.documents.v1.generate.createFromTemplate({ templateId: 'templateId' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('createFromTemplate: required and optional params', async () => {
    const response = await client.documents.v1.generate.createFromTemplate({
      templateId: 'templateId',
      filename: 'filename',
      mergeTags: { foo: 'string' },
    });
  });
});
