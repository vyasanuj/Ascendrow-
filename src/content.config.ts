import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const caseStudiesCollection = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/case-studies" }),
  schema: z.object({
    id: z.string(),
    seo: z.object({
      title: z.string(),
      description: z.string(),
    }),
    hero: z.object({
      headlineText: z.string(),
      headlineHighlight: z.string(),
      image: z.string().optional(),
      bottomImage: z.string().optional(),
    }),
    metadata: z.object({
      client: z.object({
        logo: z.string(),
        name: z.string(),
        url: z.string().optional(),
        urlLabel: z.string().optional(),
      }),
      role: z.string(),
      contact: z.object({
        name: z.string(),
        avatar: z.string(),
      }),
    }),
    aboutProject: z.object({
      title: z.string().optional(),
      highlightText: z.string(),
      bodyText: z.string().optional(),
      industry: z.array(z.string()).optional(),
      services: z.array(z.string()).optional(),
    }).optional(),
    leftContent: z.array(z.any()), // Array of flexible content blocks (text, section, resultBox, images)
    rightTimeline: z.array(z.object({
      title: z.string(),
      subtitle: z.string().optional(),
      descriptionHtml: z.string(),
    })),
  }),
});

export const collections = {
  'case-studies': caseStudiesCollection,
};
