// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Unlayer from 'unlayer';

const client = new Unlayer({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource v1', () => {
  // Prism tests are disabled
  test.skip('render: only required params', async () => {
    const responsePromise = client.pages.v1.render({ design: {} });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('render: required and optional params', async () => {
    const response = await client.pages.v1.render({ design: {}, mergeTags: { foo: 'string' } });
  });
});
