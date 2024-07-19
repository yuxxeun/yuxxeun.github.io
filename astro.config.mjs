import { defineConfig, sharpImageService } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import { readFileSync } from "node:fs";
import icon from "astro-icon";
import expressiveCode from "astro-expressive-code";
import mdx from "@astrojs/mdx";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { remarkReadingTime } from "./remark-reading-time.mjs";
import react from "@astrojs/react";
import { toString } from "hast-util-to-string";
import { h } from "hastscript";

/** @type {import('astro-expressive-code').AstroExpressiveCodeOptions} */
import vue from "@astrojs/vue";
const astroExpressiveCodeOptions = {
  themes: ["min-dark", "min-light"]
};
const AnchorLinkIcon = h("svg", {
  width: 20,
  height: 20,
  version: 1.1,
  viewBox: "0 0 16 16",
  xlmns: "http://www.w3.org/2000/svg"
}, h("path", {
  fillRule: "eventodd",
  fill: "currentcolor",
  d: "M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
}));
const createSROnlyLabel = text => {
  const node = h("span.sr-only", `Section titled ${escape(text)}`);
  node.properties["is:raw"] = true;
  return node;
};

// https://astro.build/config
export default defineConfig({
  markdown: {
    remarkPlugins: [remarkReadingTime],
    rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, {
      behavior: "prepend",
      group: ({
        tagName
      }) => h(`div.heading-wrapper.level-${tagName}`, {
        tabIndex: -1
      }),
      content: heading => [h(`span.anchor-icon`, {
        ariaHidden: "true"
      }, AnchorLinkIcon), createSROnlyLabel(toString(heading))],
      headingProperties: {
        className: ["anchor"]
      },
      properties: {
        className: ["anchor-link mr-5"]
      }
    }]]
  },
  integrations: [(await import("astro-compress")).default({
    CSS: false,
    SVG: false
  }), tailwind(), sitemap(), expressiveCode(astroExpressiveCodeOptions), icon(), mdx(), react(), vue()],
  image: {
    service: sharpImageService()
  },
  site: "https://yuxxeun.github.io",
  base: 'https://github.com/yuxxeun/yuxxeun.github.io',
  vite: {
    plugins: [rawFonts([".ttf", ".woff"])],
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"]
    }
  }
});

// vite plugin to import fonts
function rawFonts(ext) {
  return {
    name: "vite-plugin-raw-fonts",
    transform(_, id) {
      if (ext.some(e => id.endsWith(e))) {
        const buffer = readFileSync(id);
        return {
          code: `export default ${JSON.stringify(buffer)}`,
          map: null
        };
      }
    }
  };
}