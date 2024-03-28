import { PassThrough } from "node:stream";
import type { EntryContext } from "@remix-run/node";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream, renderToString } from "react-dom/server";
import { ServerStyleSheet, ThemeProvider } from "styled-components";
import GlobalStyles from "./global-styles";
import { Theme } from "./theme";
import { STYLED_COMPONENTS_PLACEHOLDER } from "./root";

const ABORT_DELAY = 5_000;

const theme: Theme = { bg: "CornflowerBlue", fg: "Coral" }

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  const isBot = isbot(request.headers.get("user-agent"));
  const method = isBot ? "onAllReady" : "onShellReady";
  const sheet = new ServerStyleSheet();
  try {

    const App: React.FC = () => {
      return (
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <RemixServer context={remixContext} url={request.url} />
        </ThemeProvider>
      );
    };


    renderToString(sheet.collectStyles(<App />));
    const styles = sheet.getStyleTags();

    return new Promise<Response>((resolve, reject) => {
      let didError = false;
      const { pipe, abort } = renderToPipeableStream(<App />, {
        [method]: () => {
          const body = new PassThrough({
            transform: (chunk, enc, cb) => {
              // TODO: It's possible that the placeholder splits between one or more chunks. Improve this.
              const content = String(chunk);
              cb(null, content.replace(STYLED_COMPONENTS_PLACEHOLDER, styles));
            },
          });

          const stream = createReadableStreamFromReadable(body);

          responseHeaders.set("Content-Type", "text/html");

          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: didError ? 500 : responseStatusCode,
            })
          );
          pipe(body);
        },
        onShellError: (error: unknown) => {
          reject(error);
          // eslint-disable-next-line no-console
          console.error("onShellError", error);
        },
        onError: (error: unknown) => {
          didError = true;
          // eslint-disable-next-line no-console
          console.error(error);
        },
      });

      setTimeout(abort, ABORT_DELAY);
    });
  } finally {
    sheet.seal();
  }
}
