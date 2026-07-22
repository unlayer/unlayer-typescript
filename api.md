# EditorSessions

Types:

- <code><a href="./src/resources/editor-sessions.ts">EditorSessionCreateResponse</a></code>

Methods:

- <code title="post /v3/editor-sessions">client.editorSessions.<a href="./src/resources/editor-sessions.ts">create</a>({ ...params }) -> EditorSessionCreateResponse</code>

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

# Workspaces

Types:

- <code><a href="./src/resources/workspaces.ts">WorkspaceRetrieveResponse</a></code>
- <code><a href="./src/resources/workspaces.ts">WorkspaceListResponse</a></code>

Methods:

- <code title="get /v3/workspaces/{workspaceId}">client.workspaces.<a href="./src/resources/workspaces.ts">retrieve</a>(workspaceID) -> WorkspaceRetrieveResponse</code>
- <code title="get /v3/workspaces">client.workspaces.<a href="./src/resources/workspaces.ts">list</a>() -> WorkspaceListResponse</code>
