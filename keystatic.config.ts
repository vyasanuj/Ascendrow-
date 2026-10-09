import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'github',
    repo: 'vyasanuj/Ascendrow-',
  },
  collections: {
    services: collection({
      label: 'Services',
      slugField: 'id',
      path: 'src/content/services/*',
      format: { data: 'json' },
      schema: {
        id: fields.slug({ name: { label: 'ID' } }),
        seo: fields.object({
          title: fields.text({ label: 'SEO Title' }),
          description: fields.text({ label: 'SEO Description' }),
        }, { label: 'SEO' }),
        hero: fields.object({
          mainHeading: fields.text({ label: 'Main Heading' }),
          mainHeadingHighlight: fields.text({ label: 'Main Heading Highlight' }),
          folders: fields.array(fields.object({
            title: fields.text({ label: 'Folder Title' }),
            color: fields.text({ label: 'Folder Color' }),
            textColor: fields.text({ label: 'Folder Text Color' }),
            content: fields.object({
              items: fields.array(fields.text({ label: 'Item' }), { label: 'Items', itemLabel: props => props.value }),
              image: fields.text({ label: 'Image URL' }),
              heading: fields.text({ label: 'Heading' }),
              description: fields.text({ label: 'Description' }),
            }, { label: 'Content' }),
          }), { label: 'Folders', itemLabel: props => props.fields.title.value }),
        }, { label: 'Hero' }),
        process: fields.array(fields.object({
          step: fields.text({ label: 'Step Number' }),
          title: fields.text({ label: 'Title' }),
          description: fields.text({ label: 'Description' }),
        }), { label: 'Process Steps', itemLabel: props => props.fields.title.value }),
        arsenal: fields.array(fields.object({
          name: fields.text({ label: 'Name' }),
          category: fields.text({ label: 'Category' }),
          description: fields.text({ label: 'Description' }),
        }), { label: 'Arsenal Tools', itemLabel: props => props.fields.name.value }),
        faq: fields.array(fields.object({
          question: fields.text({ label: 'Question' }),
          answer: fields.text({ label: 'Answer' }),
        }), { label: 'FAQ', itemLabel: props => props.fields.question.value }),
        growthSection: fields.object({
          headlinePrimary: fields.text({ label: 'Primary Headline' }),
          headlineSecondary: fields.text({ label: 'Secondary Headline' }),
          metrics: fields.array(fields.object({
            value: fields.text({ label: 'Value' }),
            label: fields.text({ label: 'Label' }),
            color: fields.text({ label: 'Color Hex' }),
            colorRgb: fields.text({ label: 'Color RGB (e.g. 74,144,226)' }),
            barHeight: fields.text({ label: 'Bar Height (e.g. 35%)' }),
          }), { label: 'Metrics', itemLabel: props => props.fields.label.value }),
        }, { label: 'Growth Section' }),
        cta: fields.object({
          headline: fields.text({ label: 'Headline' }),
          subtext: fields.text({ label: 'Subtext' }),
          buttonText: fields.text({ label: 'Button Text' }),
          buttonHref: fields.text({ label: 'Button Href' }),
        }, { label: 'CTA' }),
      },
    }),
    caseStudies: collection({
      label: 'Case Studies',
      slugField: 'id',
      path: 'src/content/case-studies/*',
      format: { data: 'json' },
      schema: {
        id: fields.slug({ name: { label: 'ID' } }),
        seo: fields.object({
          title: fields.text({ label: 'SEO Title' }),
          description: fields.text({ label: 'SEO Description' }),
        }, { label: 'SEO' }),
        hero: fields.object({
          headlineText: fields.text({ label: 'Headline Text' }),
          headlineHighlight: fields.text({ label: 'Headline Highlight' }),
          image: fields.text({ label: 'Main Image Path' }),
          bottomImage: fields.text({ label: 'Bottom Image Path' }),
        }, { label: 'Hero' }),
        metadata: fields.object({
          client: fields.object({
            logo: fields.text({ label: 'Logo Path' }),
            name: fields.text({ label: 'Client Name' }),
            url: fields.text({ label: 'Website URL' }),
            urlLabel: fields.text({ label: 'Website URL Label' }),
            logoNeedsWhiteBackground: fields.checkbox({ label: 'Logo Needs White Background?' }),
          }, { label: 'Client' }),
          role: fields.text({ label: 'Role' }),
          contact: fields.object({
            name: fields.text({ label: 'Contact Name' }),
            avatar: fields.text({ label: 'Avatar URL' }),
          }, { label: 'Contact' }),
        }, { label: 'Metadata' }),
        aboutProject: fields.object({
          title: fields.text({ label: 'Title' }),
          highlightText: fields.text({ label: 'Highlight Text' }),
          bodyText: fields.text({ label: 'Body Text' }),
          industry: fields.array(fields.text({ label: 'Industry' }), { label: 'Industries', itemLabel: props => props.value }),
          services: fields.array(fields.text({ label: 'Service' }), { label: 'Services', itemLabel: props => props.value }),
        }, { label: 'About Project' }),
        leftContent: fields.blocks({
          text: {
            label: 'Text Block',
            schema: fields.object({
              content: fields.text({ label: 'Content', multiline: true }),
            }),
          },
          section: {
            label: 'Section Block',
            schema: fields.object({
              title: fields.text({ label: 'Title' }),
              paragraphs: fields.array(fields.text({ label: 'Paragraph', multiline: true }), { label: 'Paragraphs', itemLabel: props => props.value.substring(0, 30) }),
            }),
          },
          resultBox: {
            label: 'Result Box',
            schema: fields.object({
              title: fields.text({ label: 'Title' }),
              description: fields.text({ label: 'Description', multiline: true }),
              stats: fields.array(fields.object({
                value: fields.text({ label: 'Value' }),
                label: fields.text({ label: 'Label' }),
              }), { label: 'Stats', itemLabel: props => props.fields.label.value }),
              footer: fields.text({ label: 'Footer Note' }),
            }),
          },
          images: {
            label: 'Image Gallery',
            schema: fields.object({
              items: fields.array(fields.object({
                src: fields.text({ label: 'Image Source' }),
                alt: fields.text({ label: 'Alt Text' }),
              }), { label: 'Images', itemLabel: props => props.fields.alt.value }),
            }),
          }
        }, { label: 'Left Content' }),
        rightTimeline: fields.array(fields.object({
          title: fields.text({ label: 'Title' }),
          subtitle: fields.text({ label: 'Subtitle' }),
          descriptionHtml: fields.text({ 
            label: 'Description HTML', 
            multiline: true
          }),
        }), { label: 'Right Timeline', itemLabel: props => props.fields.title.value }),
      },
    }),
  },
});
