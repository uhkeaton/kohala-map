import { ThemeProvider } from "@emotion/react";
import { ControllerView } from "./ControllerView";
import { Map } from "./Map";
import { useGlobal } from "./useGlobal";
import { WelcomeDialog } from "./WelcomeDialog";
import { createTheme } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export function App() {
  const { displaySettings } = useGlobal();
  return (
    <ThemeProvider theme={darkTheme}>
      <WelcomeDialog />
      {(displaySettings.view == "map" || displaySettings.view == "editor") && (
        <Map />
      )}
      {displaySettings.view == "controller" && <ControllerView />}
    </ThemeProvider>
  );
}
