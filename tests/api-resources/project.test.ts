// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Unlayer from '@unlayer/sdk';

const client = new Unlayer({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource project', () => {
  test('apiKeysCreate: only required params', async () => {
    const responsePromise = client.project.apiKeysCreate({ projectId: 'projectId', name: 'name' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('apiKeysCreate: required and optional params', async () => {
    const response = await client.project.apiKeysCreate({
      projectId: 'projectId',
      name: 'name',
      domains: ['string'],
    });
  });

  test('apiKeysDelete', async () => {
    const responsePromise = client.project.apiKeysDelete('id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('apiKeysList: only required params', async () => {
    const responsePromise = client.project.apiKeysList({ projectId: 'projectId' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('apiKeysList: required and optional params', async () => {
    const response = await client.project.apiKeysList({ projectId: 'projectId' });
  });

  test('apiKeysRetrieve', async () => {
    const responsePromise = client.project.apiKeysRetrieve('id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('apiKeysUpdate', async () => {
    const responsePromise = client.project.apiKeysUpdate('id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('apiKeysUpdate: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.project.apiKeysUpdate(
        'id',
        {
          active: true,
          domains: ['string'],
          name: 'name',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Unlayer.NotFoundError);
  });

  test('currentList: only required params', async () => {
    const responsePromise = client.project.currentList({ projectId: 'projectId' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('currentList: required and optional params', async () => {
    const response = await client.project.currentList({ projectId: 'projectId' });
  });

  test('domainsCreate: only required params', async () => {
    const responsePromise = client.project.domainsCreate({ projectId: 'projectId', domain: 'domain' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('domainsCreate: required and optional params', async () => {
    const response = await client.project.domainsCreate({ projectId: 'projectId', domain: 'domain' });
  });

  test('domainsDelete', async () => {
    const responsePromise = client.project.domainsDelete('id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('domainsList: only required params', async () => {
    const responsePromise = client.project.domainsList({ projectId: 'projectId' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('domainsList: required and optional params', async () => {
    const response = await client.project.domainsList({ projectId: 'projectId' });
  });

  test('domainsRetrieve', async () => {
    const responsePromise = client.project.domainsRetrieve('id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('domainsUpdate', async () => {
    const responsePromise = client.project.domainsUpdate('id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('domainsUpdate: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.project.domainsUpdate('id', { domain: 'domain' }, { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Unlayer.NotFoundError);
  });

  test('templatesCreate: only required params', async () => {
    const responsePromise = client.project.templatesCreate({ projectId: 'projectId', name: 'name' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('templatesCreate: required and optional params', async () => {
    const response = await client.project.templatesCreate({
      projectId: 'projectId',
      name: 'name',
      body: 'body',
      subject: 'subject',
    });
  });

  test('templatesDelete', async () => {
    const responsePromise = client.project.templatesDelete('id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('templatesList: only required params', async () => {
    const responsePromise = client.project.templatesList({ projectId: 'projectId' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('templatesList: required and optional params', async () => {
    const response = await client.project.templatesList({ projectId: 'projectId' });
  });

  test('templatesRetrieve', async () => {
    const responsePromise = client.project.templatesRetrieve('id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('templatesUpdate', async () => {
    const responsePromise = client.project.templatesUpdate('id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('templatesUpdate: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.project.templatesUpdate(
        'id',
        {
          body: 'body',
          name: 'name',
          subject: 'subject',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Unlayer.NotFoundError);
  });

  test('tokensDelete', async () => {
    const responsePromise = client.project.tokensDelete('tokenId');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('tokensList', async () => {
    const responsePromise = client.project.tokensList();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('workspacesList', async () => {
    const responsePromise = client.project.workspacesList();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('workspacesRetrieve', async () => {
    const responsePromise = client.project.workspacesRetrieve('workspaceId');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
