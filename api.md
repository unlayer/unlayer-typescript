# Domains

Types:

- <code><a href="./src/resources/domains/domains.ts">DomainCreateResponse</a></code>
- <code><a href="./src/resources/domains/domains.ts">DomainRetrieveResponse</a></code>
- <code><a href="./src/resources/domains/domains.ts">DomainListResponse</a></code>
- <code><a href="./src/resources/domains/domains.ts">DomainDeleteResponse</a></code>

Methods:

- <code title="post /v3/domains">client.domains.<a href="./src/resources/domains/domains.ts">create</a>({ ...params }) -> DomainCreateResponse</code>
- <code title="get /v3/domains/{id}">client.domains.<a href="./src/resources/domains/domains.ts">retrieve</a>(id) -> DomainRetrieveResponse</code>
- <code title="get /v3/domains">client.domains.<a href="./src/resources/domains/domains.ts">list</a>() -> DomainListResponse</code>
- <code title="delete /v3/domains/{id}">client.domains.<a href="./src/resources/domains/domains.ts">delete</a>(id) -> DomainDeleteResponse</code>

## Verify

Types:

- <code><a href="./src/resources/domains/verify.ts">VerifyCreateResponse</a></code>

Methods:

- <code title="post /v3/domains/{id}/verify">client.domains.verify.<a href="./src/resources/domains/verify.ts">create</a>(id) -> VerifyCreateResponse</code>

# EditorSessions

Types:

- <code><a href="./src/resources/editor-sessions.ts">EditorSessionCreateResponse</a></code>

Methods:

- <code title="post /v3/editor-sessions">client.editorSessions.<a href="./src/resources/editor-sessions.ts">create</a>({ ...params }) -> EditorSessionCreateResponse</code>

# Emails

Types:

- <code><a href="./src/resources/emails/emails.ts">EmailCreateResponse</a></code>
- <code><a href="./src/resources/emails/emails.ts">EmailRetrieveResponse</a></code>
- <code><a href="./src/resources/emails/emails.ts">EmailListResponse</a></code>

Methods:

- <code title="post /v3/emails">client.emails.<a href="./src/resources/emails/emails.ts">create</a>({ ...params }) -> EmailCreateResponse</code>
- <code title="get /v3/emails/{id}">client.emails.<a href="./src/resources/emails/emails.ts">retrieve</a>(id) -> EmailRetrieveResponse</code>
- <code title="get /v3/emails">client.emails.<a href="./src/resources/emails/emails.ts">list</a>({ ...params }) -> EmailListResponse</code>

## Events

Types:

- <code><a href="./src/resources/emails/events.ts">EventRetrieveResponse</a></code>

Methods:

- <code title="get /v3/emails/{id}/events">client.emails.events.<a href="./src/resources/emails/events.ts">retrieve</a>(id) -> EventRetrieveResponse</code>

## Render

Types:

- <code><a href="./src/resources/emails/render.ts">RenderCreateResponse</a></code>

Methods:

- <code title="post /v3/emails/render">client.emails.render.<a href="./src/resources/emails/render.ts">create</a>({ ...params }) -> RenderCreateResponse</code>

## Settings

Types:

- <code><a href="./src/resources/emails/settings.ts">SettingRetrieveResponse</a></code>
- <code><a href="./src/resources/emails/settings.ts">SettingUpdateResponse</a></code>

Methods:

- <code title="get /v3/emails/settings">client.emails.settings.<a href="./src/resources/emails/settings.ts">retrieve</a>() -> SettingRetrieveResponse</code>
- <code title="patch /v3/emails/settings">client.emails.settings.<a href="./src/resources/emails/settings.ts">update</a>({ ...params }) -> SettingUpdateResponse</code>

## Stats

Types:

- <code><a href="./src/resources/emails/stats.ts">StatRetrieveResponse</a></code>

Methods:

- <code title="get /v3/emails/stats">client.emails.stats.<a href="./src/resources/emails/stats.ts">retrieve</a>({ ...params }) -> StatRetrieveResponse</code>

## Suppressions

Types:

