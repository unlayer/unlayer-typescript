# Documents

Types:

- <code><a href="./src/resources/documents.ts">DocumentDocumentsRetrieveResponse</a></code>
- <code><a href="./src/resources/documents.ts">DocumentGenerateCreateResponse</a></code>
- <code><a href="./src/resources/documents.ts">DocumentGenerateTemplateTemplateResponse</a></code>

Methods:

- <code title="get /documents/v1/documents/{id}">client.documents.<a href="./src/resources/documents.ts">documentsRetrieve</a>(id, { ...params }) -> DocumentDocumentsRetrieveResponse</code>
- <code title="post /documents/v1/generate">client.documents.<a href="./src/resources/documents.ts">generateCreate</a>({ ...params }) -> DocumentGenerateCreateResponse</code>
- <code title="post /documents/v1/generate/template">client.documents.<a href="./src/resources/documents.ts">generateTemplateTemplate</a>({ ...params }) -> DocumentGenerateTemplateTemplateResponse</code>

# Emails

Types:

- <code><a href="./src/resources/emails.ts">EmailRetrieveResponse</a></code>
- <code><a href="./src/resources/emails.ts">EmailRenderCreateResponse</a></code>
- <code><a href="./src/resources/emails.ts">EmailSendCreateResponse</a></code>
- <code><a href="./src/resources/emails.ts">EmailSendTemplateTemplateResponse</a></code>

Methods:

- <code title="get /emails/v1/emails/{id}">client.emails.<a href="./src/resources/emails.ts">retrieve</a>(id, { ...params }) -> EmailRetrieveResponse</code>
- <code title="post /emails/v1/render">client.emails.<a href="./src/resources/emails.ts">renderCreate</a>({ ...params }) -> EmailRenderCreateResponse</code>
- <code title="post /emails/v1/send">client.emails.<a href="./src/resources/emails.ts">sendCreate</a>({ ...params }) -> EmailSendCreateResponse</code>
- <code title="post /emails/v1/send/template">client.emails.<a href="./src/resources/emails.ts">sendTemplateTemplate</a>({ ...params }) -> EmailSendTemplateTemplateResponse</code>

# Export

Types:

- <code><a href="./src/resources/export.ts">ExportHTMLListResponse</a></code>
- <code><a href="./src/resources/export.ts">ExportImageListResponse</a></code>
- <code><a href="./src/resources/export.ts">ExportPdfListResponse</a></code>
- <code><a href="./src/resources/export.ts">ExportZipListResponse</a></code>

Methods:

- <code title="get /export/v3/html">client.export.<a href="./src/resources/export.ts">htmlList</a>({ ...params }) -> ExportHTMLListResponse</code>
- <code title="get /export/v3/image">client.export.<a href="./src/resources/export.ts">imageList</a>({ ...params }) -> ExportImageListResponse</code>
- <code title="get /export/v3/pdf">client.export.<a href="./src/resources/export.ts">pdfList</a>({ ...params }) -> ExportPdfListResponse</code>
- <code title="get /export/v3/zip">client.export.<a href="./src/resources/export.ts">zipList</a>({ ...params }) -> ExportZipListResponse</code>

# Pages

Types:

- <code><a href="./src/resources/pages.ts">PageRenderCreateResponse</a></code>

Methods:

- <code title="post /pages/v1/render">client.pages.<a href="./src/resources/pages.ts">renderCreate</a>({ ...params }) -> PageRenderCreateResponse</code>

# Project

Types:

- <code><a href="./src/resources/project.ts">ProjectCurrentListResponse</a></code>
- <code><a href="./src/resources/project.ts">ProjectDomainsCreateResponse</a></code>
- <code><a href="./src/resources/project.ts">ProjectDomainsListResponse</a></code>
- <code><a href="./src/resources/project.ts">ProjectDomainsRetrieveResponse</a></code>
- <code><a href="./src/resources/project.ts">ProjectDomainsUpdateResponse</a></code>
- <code><a href="./src/resources/project.ts">ProjectTemplatesCreateResponse</a></code>
- <code><a href="./src/resources/project.ts">ProjectTemplatesListResponse</a></code>
- <code><a href="./src/resources/project.ts">ProjectTemplatesRetrieveResponse</a></code>
- <code><a href="./src/resources/project.ts">ProjectTemplatesUpdateResponse</a></code>
- <code><a href="./src/resources/project.ts">ProjectWorkspacesListResponse</a></code>
- <code><a href="./src/resources/project.ts">ProjectWorkspacesRetrieveResponse</a></code>

Methods:

- <code title="get /project/v1/current">client.project.<a href="./src/resources/project.ts">currentList</a>({ ...params }) -> ProjectCurrentListResponse</code>
- <code title="post /project/v1/domains">client.project.<a href="./src/resources/project.ts">domainsCreate</a>({ ...params }) -> ProjectDomainsCreateResponse</code>
- <code title="delete /project/v1/domains/{id}">client.project.<a href="./src/resources/project.ts">domainsDelete</a>(id) -> void</code>
- <code title="get /project/v1/domains">client.project.<a href="./src/resources/project.ts">domainsList</a>({ ...params }) -> ProjectDomainsListResponse</code>
- <code title="get /project/v1/domains/{id}">client.project.<a href="./src/resources/project.ts">domainsRetrieve</a>(id) -> ProjectDomainsRetrieveResponse</code>
- <code title="put /project/v1/domains/{id}">client.project.<a href="./src/resources/project.ts">domainsUpdate</a>(id, { ...params }) -> ProjectDomainsUpdateResponse</code>
- <code title="post /project/v1/templates">client.project.<a href="./src/resources/project.ts">templatesCreate</a>({ ...params }) -> ProjectTemplatesCreateResponse</code>
- <code title="delete /project/v1/templates/{id}">client.project.<a href="./src/resources/project.ts">templatesDelete</a>(id) -> void</code>
- <code title="get /project/v1/templates">client.project.<a href="./src/resources/project.ts">templatesList</a>({ ...params }) -> ProjectTemplatesListResponsesCursorPage</code>
- <code title="get /project/v1/templates/{id}">client.project.<a href="./src/resources/project.ts">templatesRetrieve</a>(id) -> ProjectTemplatesRetrieveResponse</code>
- <code title="put /project/v1/templates/{id}">client.project.<a href="./src/resources/project.ts">templatesUpdate</a>(id, { ...params }) -> ProjectTemplatesUpdateResponse</code>
- <code title="get /project/v1/workspaces">client.project.<a href="./src/resources/project.ts">workspacesList</a>() -> ProjectWorkspacesListResponse</code>
- <code title="get /project/v1/workspaces/{workspaceId}">client.project.<a href="./src/resources/project.ts">workspacesRetrieve</a>(workspaceID) -> ProjectWorkspacesRetrieveResponse</code>
