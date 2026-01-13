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

# Project

Types:

- <code><a href="./src/resources/project.ts">ProjectAPIKeysCreateResponse</a></code>
- <code><a href="./src/resources/project.ts">ProjectAPIKeysListResponse</a></code>
- <code><a href="./src/resources/project.ts">ProjectAPIKeysRetrieveResponse</a></code>
- <code><a href="./src/resources/project.ts">ProjectAPIKeysUpdateResponse</a></code>
- <code><a href="./src/resources/project.ts">ProjectCurrentListResponse</a></code>
- <code><a href="./src/resources/project.ts">ProjectDomainsCreateResponse</a></code>
- <code><a href="./src/resources/project.ts">ProjectDomainsListResponse</a></code>
- <code><a href="./src/resources/project.ts">ProjectDomainsRetrieveResponse</a></code>
- <code><a href="./src/resources/project.ts">ProjectDomainsUpdateResponse</a></code>
- <code><a href="./src/resources/project.ts">ProjectTemplatesCreateResponse</a></code>
- <code><a href="./src/resources/project.ts">ProjectTemplatesListResponse</a></code>
- <code><a href="./src/resources/project.ts">ProjectTemplatesRetrieveResponse</a></code>
- <code><a href="./src/resources/project.ts">ProjectTemplatesUpdateResponse</a></code>
- <code><a href="./src/resources/project.ts">ProjectTokensDeleteResponse</a></code>
- <code><a href="./src/resources/project.ts">ProjectTokensListResponse</a></code>
- <code><a href="./src/resources/project.ts">ProjectWorkspacesListResponse</a></code>
- <code><a href="./src/resources/project.ts">ProjectWorkspacesRetrieveResponse</a></code>

Methods:

- <code title="post /project/v1/api-keys">client.project.<a href="./src/resources/project.ts">apiKeysCreate</a>({ ...params }) -> ProjectAPIKeysCreateResponse</code>
- <code title="delete /project/v1/api-keys/{id}">client.project.<a href="./src/resources/project.ts">apiKeysDelete</a>(id) -> void</code>
- <code title="get /project/v1/api-keys">client.project.<a href="./src/resources/project.ts">apiKeysList</a>({ ...params }) -> ProjectAPIKeysListResponse</code>
- <code title="get /project/v1/api-keys/{id}">client.project.<a href="./src/resources/project.ts">apiKeysRetrieve</a>(id) -> ProjectAPIKeysRetrieveResponse</code>
- <code title="put /project/v1/api-keys/{id}">client.project.<a href="./src/resources/project.ts">apiKeysUpdate</a>(id, { ...params }) -> ProjectAPIKeysUpdateResponse</code>
- <code title="get /project/v1/current">client.project.<a href="./src/resources/project.ts">currentList</a>({ ...params }) -> ProjectCurrentListResponse</code>
- <code title="post /project/v1/domains">client.project.<a href="./src/resources/project.ts">domainsCreate</a>({ ...params }) -> ProjectDomainsCreateResponse</code>
- <code title="delete /project/v1/domains/{id}">client.project.<a href="./src/resources/project.ts">domainsDelete</a>(id) -> void</code>
- <code title="get /project/v1/domains">client.project.<a href="./src/resources/project.ts">domainsList</a>({ ...params }) -> ProjectDomainsListResponse</code>
- <code title="get /project/v1/domains/{id}">client.project.<a href="./src/resources/project.ts">domainsRetrieve</a>(id) -> ProjectDomainsRetrieveResponse</code>
- <code title="put /project/v1/domains/{id}">client.project.<a href="./src/resources/project.ts">domainsUpdate</a>(id, { ...params }) -> ProjectDomainsUpdateResponse</code>
- <code title="post /project/v1/templates">client.project.<a href="./src/resources/project.ts">templatesCreate</a>({ ...params }) -> ProjectTemplatesCreateResponse</code>
- <code title="delete /project/v1/templates/{id}">client.project.<a href="./src/resources/project.ts">templatesDelete</a>(id) -> void</code>
- <code title="get /project/v1/templates">client.project.<a href="./src/resources/project.ts">templatesList</a>({ ...params }) -> ProjectTemplatesListResponse</code>
- <code title="get /project/v1/templates/{id}">client.project.<a href="./src/resources/project.ts">templatesRetrieve</a>(id) -> ProjectTemplatesRetrieveResponse</code>
- <code title="put /project/v1/templates/{id}">client.project.<a href="./src/resources/project.ts">templatesUpdate</a>(id, { ...params }) -> ProjectTemplatesUpdateResponse</code>
- <code title="delete /project/v1/tokens/{tokenId}">client.project.<a href="./src/resources/project.ts">tokensDelete</a>(tokenID) -> ProjectTokensDeleteResponse</code>
- <code title="get /project/v1/tokens">client.project.<a href="./src/resources/project.ts">tokensList</a>() -> ProjectTokensListResponse</code>
- <code title="get /project/v1/workspaces">client.project.<a href="./src/resources/project.ts">workspacesList</a>() -> ProjectWorkspacesListResponse</code>
- <code title="get /project/v1/workspaces/{workspaceId}">client.project.<a href="./src/resources/project.ts">workspacesRetrieve</a>(workspaceID) -> ProjectWorkspacesRetrieveResponse</code>

# Pages

Types:

- <code><a href="./src/resources/pages.ts">PageRenderCreateResponse</a></code>

Methods:

- <code title="post /pages/v1/render">client.pages.<a href="./src/resources/pages.ts">renderCreate</a>({ ...params }) -> PageRenderCreateResponse</code>

# Documents

Types:

- <code><a href="./src/resources/documents.ts">DocumentDocumentsRetrieveResponse</a></code>
- <code><a href="./src/resources/documents.ts">DocumentGenerateCreateResponse</a></code>
- <code><a href="./src/resources/documents.ts">DocumentGenerateTemplateTemplateResponse</a></code>

Methods:

- <code title="get /documents/v1/documents/{id}">client.documents.<a href="./src/resources/documents.ts">documentsRetrieve</a>(id, { ...params }) -> DocumentDocumentsRetrieveResponse</code>
- <code title="post /documents/v1/generate">client.documents.<a href="./src/resources/documents.ts">generateCreate</a>({ ...params }) -> DocumentGenerateCreateResponse</code>
- <code title="post /documents/v1/generate/template">client.documents.<a href="./src/resources/documents.ts">generateTemplateTemplate</a>({ ...params }) -> DocumentGenerateTemplateTemplateResponse</code>
