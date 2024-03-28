import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

export const STYLED_COMPONENTS_PLACEHOLDER = "__STYLED_COMPONENTS_PLACEHOLDER__";
const isServer = typeof document === "undefined";

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        {isServer && STYLED_COMPONENTS_PLACEHOLDER}
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
