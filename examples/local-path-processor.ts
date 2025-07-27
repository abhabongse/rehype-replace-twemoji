import { fileURLToPath } from "node:url";

import { rehypeReplaceTwemoji } from "@abhabongse/rehype-replace-twemoji";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

import { createMain } from "./shared-main.ts";

const customTwemojiConfig = {
  className: "twemoji",
  callback(icon: string): string {
    return `/twemoji/${icon}.svg`;
  },
};

export const localPathProcessor = unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeReplaceTwemoji, customTwemojiConfig)
  .use(rehypeStringify);

const main = createMain(localPathProcessor);

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await main();
}
