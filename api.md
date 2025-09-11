# Project

## V1

Types:

- <code><a href="./src/resources/project/v1/v1.ts">V1GetCurrentResponse</a></code>

Methods:

- <code title="get /project/v1/current/">client.project.v1.<a href="./src/resources/project/v1/v1.ts">getCurrent</a>() -> V1GetCurrentResponse</code>

### APIKeys

Types:

- <code><a href="./src/resources/project/v1/api-keys.ts">APIKeyCreateResponse</a></code>
- <code><a href="./src/resources/project/v1/api-keys.ts">APIKeyRetrieveResponse</a></code>
- <code><a href="./src/resources/project/v1/api-keys.ts">APIKeyUpdateResponse</a></code>
- <code><a href="./src/resources/project/v1/api-keys.ts">APIKeyListResponse</a></code>

Methods:

- <code title="post /project/v1/api-keys/">client.project.v1.apiKeys.<a href="./src/resources/project/v1/api-keys.ts">create</a>({ ...params }) -> APIKeyCreateResponse</code>
- <code title="get /project/v1/api-keys/{id}/">client.project.v1.apiKeys.<a href="./src/resources/project/v1/api-keys.ts">retrieve</a>(id) -> APIKeyRetrieveResponse</code>
- <code title="put /project/v1/api-keys/{id}/">client.project.v1.apiKeys.<a href="./src/resources/project/v1/api-keys.ts">update</a>(id, { ...params }) -> APIKeyUpdateResponse</code>
- <code title="get /project/v1/api-keys/">client.project.v1.apiKeys.<a href="./src/resources/project/v1/api-keys.ts">list</a>() -> APIKeyListResponse</code>
- <code title="delete /project/v1/api-keys/{id}/">client.project.v1.apiKeys.<a href="./src/resources/project/v1/api-keys.ts">delete</a>(id) -> void</code>

### Domains

Types:

- <code><a href="./src/resources/project/v1/domains.ts">DomainCreateResponse</a></code>
- <code><a href="./src/resources/project/v1/domains.ts">DomainRetrieveResponse</a></code>
- <code><a href="./src/resources/project/v1/domains.ts">DomainUpdateResponse</a></code>
- <code><a href="./src/resources/project/v1/domains.ts">DomainListResponse</a></code>

Methods:

- <code title="post /project/v1/domains/">client.project.v1.domains.<a href="./src/resources/project/v1/domains.ts">create</a>({ ...params }) -> DomainCreateResponse</code>
- <code title="get /project/v1/domains/{id}/">client.project.v1.domains.<a href="./src/resources/project/v1/domains.ts">retrieve</a>(id) -> DomainRetrieveResponse</code>
- <code title="put /project/v1/domains/{id}/">client.project.v1.domains.<a href="./src/resources/project/v1/domains.ts">update</a>(id, { ...params }) -> DomainUpdateResponse</code>
- <code title="get /project/v1/domains/">client.project.v1.domains.<a href="./src/resources/project/v1/domains.ts">list</a>() -> DomainListResponse</code>
- <code title="delete /project/v1/domains/{id}/">client.project.v1.domains.<a href="./src/resources/project/v1/domains.ts">delete</a>(id) -> void</code>

### Templates

Types:

- <code><a href="./src/resources/project/v1/templates.ts">TemplateCreateResponse</a></code>
- <code><a href="./src/resources/project/v1/templates.ts">TemplateRetrieveResponse</a></code>
- <code><a href="./src/resources/project/v1/templates.ts">TemplateUpdateResponse</a></code>
- <code><a href="./src/resources/project/v1/templates.ts">TemplateListResponse</a></code>

Methods:

- <code title="post /project/v1/templates/">client.project.v1.templates.<a href="./src/resources/project/v1/templates.ts">create</a>({ ...params }) -> TemplateCreateResponse</code>
- <code title="get /project/v1/templates/{id}/">client.project.v1.templates.<a href="./src/resources/project/v1/templates.ts">retrieve</a>(id) -> TemplateRetrieveResponse</code>
- <code title="put /project/v1/templates/{id}/">client.project.v1.templates.<a href="./src/resources/project/v1/templates.ts">update</a>(id, { ...params }) -> TemplateUpdateResponse</code>
- <code title="get /project/v1/templates/">client.project.v1.templates.<a href="./src/resources/project/v1/templates.ts">list</a>() -> TemplateListResponse</code>
- <code title="delete /project/v1/templates/{id}/">client.project.v1.templates.<a href="./src/resources/project/v1/templates.ts">delete</a>(id) -> void</code>

# Documents

## V1

Types:

- <code><a href="./src/resources/documents/v1/v1.ts">V1RetrieveResponse</a></code>

Methods:

- <code title="get /documents/v1/documents/{id}/">client.documents.v1.<a href="./src/resources/documents/v1/v1.ts">retrieve</a>(id) -> V1RetrieveResponse</code>

### Generate

Types:

- <code><a href="./src/resources/documents/v1/generate.ts">GenerateCreateResponse</a></code>
- <code><a href="./src/resources/documents/v1/generate.ts">GenerateCreateFromTemplateResponse</a></code>

Methods:

- <code title="post /documents/v1/generate/">client.documents.v1.generate.<a href="./src/resources/documents/v1/generate.ts">create</a>({ ...params }) -> GenerateCreateResponse</code>
- <code title="post /documents/v1/generate/template/">client.documents.v1.generate.<a href="./src/resources/documents/v1/generate.ts">createFromTemplate</a>({ ...params }) -> GenerateCreateFromTemplateResponse</code>

# Emails

## V1

Types:

- <code><a href="./src/resources/emails/v1/v1.ts">V1RetrieveResponse</a></code>
- <code><a href="./src/resources/emails/v1/v1.ts">V1RenderResponse</a></code>

Methods:

- <code title="get /emails/v1/emails/{id}/">client.emails.v1.<a href="./src/resources/emails/v1/v1.ts">retrieve</a>(id) -> V1RetrieveResponse</code>
- <code title="post /emails/v1/render/">client.emails.v1.<a href="./src/resources/emails/v1/v1.ts">render</a>({ ...params }) -> V1RenderResponse</code>

### Send

Types:

- <code><a href="./src/resources/emails/v1/send.ts">SendSendResponse</a></code>
- <code><a href="./src/resources/emails/v1/send.ts">SendSendFromTemplateResponse</a></code>

Methods:

- <code title="post /emails/v1/send/">client.emails.v1.send.<a href="./src/resources/emails/v1/send.ts">send</a>({ ...params }) -> SendSendResponse</code>
- <code title="post /emails/v1/send/template/">client.emails.v1.send.<a href="./src/resources/emails/v1/send.ts">sendFromTemplate</a>({ ...params }) -> SendSendFromTemplateResponse</code>

# Pages

## V1

Types:

- <code><a href="./src/resources/pages/v1.ts">V1RenderResponse</a></code>

Methods:

- <code title="post /pages/v1/render/">client.pages.v1.<a href="./src/resources/pages/v1.ts">render</a>({ ...params }) -> V1RenderResponse</code>
