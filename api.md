# DocumentsV1

Types:

- <code><a href="./src/resources/documents-v1.ts">DocumentsV1DocumentsRetrieveResponse</a></code>
- <code><a href="./src/resources/documents-v1.ts">DocumentsV1GenerateCreateResponse</a></code>
- <code><a href="./src/resources/documents-v1.ts">DocumentsV1GenerateTemplateTemplateResponse</a></code>

Methods:

- <code title="get /documents/v1/documents/{id}">client.documentsV1.<a href="./src/resources/documents-v1.ts">documentsRetrieve</a>(id) -> DocumentsV1DocumentsRetrieveResponse</code>
- <code title="post /documents/v1/generate">client.documentsV1.<a href="./src/resources/documents-v1.ts">generateCreate</a>({ ...params }) -> DocumentsV1GenerateCreateResponse</code>
- <code title="post /documents/v1/generate/template">client.documentsV1.<a href="./src/resources/documents-v1.ts">generateTemplateTemplate</a>({ ...params }) -> DocumentsV1GenerateTemplateTemplateResponse</code>

# Documents

Types:

- <code><a href="./src/resources/documents.ts">DocumentDocumentsRetrieveResponse</a></code>
- <code><a href="./src/resources/documents.ts">DocumentGenerateCreateResponse</a></code>
- <code><a href="./src/resources/documents.ts">DocumentGenerateTemplateTemplateResponse</a></code>

Methods:

- <code title="get /documents/v1/documents/{id}">client.documents.<a href="./src/resources/documents.ts">documentsRetrieve</a>(id) -> DocumentDocumentsRetrieveResponse</code>
- <code title="post /documents/v1/generate">client.documents.<a href="./src/resources/documents.ts">generateCreate</a>({ ...params }) -> DocumentGenerateCreateResponse</code>
- <code title="post /documents/v1/generate/template">client.documents.<a href="./src/resources/documents.ts">generateTemplateTemplate</a>({ ...params }) -> DocumentGenerateTemplateTemplateResponse</code>

# PagesV1

Types:

- <code><a href="./src/resources/pages-v1.ts">PagesV1RenderCreateResponse</a></code>

Methods:

- <code title="post /pages/v1/render">client.pagesV1.<a href="./src/resources/pages-v1.ts">renderCreate</a>({ ...params }) -> PagesV1RenderCreateResponse</code>

# Pages

Types:

- <code><a href="./src/resources/pages.ts">PageRenderCreateResponse</a></code>

Methods:

- <code title="post /pages/v1/render">client.pages.<a href="./src/resources/pages.ts">renderCreate</a>({ ...params }) -> PageRenderCreateResponse</code>

# ProjectV1

Types:

- <code><a href="./src/resources/project-v1.ts">ProjectV1APIKeysCreateResponse</a></code>
- <code><a href="./src/resources/project-v1.ts">ProjectV1APIKeysListResponse</a></code>
- <code><a href="./src/resources/project-v1.ts">ProjectV1APIKeysRetrieveResponse</a></code>
- <code><a href="./src/resources/project-v1.ts">ProjectV1APIKeysUpdateResponse</a></code>
- <code><a href="./src/resources/project-v1.ts">ProjectV1CurrentListResponse</a></code>
- <code><a href="./src/resources/project-v1.ts">ProjectV1DomainsCreateResponse</a></code>
- <code><a href="./src/resources/project-v1.ts">ProjectV1DomainsListResponse</a></code>
- <code><a href="./src/resources/project-v1.ts">ProjectV1DomainsRetrieveResponse</a></code>
- <code><a href="./src/resources/project-v1.ts">ProjectV1DomainsUpdateResponse</a></code>
- <code><a href="./src/resources/project-v1.ts">ProjectV1TemplatesCreateResponse</a></code>
- <code><a href="./src/resources/project-v1.ts">ProjectV1TemplatesListResponse</a></code>
- <code><a href="./src/resources/project-v1.ts">ProjectV1TemplatesRetrieveResponse</a></code>
- <code><a href="./src/resources/project-v1.ts">ProjectV1TemplatesUpdateResponse</a></code>

Methods:

