import { PassThrough } from "node:stream";
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router";
import { HelmetProvider } from "react-helmet-async";
import type { HelmetServerState } from "react-helmet-async";
import App from "./App";

export interface RenderResult {
  /** Fully rendered page body (inside <div id="root">) */
  html: string;
  /** Head tags managed by react-helmet-async (title/meta/link/script) */
  helmet: string;
}

// Must mirror src/main.tsx so the prerendered markup matches the client tree.
const basename = import.meta.env.BASE_URL.replace(/\/+$/, "");

const RENDER_TIMEOUT_MS = 20000;

/**
 * Server-renders one route to static HTML.
 *
 * renderToPipeableStream + onAllReady waits for all Suspense boundaries
 * (the lazy page chunks), so the output contains the real page content,
 * not the loading fallback.
 */
export function renderRoute(url: string): Promise<RenderResult> {
  const helmetContext: { helmet?: HelmetServerState | null } = {};

  return new Promise((resolve, reject) => {
    let finished = false;
    let timeout: ReturnType<typeof setTimeout> | undefined;

    const finish = (fn: () => void) => {
      if (finished) return;
      finished = true;
      if (timeout) clearTimeout(timeout);
      fn();
    };

    const stream = renderToPipeableStream(
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={url} basename={basename}>
          <App />
        </StaticRouter>
      </HelmetProvider>,
      {
        onAllReady() {
          const passthrough = new PassThrough();
          const chunks: string[] = [];
          passthrough.on("data", (chunk: Buffer) => chunks.push(chunk.toString()));
          passthrough.on("end", () => {
            const helmet = helmetContext.helmet;
            const helmetHtml = helmet
              ? [
                  helmet.title?.toString(),
                  helmet.meta?.toString(),
                  helmet.link?.toString(),
                  helmet.script?.toString(),
                ]
                  .filter(Boolean)
                  .join("")
              : "";
            finish(() =>
              resolve({ html: chunks.join(""), helmet: helmetHtml })
            );
          });
          stream.pipe(passthrough);
        },
        onError(error: unknown) {
          // Fatal errors never reach onAllReady, so the timeout below rejects;
          // this handler only records the problem for diagnostics.
          console.error("[prerender] render error for", url, error);
        },
      }
    );

    // Safety net: never let the build hang on a broken route.
    timeout = setTimeout(() => {
      stream.abort();
      finish(() => reject(new Error(`Prerender of "${url}" timed out after ${RENDER_TIMEOUT_MS}ms`)));
    }, RENDER_TIMEOUT_MS);
  });
}
