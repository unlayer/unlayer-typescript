// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Unlayer from '@unlayer/sdk';

const client = new Unlayer({
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource documents', () => {
  test('documentsRetrieve: only required params', async () => {
    const responsePromise = client.documents.documentsRetrieve('id', { projectId: 'projectId' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('documentsRetrieve: required and optional params', async () => {
    const response = await client.documents.documentsRetrieve('id', { projectId: 'projectId' });
  });

  test('generateCreate: only required params', async () => {
    const responsePromise = client.documents.generateCreate({ projectId: 'projectId' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('generateCreate: required and optional params', async () => {
    const response = await client.documents.generateCreate({
      projectId: 'projectId',
      design: { foo: 'bar' },
      filename: 'filename',
      html: 'html',
      mergeTags: { foo: 'string' },
      url: 'https://example.com',
    });
  });

  test('generateTemplateTemplate: only required params', async () => {
    const responsePromise = client.documents.generateTemplateTemplate({
      projectId: 'projectId',
      templateId: 'templateId',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('generateTemplateTemplate: required and optional params', async () => {
    const response = await client.documents.generateTemplateTemplate({
      projectId: 'projectId',
      templateId: 'templateId',
      filename: 'filename',
      mergeTags: { foo: 'string' },
    });
  });
});
