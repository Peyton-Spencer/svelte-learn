import type { PageLoad } from "./$types";

export const load = (async ({ setHeaders }) => {
  setHeaders({
    "cache-control": "max-age=3600", // 1 hour
  });
  return {
    title: "our little app",
  };
}) satisfies PageLoad;
