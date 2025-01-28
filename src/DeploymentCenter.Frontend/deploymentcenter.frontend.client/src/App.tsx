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
    components: {
      MuiCssBaseline: {
          styleOverrides: ({ palette }) => {
             return `
                 *::-webkit-scrollbar {
                    height: 8px;
                    width: 8px;
                 }
                 *::-webkit-scrollbar-track {
                    border-radius: 4px;
                    background-color: ${palette.primary.light};
                 }
                  *::-webkit-scrollbar-track:hover {
                    background-color: ${palette.primary.light};
                  }
                  *::-webkit-scrollbar-track:active {
                    background-color: ${palette.primary.light};
                  }
              `;
          }
      },
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouteRecords />
    </ThemeProvider>
  );
}

export default App;
