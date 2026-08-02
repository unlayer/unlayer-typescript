// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Unlayer from '@unlayer/sdk';

const client = new Unlayer({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource template', () => {
  test('create: only required params', async () => {
    const responsePromise = client.emails.template.create({
      from: 'from',
      templateId: '496',
      to: ['dev@stainless.com'],
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
    const response = await client.emails.template.create({
      from: 'from',
      templateId: '496',
      to: ['dev@stainless.com'],
      attachments: [
        {
          content: 'content',
          contentType: 'application/pdf',
          filename: 'filename',
        },
      ],
      bcc: [],
      cc: [],
      headers: { foo: 'J!Q0Ok0bzJb7' },
      replyTo: 'dev@stainless.com',
      subject: 'subject',
      tags: { foo: '_1' },
      text: 'text',
      variables: { foo: 'string' },
      'idempotency-key': 'idempotency-key',
    });
  });
});
