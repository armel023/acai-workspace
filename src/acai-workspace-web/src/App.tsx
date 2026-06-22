import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "./features/Authentication/pages/LoginPage";
import { RegisterPage } from "./features/Authentication/pages/RegisterPage";
import { DashboardPage } from "./features/Dashboard/pages/DashboardPage";
import { OrganizationManagementPage } from "./features/organizationManagement/pages/OrganizationManagementPage";
import { UserManagementPage } from "./features/userManagement/pages/UserManagementPage";
import { AppShell } from "./shared/components/AppShell";
import { ComingSoonPage } from "./shared/components/ComingSoonPage";

function App() {
  return (
    <Routes>
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/register" element={<RegisterPage />} />

      <Route element={<AppShell />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route
          path="/knowledge-base"
          element={
            <ComingSoonPage
              title="Knowledge Base (RAG)"
              description="Build and query enterprise retrieval-augmented knowledge repositories with governance and contextual relevance."
            />
          }
        />
        <Route
          path="/ai-chat"
          element={
            <ComingSoonPage
              title="AI Chat"
              description="Enable role-aware conversational AI assistants for team collaboration and domain workflows."
            />
          }
        />
        <Route
          path="/document-intelligence"
          element={
            <ComingSoonPage
              title="Document Intelligence"
              description="Automate extraction, classification, and interpretation of enterprise documents at scale."
            />
          }
        />
        <Route
          path="/audio-intelligence"
          element={
            <ComingSoonPage
              title="Audio Intelligence"
              description="Convert speech to actionable insights with transcription, summarization, and semantic enrichment."
            />
          }
        />
        <Route
          path="/image-intelligence"
          element={
            <ComingSoonPage
              title="Image Intelligences"
              description="Support visual generation and transformation workflows with quality and compliance controls."
            />
          }
        />
        <Route
          path="/report-generation"
          element={
            <ComingSoonPage
              title="Report Generation"
              description="Generate template-driven reports from AI outputs and operational datasets for stakeholders."
            />
          }
        />
        <Route
          path="/multi-agent-workflows"
          element={
            <ComingSoonPage
              title="Multi-Agent Workflows"
              description="Coordinate specialized AI agents to execute complex, multi-step enterprise processes."
            />
          }
        />
        <Route path="/user-management" element={<UserManagementPage />} />
        <Route
          path="/organization-management"
          element={<OrganizationManagementPage />}
        />
      </Route>

      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;
