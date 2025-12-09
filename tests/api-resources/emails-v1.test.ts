// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Unlayer from '@unlayer/sdk';

const client = new Unlayer({ baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010' });

describe('resource emailsV1', () => {
  test('emailsRetrieve', async () => {
    const responsePromise = client.emailsV1.emailsRetrieve('id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('renderCreate: only required params', async () => {
    const responsePromise = client.emailsV1.renderCreate({ design: {} });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('renderCreate: required and optional params', async () => {
    const response = await client.emailsV1.renderCreate({ design: {}, mergeTags: { foo: 'string' } });
  });

  test('sendCreate: only required params', async () => {
    const responsePromise = client.emailsV1.sendCreate({ to: 'dev@stainless.com' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('sendCreate: required and optional params', async () => {
    const response = await client.emailsV1.sendCreate({
      to: 'dev@stainless.com',
      design: {},
      html: 'html',
      mergeTags: { foo: 'string' },
      subject: 'subject',
    });
  });

  test('sendTemplateTemplate: only required params', async () => {
    const responsePromise = client.emailsV1.sendTemplateTemplate({
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
    const response = await client.emailsV1.sendTemplateTemplate({
      templateId: 'templateId',
      to: 'dev@stainless.com',
      mergeTags: { foo: 'string' },
      subject: 'subject',
    });
  });
});
