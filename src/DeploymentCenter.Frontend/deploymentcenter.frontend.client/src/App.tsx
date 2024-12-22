import "./App.scss";
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import { RouteRecords } from "./RouteRecords";
import { useSignals } from "@preact/signals-react/runtime";

function App() {
  useSignals();
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = createTheme({
    palette: {
      mode: prefersDarkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouteRecords />
    </ThemeProvider>
  );
}

export default App;