- <code><a href="./src/resources/emails/suppressions.ts">SuppressionCreateResponse</a></code>
- <code><a href="./src/resources/emails/suppressions.ts">SuppressionRetrieveResponse</a></code>
- <code><a href="./src/resources/emails/suppressions.ts">SuppressionDeleteResponse</a></code>

Methods:

- <code title="post /v3/emails/suppressions">client.emails.suppressions.<a href="./src/resources/emails/suppressions.ts">create</a>({ ...params }) -> SuppressionCreateResponse</code>
- <code title="get /v3/emails/suppressions">client.emails.suppressions.<a href="./src/resources/emails/suppressions.ts">retrieve</a>({ ...params }) -> SuppressionRetrieveResponse</code>
- <code title="delete /v3/emails/suppressions">client.emails.suppressions.<a href="./src/resources/emails/suppressions.ts">delete</a>({ ...params }) -> SuppressionDeleteResponse</code>

## SuppressionsCheck

Types:

- <code><a href="./src/resources/emails/suppressions-check.ts">SuppressionsCheckRetrieveResponse</a></code>

Methods:

- <code title="get /v3/emails/suppressions/check">client.emails.suppressionsCheck.<a href="./src/resources/emails/suppressions-check.ts">retrieve</a>({ ...params }) -> SuppressionsCheckRetrieveResponse</code>

## Template

Types:

- <code><a href="./src/resources/emails/template.ts">TemplateCreateResponse</a></code>

Methods:

- <code title="post /v3/emails/template">client.emails.template.<a href="./src/resources/emails/template.ts">create</a>({ ...params }) -> TemplateCreateResponse</code>

# Me

## Subscription

Types:

- <code><a href="./src/resources/me/subscription.ts">SubscriptionRetrieveResponse</a></code>

Methods:

- <code title="get /v3/me/subscription">client.me.subscription.<a href="./src/resources/me/subscription.ts">retrieve</a>({ ...params }) -> SubscriptionRetrieveResponse</code>

# Projects

Types:

- <code><a href="./src/resources/projects/projects.ts">ProjectRetrieveResponse</a></code>

Methods:

- <code title="get /v3/projects/{id}">client.projects.<a href="./src/resources/projects/projects.ts">retrieve</a>(id) -> ProjectRetrieveResponse</code>

## AICredits

Types:

- <code><a href="./src/resources/projects/ai-credits.ts">AICreditRetrieveResponse</a></code>

Methods:

- <code title="get /v3/projects/{id}/ai-credits">client.projects.aiCredits.<a href="./src/resources/projects/ai-credits.ts">retrieve</a>(id) -> AICreditRetrieveResponse</code>

## AICreditsSettings

Types:

- <code><a href="./src/resources/projects/ai-credits-settings.ts">AICreditsSettingRetrieveResponse</a></code>
- <code><a href="./src/resources/projects/ai-credits-settings.ts">AICreditsSettingUpdateResponse</a></code>

Methods:

- <code title="get /v3/projects/{id}/ai-credits/settings">client.projects.aiCreditsSettings.<a href="./src/resources/projects/ai-credits-settings.ts">retrieve</a>(id) -> AICreditsSettingRetrieveResponse</code>
- <code title="put /v3/projects/{id}/ai-credits/settings">client.projects.aiCreditsSettings.<a href="./src/resources/projects/ai-credits-settings.ts">update</a>(id, { ...params }) -> AICreditsSettingUpdateResponse</code>

## AICreditsSettingsRotateSecret

Types:

- <code><a href="./src/resources/projects/ai-credits-settings-rotate-secret.ts">AICreditsSettingsRotateSecretCreateResponse</a></code>

Methods:

- <code title="post /v3/projects/{id}/ai-credits/settings/rotate-secret">client.projects.aiCreditsSettingsRotateSecret.<a href="./src/resources/projects/ai-credits-settings-rotate-secret.ts">create</a>(id) -> AICreditsSettingsRotateSecretCreateResponse</code>

## AICreditsUsage

Types:

- <code><a href="./src/resources/projects/ai-credits-usage.ts">AICreditsUsageRetrieveResponse</a></code>

Methods:

