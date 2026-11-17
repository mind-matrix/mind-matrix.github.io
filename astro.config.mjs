import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
    site: 'https://mind-matrix.github.io',
    integrations: [mdx(), sitemap({ filter: (page) => !page.includes('/gta6') })],
    markdown: {
        remarkPlugins: [
            'remark-math',
            'remark-gfm',
        ],
        rehypePlugins: [
            'rehype-slug', ['rehype-autolink-headings', { behavior: 'append' }],
            ['rehype-toc', { headings: ['h1', 'h2'], cssClasses: { toc: "toc" } }],
            ['rehype-katex', {}]
        ]
    }
});