- <code title="post /project/v1/api-keys">client.projectV1.<a href="./src/resources/project-v1.ts">apiKeysCreate</a>({ ...params }) -> ProjectV1APIKeysCreateResponse</code>
- <code title="delete /project/v1/api-keys/{id}">client.projectV1.<a href="./src/resources/project-v1.ts">apiKeysDelete</a>(id) -> void</code>
- <code title="get /project/v1/api-keys">client.projectV1.<a href="./src/resources/project-v1.ts">apiKeysList</a>() -> ProjectV1APIKeysListResponse</code>
- <code title="get /project/v1/api-keys/{id}">client.projectV1.<a href="./src/resources/project-v1.ts">apiKeysRetrieve</a>(id) -> ProjectV1APIKeysRetrieveResponse</code>
- <code title="put /project/v1/api-keys/{id}">client.projectV1.<a href="./src/resources/project-v1.ts">apiKeysUpdate</a>(id, { ...params }) -> ProjectV1APIKeysUpdateResponse</code>
- <code title="get /project/v1/current">client.projectV1.<a href="./src/resources/project-v1.ts">currentList</a>() -> ProjectV1CurrentListResponse</code>
- <code title="post /project/v1/domains">client.projectV1.<a href="./src/resources/project-v1.ts">domainsCreate</a>({ ...params }) -> ProjectV1DomainsCreateResponse</code>
- <code title="delete /project/v1/domains/{id}">client.projectV1.<a href="./src/resources/project-v1.ts">domainsDelete</a>(id) -> void</code>
- <code title="get /project/v1/domains">client.projectV1.<a href="./src/resources/project-v1.ts">domainsList</a>() -> ProjectV1DomainsListResponse</code>
- <code title="get /project/v1/domains/{id}">client.projectV1.<a href="./src/resources/project-v1.ts">domainsRetrieve</a>(id) -> ProjectV1DomainsRetrieveResponse</code>
- <code title="put /project/v1/domains/{id}">client.projectV1.<a href="./src/resources/project-v1.ts">domainsUpdate</a>(id, { ...params }) -> ProjectV1DomainsUpdateResponse</code>
- <code title="post /project/v1/templates">client.projectV1.<a href="./src/resources/project-v1.ts">templatesCreate</a>({ ...params }) -> ProjectV1TemplatesCreateResponse</code>
- <code title="delete /project/v1/templates/{id}">client.projectV1.<a href="./src/resources/project-v1.ts">templatesDelete</a>(id) -> void</code>
- <code title="get /project/v1/templates">client.projectV1.<a href="./src/resources/project-v1.ts">templatesList</a>() -> ProjectV1TemplatesListResponse</code>
- <code title="get /project/v1/templates/{id}">client.projectV1.<a href="./src/resources/project-v1.ts">templatesRetrieve</a>(id) -> ProjectV1TemplatesRetrieveResponse</code>
- <code title="put /project/v1/templates/{id}">client.projectV1.<a href="./src/resources/project-v1.ts">templatesUpdate</a>(id, { ...params }) -> ProjectV1TemplatesUpdateResponse</code>

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

Methods:

