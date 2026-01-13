// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Unlayer from '@unlayer/sdk';

const client = new Unlayer({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource emails', () => {
  test('retrieve', async () => {
    const responsePromise = client.emails.retrieve('id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('retrieve: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.emails.retrieve('id', { projectId: 'projectId' }, { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Unlayer.NotFoundError);
  });

  test('renderCreate: only required params', async () => {
    const responsePromise = client.emails.renderCreate({ design: { counters: 'bar', body: 'bar' } });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('renderCreate: required and optional params', async () => {
    const response = await client.emails.renderCreate({
      design: { counters: 'bar', body: 'bar' },
      projectId: 'projectId',
      mergeTags: { foo: 'string' },
    });
  });

  test('sendCreate: only required params', async () => {
    const responsePromise = client.emails.sendCreate({
      design: { counters: 'bar', body: 'bar' },
      to: 'test@example.com',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('sendCreate: required and optional params', async () => {
    const response = await client.emails.sendCreate({
      design: { counters: 'bar', body: 'bar' },
      to: 'test@example.com',
      projectId: 'projectId',
      html: 'html',
      mergeTags: { foo: 'string' },
      subject: 'Test',
    });
  });

  test('sendTemplateTemplate: only required params', async () => {
    const responsePromise = client.emails.sendTemplateTemplate({
      templateId: 'templateId',
      to: 'dev@stainless.com',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('sendTemplateTemplate: required and optional params', async () => {
    const response = await client.emails.sendTemplateTemplate({
      templateId: 'templateId',
      to: 'dev@stainless.com',
      projectId: 'projectId',
      mergeTags: { foo: 'string' },
      subject: 'subject',
    });
  });
});
