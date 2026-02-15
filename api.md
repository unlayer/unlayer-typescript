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

# Project

Types:

- <code><a href="./src/resources/project/project.ts">ProjectRetrieveResponse</a></code>

Methods:

- <code title="get /v3/project">client.project.<a href="./src/resources/project/project.ts">retrieve</a>({ ...params }) -> ProjectRetrieveResponse</code>

## Templates

Types:

- <code><a href="./src/resources/project/templates.ts">TemplateRetrieveResponse</a></code>
- <code><a href="./src/resources/project/templates.ts">TemplateListResponse</a></code>

Methods:

- <code title="get /v3/project/templates/{id}">client.project.templates.<a href="./src/resources/project/templates.ts">retrieve</a>(id, { ...params }) -> TemplateRetrieveResponse</code>
- <code title="get /v3/project/templates">client.project.templates.<a href="./src/resources/project/templates.ts">list</a>({ ...params }) -> TemplateListResponsesCursorPage</code>

# Workspaces

Types:

- <code><a href="./src/resources/workspaces.ts">WorkspaceRetrieveResponse</a></code>
- <code><a href="./src/resources/workspaces.ts">WorkspaceListResponse</a></code>

Methods:

- <code title="get /v3/workspaces/{workspaceId}">client.workspaces.<a href="./src/resources/workspaces.ts">retrieve</a>(workspaceID) -> WorkspaceRetrieveResponse</code>
- <code title="get /v3/workspaces">client.workspaces.<a href="./src/resources/workspaces.ts">list</a>() -> WorkspaceListResponse</code>
