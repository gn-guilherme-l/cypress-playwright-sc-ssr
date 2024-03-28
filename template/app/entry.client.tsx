import { ThemeProvider } from "styled-components";
import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import GlobalStyles from "./global-styles";
import { Theme } from "./theme";

const theme: Theme = { bg: "CornflowerBlue", fg: "Coral" };

async function hydrate() {
  startTransition(() => {
    hydrateRoot(
      document,
      <App />
    );
  });
}

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <StrictMode>
        <GlobalStyles />
        <RemixBrowser />
      </StrictMode>
    </ThemeProvider>
  );
}

if (window.requestIdleCallback) {
  window.requestIdleCallback(hydrate);
} else {
  // Safari doesn't support requestIdleCallback
  // https://caniuse.com/requestidlecallback
  window.setTimeout(hydrate, 1);
}
