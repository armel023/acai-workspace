# Component Catalog

## Purpose

Defines reusable frontend components.

Reusable components belong in:

src/shared/components

---

# DataTable

Purpose:

Display tabular data.

Used By:

- Templates
- Documents
- Reports
- Users

Props:

- data
- columns
- loading

---

# FileUploader

Purpose:

Upload files.

Supported:

- Documents
- Audio
- Images

Props:

- acceptedTypes
- maxSizeMb
- onUpload

Use React Dropzone.

---

# PageHeader

Purpose:

Consistent page headers.

Props:

- title
- subtitle
- actions

---

# LoadingOverlay

Purpose:

Display loading state.

Props:

- isLoading

---

# ConfirmDialog

Purpose:

Delete confirmation.

Props:

- title
- description
- onConfirm

---

# EmptyState

Purpose:

Display empty results.

Props:

- title
- description

---

# ErrorState

Purpose:

Display error messages.

Props:

- title
- description
- retryAction

---

# ChatWindow

Purpose:

Reusable chat interface.

Used By:

- Knowledge Chat
- Document Chat

---

# MarkdownViewer

Purpose:

Render AI responses.

Use:

react-markdown

---

# AudioPlayer

Purpose:

Playback transcribed audio.

---

# ImageViewer

Purpose:

Display uploaded and generated images.

---

# Component Rules

Reusable components:

- Must be generic
- Must be typed
- Must be documented

Do not place feature-specific business logic in reusable components.

Feature-specific logic belongs inside feature folders.
