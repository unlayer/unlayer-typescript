// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Unlayer from '@unlayer/sdk';

const client = new Unlayer({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource emails', () => {
  test('create: only required params', async () => {
    const responsePromise = client.emails.create({
      from: 'from',
      html: 'html',
      subject: 'subject',
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
    const response = await client.emails.create({
      from: 'from',
      html: 'html',
      subject: 'subject',
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
      tags: { foo: '_1' },
      text: 'text',
      'idempotency-key': 'idempotency-key',
    });
  });

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

  test('list', async () => {
    const responsePromise = client.emails.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.emails.list(
        {
          cursor: 'cursor',
          from: '2019-12-27',
          limit: 1,
          projectId: 'projectId',
          search: 'search',
          status: 'queued',
          tag: 'tag',
          to: '2019-12-27',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Unlayer.NotFoundError);
  });
});
