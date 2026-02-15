# Convert

## FullToSimple

Types:

- <code><a href="./src/resources/convert/full-to-simple.ts">FullToSimpleCreateResponse</a></code>

Methods:

- <code title="post /convert/full-to-simple">client.convert.fullToSimple.<a href="./src/resources/convert/full-to-simple.ts">create</a>({ ...params }) -> FullToSimpleCreateResponse</code>

## SimpleToFull

Types:

- <code><a href="./src/resources/convert/simple-to-full.ts">SimpleToFullCreateResponse</a></code>

Methods:

- <code title="post /convert/simple-to-full">client.convert.simpleToFull.<a href="./src/resources/convert/simple-to-full.ts">create</a>({ ...params }) -> SimpleToFullCreateResponse</code>

# Documents

Types:

- <code><a href="./src/resources/documents/documents.ts">DocumentRetrieveResponse</a></code>

Methods:

- <code title="get /documents/v1/documents/{id}">client.documents.<a href="./src/resources/documents/documents.ts">retrieve</a>(id, { ...params }) -> DocumentRetrieveResponse</code>

## Generate

Types:

- <code><a href="./src/resources/documents/generate.ts">GenerateCreateResponse</a></code>

Methods:

- <code title="post /documents/v1/generate">client.documents.generate.<a href="./src/resources/documents/generate.ts">create</a>({ ...params }) -> GenerateCreateResponse</code>

## GenerateTemplate

Types:

- <code><a href="./src/resources/documents/generate-template.ts">GenerateTemplateCreateResponse</a></code>

Methods:

- <code title="post /documents/v1/generate/template">client.documents.generateTemplate.<a href="./src/resources/documents/generate-template.ts">create</a>({ ...params }) -> GenerateTemplateCreateResponse</code>

# Emails

Types:

- <code><a href="./src/resources/emails/emails.ts">EmailRetrieveResponse</a></code>

Methods:

- <code title="get /emails/v1/emails/{id}">client.emails.<a href="./src/resources/emails/emails.ts">retrieve</a>(id, { ...params }) -> EmailRetrieveResponse</code>

## Render

Types:

- <code><a href="./src/resources/emails/render.ts">RenderCreateResponse</a></code>

Methods:

- <code title="post /emails/v1/render">client.emails.render.<a href="./src/resources/emails/render.ts">create</a>({ ...params }) -> RenderCreateResponse</code>

## Send

Types:

- <code><a href="./src/resources/emails/send.ts">SendCreateResponse</a></code>

Methods:

- <code title="post /emails/v1/send">client.emails.send.<a href="./src/resources/emails/send.ts">create</a>({ ...params }) -> SendCreateResponse</code>

## SendTemplate

Types:

- <code><a href="./src/resources/emails/send-template.ts">SendTemplateCreateResponse</a></code>

Methods:

- <code title="post /emails/v1/send/template">client.emails.sendTemplate.<a href="./src/resources/emails/send-template.ts">create</a>({ ...params }) -> SendTemplateCreateResponse</code>

# Export

## HTML

Types:

- <code><a href="./src/resources/export/html.ts">HTMLRetrieveResponse</a></code>

Methods:

- <code title="get /export/v3/html">client.export.html.<a href="./src/resources/export/html.ts">retrieve</a>({ ...params }) -> HTMLRetrieveResponse</code>

## Image

Types:

- <code><a href="./src/resources/export/image.ts">ImageRetrieveResponse</a></code>

Methods:

- <code title="get /export/v3/image">client.export.image.<a href="./src/resources/export/image.ts">retrieve</a>({ ...params }) -> ImageRetrieveResponse</code>

## Pdf

Types:

- <code><a href="./src/resources/export/pdf.ts">PdfRetrieveResponse</a></code>

Methods:

- <code title="get /export/v3/pdf">client.export.pdf.<a href="./src/resources/export/pdf.ts">retrieve</a>({ ...params }) -> PdfRetrieveResponse</code>

## Zip

Types:

