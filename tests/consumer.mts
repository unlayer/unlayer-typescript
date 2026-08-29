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

void defaultSdk.templates.retrieve('template-id', { projectId: 'project-id' });
void sdk.projects.retrieve('project-id');
void sdk.workspaces.list();
void sdk.workspaces.list({ fetchOptions: { cache: 'no-store' } });
void sdk.workspaces.retrieve('workspace-id');
void sdk.convert.fullToSimple.create({ design: { body: {} } });
void sdk.convert.simpleToFull.create({ design: { body: {} } });

const params: TemplateListParams = { limit: 10, name: 'Welcome' };
void sdk.templates.list(params).catch(() => undefined);

const consumePages = async (): Promise<void> => {
  for await (const template of sdk.templates.list(params)) {
    void template.id;
  }
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

// @ts-expect-error Blocks is in OpenAPI but is not in the public SDK allowlist.
void sdk.blocks;

// @ts-expect-error Generated operation-ID methods are internal implementation details.
void sdk.templates.listTemplates;

// @ts-expect-error Native client injection is not part of the single public API.
new Unlayer({ client: {} });
