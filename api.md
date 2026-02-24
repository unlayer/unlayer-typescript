# Convert

## FullToSimple

Types:

- <code><a href="./src/resources/convert/full-to-simple.ts">FullToSimpleCreateResponse</a></code>

Methods:

- <code title="post /v3/convert/full-to-simple">client.convert.fullToSimple.<a href="./src/resources/convert/full-to-simple.ts">create</a>({ ...params }) -> FullToSimpleCreateResponse</code>

## SimpleToFull

Types:

- <code><a href="./src/resources/convert/simple-to-full.ts">SimpleToFullCreateResponse</a></code>

Methods:

- <code title="post /v3/convert/simple-to-full">client.convert.simpleToFull.<a href="./src/resources/convert/simple-to-full.ts">create</a>({ ...params }) -> SimpleToFullCreateResponse</code>

# Projects

Types:

- <code><a href="./src/resources/projects.ts">ProjectRetrieveResponse</a></code>

Methods:

- <code title="get /v3/projects/{id}">client.projects.<a href="./src/resources/projects.ts">retrieve</a>(id) -> ProjectRetrieveResponse</code>

# Templates

Types:

- <code><a href="./src/resources/templates.ts">TemplateRetrieveResponse</a></code>
- <code><a href="./src/resources/templates.ts">TemplateListResponse</a></code>

Methods:

- <code title="get /v3/templates/{id}">client.templates.<a href="./src/resources/templates.ts">retrieve</a>(id, { ...params }) -> TemplateRetrieveResponse</code>
- <code title="get /v3/templates">client.templates.<a href="./src/resources/templates.ts">list</a>({ ...params }) -> TemplateListResponsesCursorPage</code>

# Workspaces

Types:

- <code><a href="./src/resources/workspaces.ts">WorkspaceRetrieveResponse</a></code>
- <code><a href="./src/resources/workspaces.ts">WorkspaceListResponse</a></code>

Methods:

- <code title="get /v3/workspaces/{workspaceId}">client.workspaces.<a href="./src/resources/workspaces.ts">retrieve</a>(workspaceID) -> WorkspaceRetrieveResponse</code>
- <code title="get /v3/workspaces">client.workspaces.<a href="./src/resources/workspaces.ts">list</a>() -> WorkspaceListResponse</code>
