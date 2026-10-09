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
    leftContent: z.array(z.discriminatedUnion('discriminant', [
      z.object({
        discriminant: z.literal('text'),
        value: z.object({
          content: z.string(),
        })
      }),
      z.object({
        discriminant: z.literal('section'),
        value: z.object({
          title: z.string(),
          paragraphs: z.array(z.string()),
        })
      }),
      z.object({
        discriminant: z.literal('resultBox'),
        value: z.object({
          title: z.string(),
          description: z.string(),
          stats: z.array(z.object({ value: z.string(), label: z.string() })),
          footer: z.string().optional(),
        })
      }),
      z.object({
        discriminant: z.literal('images'),
        value: z.object({
          items: z.array(z.object({ src: z.string(), alt: z.string() })),
        })
      }),
    ])), // Typed content blocks: text | section | resultBox | images
    rightTimeline: z.array(z.object({
      title: z.string(),
      subtitle: z.string().optional(),
      descriptionHtml: z.string(),
    })),
  }),
});


const servicesCollection = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/services" }),
  schema: z.object({
    id: z.string(),
    seo: z.object({
      title: z.string(),
      description: z.string(),
    }),
    hero: z.object({
      mainHeading: z.string().optional(),
      folders: z.array(z.object({
        title: z.string(),
        color: z.string(),
        textColor: z.string().optional(),
        content: z.object({
          items: z.array(z.string()),
          image: z.string(),
          heading: z.string(),
          description: z.string(),
        })
      }))
    }),
    process: z.array(z.object({
      step: z.string(),
      title: z.string(),
      description: z.string()
    })).optional(),
    arsenal: z.array(z.object({
      name: z.string(),
      category: z.string(),
      description: z.string()
    })).optional(),
    faq: z.array(z.object({
      question: z.string(),
      answer: z.string()
    })).optional()
  }),
});

export const collections = {
  'case-studies': caseStudiesCollection,
  'services': servicesCollection,
};
