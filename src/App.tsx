import { Route, Routes } from "react-router-dom";

import { useMediaQuery, CssBaseline, Stack } from "@mui/material";
import { useState, useMemo } from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import Header from "./components/Header";
import WelcomePage from "./components/WelcomePage";
import OrcaPage from "./OrcaPage";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState<"light" | "dark">(
    prefersDarkMode ? "dark" : "light"
  );
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Stack height="100vh" width="100vw" spacing={1}>
        <Header colorMode={mode} toggleColorMode={colorMode.toggleColorMode} />
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/orca" element={<OrcaPage />} />
        </Routes>
      </Stack>
    </ThemeProvider>
  );
}

export default App;
