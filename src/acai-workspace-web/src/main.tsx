import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import App from "./App.tsx";
import { appTheme } from "./shared/themes/appTheme.ts";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <SnackbarProvider
          maxSnack={3}
          autoHideDuration={3200}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </SnackbarProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);