- <code><a href="./src/resources/export/zip.ts">ZipRetrieveResponse</a></code>

Methods:

- <code title="get /export/v3/zip">client.export.zip.<a href="./src/resources/export/zip.ts">retrieve</a>({ ...params }) -> ZipRetrieveResponse</code>

# Pages

## Render

Types:

- <code><a href="./src/resources/pages/render.ts">RenderCreateResponse</a></code>

Methods:

- <code title="post /pages/v1/render">client.pages.render.<a href="./src/resources/pages/render.ts">create</a>({ ...params }) -> RenderCreateResponse</code>

# Project

## Current

Types:

- <code><a href="./src/resources/project/current.ts">CurrentRetrieveResponse</a></code>

Methods:

- <code title="get /project/v1/current">client.project.current.<a href="./src/resources/project/current.ts">retrieve</a>({ ...params }) -> CurrentRetrieveResponse</code>

## Domains

Types:

- <code><a href="./src/resources/project/domains.ts">DomainCreateResponse</a></code>
- <code><a href="./src/resources/project/domains.ts">DomainRetrieveResponse</a></code>
- <code><a href="./src/resources/project/domains.ts">DomainUpdateResponse</a></code>
- <code><a href="./src/resources/project/domains.ts">DomainListResponse</a></code>

Methods:

- <code title="post /project/v1/domains">client.project.domains.<a href="./src/resources/project/domains.ts">create</a>({ ...params }) -> DomainCreateResponse</code>
- <code title="get /project/v1/domains/{id}">client.project.domains.<a href="./src/resources/project/domains.ts">retrieve</a>(id) -> DomainRetrieveResponse</code>
- <code title="put /project/v1/domains/{id}">client.project.domains.<a href="./src/resources/project/domains.ts">update</a>(id, { ...params }) -> DomainUpdateResponse</code>
- <code title="get /project/v1/domains">client.project.domains.<a href="./src/resources/project/domains.ts">list</a>({ ...params }) -> DomainListResponse</code>
- <code title="delete /project/v1/domains/{id}">client.project.domains.<a href="./src/resources/project/domains.ts">delete</a>(id) -> void</code>

## Templates

Types:

- <code><a href="./src/resources/project/templates.ts">TemplateCreateResponse</a></code>
- <code><a href="./src/resources/project/templates.ts">TemplateRetrieveResponse</a></code>
- <code><a href="./src/resources/project/templates.ts">TemplateUpdateResponse</a></code>
- <code><a href="./src/resources/project/templates.ts">TemplateListResponse</a></code>

Methods:

- <code title="post /project/v1/templates">client.project.templates.<a href="./src/resources/project/templates.ts">create</a>({ ...params }) -> TemplateCreateResponse</code>
- <code title="get /project/v1/templates/{id}">client.project.templates.<a href="./src/resources/project/templates.ts">retrieve</a>(id) -> TemplateRetrieveResponse</code>
- <code title="put /project/v1/templates/{id}">client.project.templates.<a href="./src/resources/project/templates.ts">update</a>(id, { ...params }) -> TemplateUpdateResponse</code>
- <code title="get /project/v1/templates">client.project.templates.<a href="./src/resources/project/templates.ts">list</a>({ ...params }) -> TemplateListResponse</code>
- <code title="delete /project/v1/templates/{id}">client.project.templates.<a href="./src/resources/project/templates.ts">delete</a>(id) -> void</code>

## Workspaces

Types:

- <code><a href="./src/resources/project/workspaces.ts">WorkspaceRetrieveResponse</a></code>
- <code><a href="./src/resources/project/workspaces.ts">WorkspaceListResponse</a></code>

Methods:

- <code title="get /project/v1/workspaces/{workspaceId}">client.project.workspaces.<a href="./src/resources/project/workspaces.ts">retrieve</a>(workspaceID) -> WorkspaceRetrieveResponse</code>
- <code title="get /project/v1/workspaces">client.project.workspaces.<a href="./src/resources/project/workspaces.ts">list</a>() -> WorkspaceListResponse</code>
