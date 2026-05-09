// @ts-check
import { defineConfig } from "astro/config";
import remarkToc from "remark-toc";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  output: "static",
  site: "https://xpans.audio",

  markdown: {
    remarkPlugins: [[remarkToc, { heading: "toc", maxDepth: 3 }]],
  },

  integrations: [sitemap()],
});
