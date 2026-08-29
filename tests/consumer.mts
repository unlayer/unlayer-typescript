import UnlayerDefault, { APIConnectionError, APIError, Unlayer } from '@unlayer/sdk';
import type { ClientOptions, TemplateListParams } from '@unlayer/sdk';

const options: ClientOptions = {
  baseURL: 'https://api.unlayer.com',
  maxRetries: 3,
  personalAccessToken: 'test-token',
  projectID: 'project-id',
  timeout: 60_000,
};

const sdk = new Unlayer(options);
const defaultSdk = new UnlayerDefault(options);

const templatePromise = defaultSdk.templates.retrieve('template-id', { projectId: 'project-id' });
void templatePromise.asResponse();
void templatePromise.withResponse();
void sdk.projects.retrieve('project-id');
void sdk.workspaces.list();
void sdk.workspaces.list({ fetchOptions: { cache: 'no-store' } });
void sdk.workspaces.list({ headers: { 'X-Remove-Me': null } });
void sdk.workspaces.list({ headers: { Authorization: 'Bearer custom' } });
void sdk.workspaces.list({ headers: { Authorization: null } });
void sdk.workspaces.retrieve('workspace-id');
void sdk.convert.fullToSimple.create({ design: { body: {} } });
void sdk.convert.simpleToFull.create({ design: { body: {} } });

const params: TemplateListParams = { limit: 10, name: 'Welcome' };
void sdk.templates.list(params).catch(() => undefined);

const consumePages = async (): Promise<void> => {
  for await (const template of sdk.templates.list(params)) {
    void template.id;
  }
  const pagePromise = sdk.templates.list(params);
  void pagePromise.asResponse();
  void pagePromise.withResponse();
  const firstPage = await pagePromise;
  void firstPage.getPaginatedItems();
  void firstPage.hasNextPage();
  void firstPage.getNextPage();
  for await (const page of firstPage.iterPages()) void page.data;
  for await (const template of firstPage) void template.id;
};

void consumePages;
void UnlayerDefault.APIError;
void (undefined as unknown as UnlayerDefault.TemplateListParams);
void (undefined as unknown as UnlayerDefault.TemplateListResponsesCursorPage);
void (undefined as unknown as UnlayerDefault.TemplateRetrieveResponse.Data);
void (undefined as unknown as UnlayerDefault.ProjectRetrieveResponse.Data.Workspace);
void (undefined as unknown as UnlayerDefault.Templates.TemplateListParams);
void (undefined as unknown as UnlayerDefault.Convert.FullToSimpleCreateParams);
void (undefined as unknown as UnlayerDefault.CursorPageParams);
void (undefined as unknown as UnlayerDefault.CursorPageResponse<unknown>);
void (undefined as unknown as APIError);

const connectionError: APIError = new APIConnectionError();
void connectionError;

class CustomUnlayer extends Unlayer {}
const customSdk: CustomUnlayer = new CustomUnlayer(options).withOptions({ maxRetries: 1 });
void customSdk;

// @ts-expect-error Blocks is in OpenAPI but is not in the public SDK allowlist.
void sdk.blocks;

// @ts-expect-error Generated operation-ID methods are internal implementation details.
void sdk.templates.listTemplates;

// @ts-expect-error Native client injection is not part of the single public API.
new Unlayer({ client: {} });

// @ts-expect-error Native client overrides are not accepted per request either.
void sdk.workspaces.list({ client: {} });