- <code title="get /v3/projects/{id}/ai-credits/usage">client.projects.aiCreditsUsage.<a href="./src/resources/projects/ai-credits-usage.ts">retrieve</a>(id, { ...params }) -> AICreditsUsageRetrieveResponse</code>

## AICreditsWebhooksDeliveries

Types:

- <code><a href="./src/resources/projects/ai-credits-webhooks-deliveries.ts">AICreditsWebhooksDeliveryRetrieveResponse</a></code>

Methods:

- <code title="get /v3/projects/{id}/ai-credits/webhooks/deliveries">client.projects.aiCreditsWebhooksDeliveries.<a href="./src/resources/projects/ai-credits-webhooks-deliveries.ts">retrieve</a>(id, { ...params }) -> AICreditsWebhooksDeliveryRetrieveResponse</code>

## AICreditsWebhooksDeliveriesattempts

Types:

- <code><a href="./src/resources/projects/ai-credits-webhooks-deliveriesattempts.ts">AICreditsWebhooksDeliveriesattemptRetrieveResponse</a></code>

Methods:

- <code title="get /v3/projects/{id}/ai-credits/webhooks/deliveries/{deliveryId}/attempts">client.projects.aiCreditsWebhooksDeliveriesattempts.<a href="./src/resources/projects/ai-credits-webhooks-deliveriesattempts.ts">retrieve</a>(deliveryID, { ...params }) -> AICreditsWebhooksDeliveriesattemptRetrieveResponse</code>

## AICreditsWebhooksDeliveriesretry

Types:

- <code><a href="./src/resources/projects/ai-credits-webhooks-deliveriesretry.ts">AICreditsWebhooksDeliveriesretryCreateResponse</a></code>

Methods:

- <code title="post /v3/projects/{id}/ai-credits/webhooks/deliveries/{deliveryId}/retry">client.projects.aiCreditsWebhooksDeliveriesretry.<a href="./src/resources/projects/ai-credits-webhooks-deliveriesretry.ts">create</a>(deliveryID, { ...params }) -> AICreditsWebhooksDeliveriesretryCreateResponse</code>

# Templates

Types:

- <code><a href="./src/resources/templates/templates.ts">TemplateRetrieveResponse</a></code>
- <code><a href="./src/resources/templates/templates.ts">TemplateListResponse</a></code>

Methods:

- <code title="get /v3/templates/{id}">client.templates.<a href="./src/resources/templates/templates.ts">retrieve</a>(id, { ...params }) -> TemplateRetrieveResponse</code>
- <code title="get /v3/templates">client.templates.<a href="./src/resources/templates/templates.ts">list</a>({ ...params }) -> TemplateListResponsesCursorPage</code>

## ConvertFullToSimple

Types:

- <code><a href="./src/resources/templates/convert-full-to-simple.ts">ConvertFullToSimpleCreateResponse</a></code>

Methods:

- <code title="post /v3/templates/convert/full-to-simple">client.templates.convertFullToSimple.<a href="./src/resources/templates/convert-full-to-simple.ts">create</a>({ ...params }) -> ConvertFullToSimpleCreateResponse</code>

## ConvertSimpleToFull

Types:

- <code><a href="./src/resources/templates/convert-simple-to-full.ts">ConvertSimpleToFullCreateResponse</a></code>

Methods:

- <code title="post /v3/templates/convert/simple-to-full">client.templates.convertSimpleToFull.<a href="./src/resources/templates/convert-simple-to-full.ts">create</a>({ ...params }) -> ConvertSimpleToFullCreateResponse</code>

## ExportHTML

Types:

- <code><a href="./src/resources/templates/export-html.ts">ExportHTMLCreateResponse</a></code>

Methods:

- <code title="post /v3/templates/export/html">client.templates.exportHTML.<a href="./src/resources/templates/export-html.ts">create</a>({ ...params }) -> ExportHTMLCreateResponse</code>

## ExportImage

Types:

- <code><a href="./src/resources/templates/export-image.ts">ExportImageCreateResponse</a></code>

Methods:

- <code title="post /v3/templates/export/image">client.templates.exportImage.<a href="./src/resources/templates/export-image.ts">create</a>({ ...params }) -> ExportImageCreateResponse</code>

