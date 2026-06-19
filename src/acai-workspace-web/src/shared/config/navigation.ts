export type AppNavItem = {
  key: string;
  label: string;
  path: string;
  description: string;
  isImplemented: boolean;
};

export const appNavigation: AppNavItem[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/dashboard",
    description: "Executive workspace overview and system entry point",
    isImplemented: true,
  },
  {
    key: "knowledge-base",
    label: "Knowledge Base (RAG)",
    path: "/knowledge-base",
    description: "Centralized retrieval-augmented knowledge operations",
    isImplemented: false,
  },
  {
    key: "ai-chat",
    label: "AI Chat",
    path: "/ai-chat",
    description: "Conversational assistants for contextual team workflows",
    isImplemented: false,
  },
  {
    key: "document-intelligence",
    label: "Document Intelligence",
    path: "/document-intelligence",
    description: "Extraction, analysis, and understanding for enterprise files",
    isImplemented: false,
  },
  {
    key: "audio-intelligence",
    label: "Audio Intelligence",
    path: "/audio-intelligence",
    description: "Transcription and language intelligence for audio assets",
    isImplemented: false,
  },
  {
    key: "image-intelligence",
    label: "Image Intelligences",
    path: "/image-intelligence",
    description: "Generation and transformation workflows for visual content",
    isImplemented: false,
  },
  {
    key: "report-generation",
    label: "Report Generation",
    path: "/report-generation",
    description: "Template-based enterprise report assembly and delivery",
    isImplemented: false,
  },
  {
    key: "multi-agent-workflows",
    label: "Multi-Agent Workflows",
    path: "/multi-agent-workflows",
    description: "Coordinated specialist agent pipelines for complex tasks",
    isImplemented: false,
  },
  {
    key: "user-management",
    label: "User Management",
    path: "/user-management",
    description: "Identity and access administration for workspace operators",
    isImplemented: false,
  },
];
