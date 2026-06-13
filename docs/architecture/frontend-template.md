# Frontend Architecture Template

## Purpose

This document defines the frontend architecture used by Acai Workspace.

The goals are:

- Maintainability
- Reusability
- Scalability
- Type Safety
- Consistent User Experience

---

# Technology Stack

Framework:

- React
- TypeScript
- Vite

UI:

- Material UI (MUI)

Data Fetching:

- TanStack Query

Forms:

- React Hook Form
- Zod

State Management:

- Zustand

API:

- Axios

Realtime:

- SignalR

Tables:

- TanStack Table

Notifications:

- Notistack

Markdown:

- React Markdown

---

# Folder Structure

```text
src/

features/
└──components/
└──hooks/
└──services/
└──stores/
└──pages/
└──schemas

shared/
├── components/
├── config/
├── constants/
├── hooks/
├── lib/
├── stores/
├── themes/
├── types/
├── utils/

```

---

# Architecture Rules

## Organize By Feature

Good:

```text
features/

├── chat/
├── documents/
├── audio/
├── images/
├── templates/
```

Bad:

```text
components/
pages/
services/
everything mixed together
```

Features own their business functionality.

---

# Feature Structure

Example:

```text
features/

chat/

├── api/
├── components/
├── hooks/
├── types/
├── pages/
└── utils/
```

---

# Reusable Components

Reusable components belong in:

```text
components/
```

Examples:

```text
components/

DataTable/
FileUploader/
PageHeader/
LoadingOverlay/
ConfirmDialog/
EmptyState/
ChatWindow/
AudioPlayer/
ImageViewer/
```

Reusable components must not contain feature-specific logic.

---

# Feature Components

Feature-specific components belong inside the feature.

Example:

```text
features/chat/components/
```

Good:

```text
ChatMessage
ConversationSidebar
PromptInput
```

Bad:

```text
components/ChatMessage
```

because it is only used by Chat.

---

# Page Structure

Pages should be thin.

Example:

```tsx
export function ChatPage() {
  return <ChatFeature />;
}
```

Pages should compose features.

Pages should not contain business logic.

---

# Data Fetching

Use TanStack Query.

Good:

```tsx
const { data } = useQuery({
  queryKey: ["templates"],
  queryFn: getTemplates,
});
```

Bad:

```tsx
useEffect(() => {
    fetch(...)
}, []);
```

Do not use useEffect for API calls.

---

# Query Organization

Example:

```text
features/

templates/

api/

├── getTemplates.ts
├── getTemplate.ts
├── createTemplate.ts
├── updateTemplate.ts
└── deleteTemplate.ts
```

---

# API Layer

All HTTP calls belong in:

```text
services/
```

Example:

```text
services/

apiClient.ts
```

```tsx
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
```

Feature APIs use the shared client.

---

# State Management

Use Zustand only for:

- User session
- Theme
- Chat UI state
- Application settings

Do not store server data in Zustand.

Server data belongs in React Query.

---

# Forms

Use:

- React Hook Form
- Zod

Example:

```tsx
const form = useForm<FormValues>({
  resolver: zodResolver(schema),
});
```

Avoid manual validation.

---

# Type Safety

Never use:

```tsx
any;
```

Prefer:

```tsx
interface;
type;
```

All API responses should be typed.

Example:

```tsx
export interface TemplateResponse {
  id: string;
  name: string;
}
```

---

# Component Rules

Components should:

- Have one responsibility
- Be reusable when possible
- Be easy to test

Avoid components larger than 300 lines.

Split when necessary.

---

# MUI Rules

Use MUI components whenever possible.

Good:

```tsx
Button;
Dialog;
Drawer;
DataGrid;
Card;
```

Avoid custom implementations of existing MUI functionality.

---

# Chat UI

Chat feature structure:

```text
features/chat/

components/

├── ChatWindow
├── ChatMessage
├── ChatInput
├── ConversationList
```

Messages should render markdown.

Streaming responses should use SignalR.

---

# File Uploads

Use React Dropzone.

Reusable component:

```text
components/FileUploader
```

Supports:

- Documents
- Audio
- Images

Feature-specific logic remains outside the component.

---

# SignalR

SignalR connections belong in:

```text
services/signalr
```

Examples:

```text
ChatHubClient
NotificationHubClient
```

Do not create SignalR connections inside components.

---

# Loading States

Always provide:

- Loading
- Empty
- Error

states.

Never leave blank screens.

---

# Error Handling

Display user-friendly messages.

Use Notistack for notifications.

Example:

```tsx
enqueueSnackbar("Document uploaded successfully", { variant: "success" });
```

---

# Theme

Theme configuration belongs in:

```text
theme/
```

Use centralized design tokens.

Avoid hardcoded colors.

---

# Naming Conventions

Components:

```text
ChatWindow.tsx
FileUploader.tsx
DocumentViewer.tsx
```

Hooks:

```text
useChat.ts
useTemplates.ts
useUploadDocument.ts
```

Stores:

```text
useAuthStore.ts
useThemeStore.ts
```

Types:

```text
TemplateResponse.ts
ChatMessage.ts
```

---

# Testing

Use:

- Vitest
- React Testing Library

Test:

- Hooks
- Components
- Feature behavior

Avoid snapshot-heavy testing.

---

# Checklist

Before creating a new feature:

- Feature folder exists
- API layer exists
- Types defined
- Queries typed
- No useEffect data fetching
- Uses React Query
- Uses React Hook Form
- Uses Zod
- Uses MUI
- Uses reusable components when possible
- Has loading state
- Has error state
- Has empty state
- No any types

If all checks pass, the feature follows Acai Workspace frontend standards.