## ExportPdf

Types:

- <code><a href="./src/resources/templates/export-pdf.ts">ExportPdfCreateResponse</a></code>

Methods:

- <code title="post /v3/templates/export/pdf">client.templates.exportPdf.<a href="./src/resources/templates/export-pdf.ts">create</a>({ ...params }) -> ExportPdfCreateResponse</code>

## ExportZip

Types:

- <code><a href="./src/resources/templates/export-zip.ts">ExportZipCreateResponse</a></code>

Methods:

- <code title="post /v3/templates/export/zip">client.templates.exportZip.<a href="./src/resources/templates/export-zip.ts">create</a>({ ...params }) -> ExportZipCreateResponse</code>

## Generate

Types:

- <code><a href="./src/resources/templates/generate.ts">GenerateCreateResponse</a></code>

Methods:

- <code title="post /v3/templates/generate">client.templates.generate.<a href="./src/resources/templates/generate.ts">create</a>({ ...params }) -> GenerateCreateResponse</code>
- <code title="get /v3/templates/generate">client.templates.generate.<a href="./src/resources/templates/generate.ts">retrieve</a>() -> void</code>

## Import

Types:

- <code><a href="./src/resources/templates/import.ts">ImportCreateResponse</a></code>

Methods:

- <code title="post /v3/templates/import">client.templates.import.<a href="./src/resources/templates/import.ts">create</a>({ ...params }) -> ImportCreateResponse</code>

## Schema

Methods:

- <code title="get /v3/templates/schema">client.templates.schema.<a href="./src/resources/templates/schema.ts">retrieve</a>({ ...params }) -> void</code>

## Validate

Types:

- <code><a href="./src/resources/templates/validate.ts">ValidateCreateResponse</a></code>

Methods:

- <code title="post /v3/templates/validate">client.templates.validate.<a href="./src/resources/templates/validate.ts">create</a>({ ...params }) -> ValidateCreateResponse</code>

# Webhooks

Types:

- <code><a href="./src/resources/webhooks/webhooks.ts">WebhookCreateResponse</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">WebhookRetrieveResponse</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">WebhookUpdateResponse</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">WebhookListResponse</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">WebhookDeleteResponse</a></code>

Methods:

- <code title="post /v3/webhooks">client.webhooks.<a href="./src/resources/webhooks/webhooks.ts">create</a>({ ...params }) -> WebhookCreateResponse</code>
- <code title="get /v3/webhooks/{id}">client.webhooks.<a href="./src/resources/webhooks/webhooks.ts">retrieve</a>(id) -> WebhookRetrieveResponse</code>
- <code title="patch /v3/webhooks/{id}">client.webhooks.<a href="./src/resources/webhooks/webhooks.ts">update</a>(id, { ...params }) -> WebhookUpdateResponse</code>
- <code title="get /v3/webhooks">client.webhooks.<a href="./src/resources/webhooks/webhooks.ts">list</a>() -> WebhookListResponse</code>
- <code title="delete /v3/webhooks/{id}">client.webhooks.<a href="./src/resources/webhooks/webhooks.ts">delete</a>(id) -> WebhookDeleteResponse</code>

## RotateSecret

Types:

- <code><a href="./src/resources/webhooks/rotate-secret.ts">RotateSecretCreateResponse</a></code>

Methods:

- <code title="post /v3/webhooks/{id}/rotate-secret">client.webhooks.rotateSecret.<a href="./src/resources/webhooks/rotate-secret.ts">create</a>(id) -> RotateSecretCreateResponse</code>

# Workspaces

Types:

- <code><a href="./src/resources/workspaces.ts">WorkspaceRetrieveResponse</a></code>
- <code><a href="./src/resources/workspaces.ts">WorkspaceListResponse</a></code>

Methods:

- <code title="get /v3/workspaces/{workspaceId}">client.workspaces.<a href="./src/resources/workspaces.ts">retrieve</a>(workspaceID) -> WorkspaceRetrieveResponse</code>
- <code title="get /v3/workspaces">client.workspaces.<a href="./src/resources/workspaces.ts">list</a>() -> WorkspaceListResponse</code>
