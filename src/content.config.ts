import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const products = defineCollection({
  loader: glob({ pattern: "*.json", base: "./src/data/create" }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      weight: z.number(),
      short_description: z.string(),
      coverImage: image(),
    }),
});

const news = defineCollection({
  // Load Markdown and MDX files in the `src/content/news/` directory.
  loader: glob({ base: "./src/content/news", pattern: "**/*.{md,mdx}" }),
  // Type-check frontmatter using a schema
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      authors: z.array(z.string()),
      pubDate: z.coerce.date(),
      coverImage: image().optional(),
    }),
});

export const collections = { news, products };
