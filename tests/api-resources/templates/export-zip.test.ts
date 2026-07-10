// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Unlayer from '@unlayer/sdk';

const client = new Unlayer({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource exportZip', () => {
  test('create: only required params', async () => {
    const responsePromise = client.templates.exportZip.create({ design: {} });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: required and optional params', async () => {
    const response = await client.templates.exportZip.create({
      design: {},
      projectId: 'projectId',
      customJS: 'string',
      designTags: {},
      designTagsConfig: {},
      displayMode: 'email',
      editorVersion: 'editorVersion',
      language: 'language',
      languages: ['string'],
      mergeTags: {},
      mergeTagsSchema: {},
      safeHtml: true,
    });
  });
});