- <code title="post /project/v1/api-keys">client.project.<a href="./src/resources/project.ts">apiKeysCreate</a>({ ...params }) -> ProjectAPIKeysCreateResponse</code>
- <code title="delete /project/v1/api-keys/{id}">client.project.<a href="./src/resources/project.ts">apiKeysDelete</a>(id) -> void</code>
- <code title="get /project/v1/api-keys">client.project.<a href="./src/resources/project.ts">apiKeysList</a>() -> ProjectAPIKeysListResponse</code>
- <code title="get /project/v1/api-keys/{id}">client.project.<a href="./src/resources/project.ts">apiKeysRetrieve</a>(id) -> ProjectAPIKeysRetrieveResponse</code>
- <code title="put /project/v1/api-keys/{id}">client.project.<a href="./src/resources/project.ts">apiKeysUpdate</a>(id, { ...params }) -> ProjectAPIKeysUpdateResponse</code>
- <code title="get /project/v1/current">client.project.<a href="./src/resources/project.ts">currentList</a>() -> ProjectCurrentListResponse</code>
- <code title="post /project/v1/domains">client.project.<a href="./src/resources/project.ts">domainsCreate</a>({ ...params }) -> ProjectDomainsCreateResponse</code>
- <code title="delete /project/v1/domains/{id}">client.project.<a href="./src/resources/project.ts">domainsDelete</a>(id) -> void</code>
- <code title="get /project/v1/domains">client.project.<a href="./src/resources/project.ts">domainsList</a>() -> ProjectDomainsListResponse</code>
- <code title="get /project/v1/domains/{id}">client.project.<a href="./src/resources/project.ts">domainsRetrieve</a>(id) -> ProjectDomainsRetrieveResponse</code>
- <code title="put /project/v1/domains/{id}">client.project.<a href="./src/resources/project.ts">domainsUpdate</a>(id, { ...params }) -> ProjectDomainsUpdateResponse</code>
- <code title="post /project/v1/templates">client.project.<a href="./src/resources/project.ts">templatesCreate</a>({ ...params }) -> ProjectTemplatesCreateResponse</code>
- <code title="delete /project/v1/templates/{id}">client.project.<a href="./src/resources/project.ts">templatesDelete</a>(id) -> void</code>
- <code title="get /project/v1/templates">client.project.<a href="./src/resources/project.ts">templatesList</a>() -> ProjectTemplatesListResponse</code>
- <code title="get /project/v1/templates/{id}">client.project.<a href="./src/resources/project.ts">templatesRetrieve</a>(id) -> ProjectTemplatesRetrieveResponse</code>
- <code title="put /project/v1/templates/{id}">client.project.<a href="./src/resources/project.ts">templatesUpdate</a>(id, { ...params }) -> ProjectTemplatesUpdateResponse</code>

# EmailsV1

Types:

- <code><a href="./src/resources/emails-v1.ts">EmailsV1EmailsRetrieveResponse</a></code>
- <code><a href="./src/resources/emails-v1.ts">EmailsV1RenderCreateResponse</a></code>
- <code><a href="./src/resources/emails-v1.ts">EmailsV1SendCreateResponse</a></code>
- <code><a href="./src/resources/emails-v1.ts">EmailsV1SendTemplateTemplateResponse</a></code>

Methods:

- <code title="get /emails/v1/emails/{id}">client.emailsV1.<a href="./src/resources/emails-v1.ts">emailsRetrieve</a>(id) -> EmailsV1EmailsRetrieveResponse</code>
- <code title="post /emails/v1/render">client.emailsV1.<a href="./src/resources/emails-v1.ts">renderCreate</a>({ ...params }) -> EmailsV1RenderCreateResponse</code>
- <code title="post /emails/v1/send">client.emailsV1.<a href="./src/resources/emails-v1.ts">sendCreate</a>({ ...params }) -> EmailsV1SendCreateResponse</code>
- <code title="post /emails/v1/send/template">client.emailsV1.<a href="./src/resources/emails-v1.ts">sendTemplateTemplate</a>({ ...params }) -> EmailsV1SendTemplateTemplateResponse</code>

# Emails

Types:

- <code><a href="./src/resources/emails.ts">EmailEmailsRetrieveResponse</a></code>
- <code><a href="./src/resources/emails.ts">EmailRenderCreateResponse</a></code>
- <code><a href="./src/resources/emails.ts">EmailSendCreateResponse</a></code>
- <code><a href="./src/resources/emails.ts">EmailSendTemplateTemplateResponse</a></code>

Methods:

- <code title="get /emails/v1/emails/{id}">client.emails.<a href="./src/resources/emails.ts">emailsRetrieve</a>(id) -> EmailEmailsRetrieveResponse</code>
- <code title="post /emails/v1/render">client.emails.<a href="./src/resources/emails.ts">renderCreate</a>({ ...params }) -> EmailRenderCreateResponse</code>
- <code title="post /emails/v1/send">client.emails.<a href="./src/resources/emails.ts">sendCreate</a>({ ...params }) -> EmailSendCreateResponse</code>
- <code title="post /emails/v1/send/template">client.emails.<a href="./src/resources/emails.ts">sendTemplateTemplate</a>({ ...params }) -> EmailSendTemplateTemplateResponse</code>
