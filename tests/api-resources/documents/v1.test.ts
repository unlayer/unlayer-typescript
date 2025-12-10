// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Unlayer from '@unlayer/sdk';

const client = new Unlayer({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource v1', () => {
  test('documentsRetrieve', async () => {
    const responsePromise = client.documents.v1.documentsRetrieve('id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('generateCreate: only required params', async () => {
    const responsePromise = client.documents.v1.generateCreate({ design: { counters: 'bar', body: 'bar' } });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('generateCreate: required and optional params', async () => {
    const response = await client.documents.v1.generateCreate({
      design: { counters: 'bar', body: 'bar' },
      filename: 'filename',
      html: 'html',
      mergeTags: { foo: 'string' },
      url: 'https://example.com',
    });
  });

  test('generateTemplateTemplate: only required params', async () => {
    const responsePromise = client.documents.v1.generateTemplateTemplate({ templateId: 'templateId' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('generateTemplateTemplate: required and optional params', async () => {
    const response = await client.documents.v1.generateTemplateTemplate({
      templateId: 'templateId',
      filename: 'filename',
      mergeTags: { foo: 'string' },
    });
  });
});
