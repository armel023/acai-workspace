import { createTheme } from "@mui/material/styles";

export const appTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0f766e",
      dark: "#115e59",
      light: "#14b8a6",
    },
    secondary: {
      main: "#b45309",
    },
    background: {
      default: "#f4f7f5",
      paper: "#ffffff",
    },
    text: {
      primary: "#102a2d",
      secondary: "#456164",
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: '"Public Sans", "Segoe UI", "Helvetica Neue", sans-serif',
    h3: {
      fontWeight: 700,
      letterSpacing: -0.5,
    },
    h4: {
      fontWeight: 700,
      letterSpacing: -0.3,
    },
    button: {
      textTransform: "none",
      letterSpacing: 0.3,
      fontWeight: 700,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          minHeight: 44,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
      },
    },
  },
});
