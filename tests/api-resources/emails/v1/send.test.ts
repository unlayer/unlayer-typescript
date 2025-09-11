// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Unlayer from 'unlayer';

const client = new Unlayer({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource send', () => {
  // Prism tests are disabled
  test.skip('send: only required params', async () => {
    const responsePromise = client.emails.v1.send.send({ to: 'dev@stainless.com' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('send: required and optional params', async () => {
    const response = await client.emails.v1.send.send({
      to: 'dev@stainless.com',
      design: {},
      html: 'html',
      mergeTags: { foo: 'string' },
      subject: 'subject',
    });
  });

  // Prism tests are disabled
  test.skip('sendFromTemplate: only required params', async () => {
    const responsePromise = client.emails.v1.send.sendFromTemplate({
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

  // Prism tests are disabled
  test.skip('sendFromTemplate: required and optional params', async () => {
    const response = await client.emails.v1.send.sendFromTemplate({
      templateId: 'templateId',
      to: 'dev@stainless.com',
      mergeTags: { foo: 'string' },
      subject: 'subject',
    });
  });
});
