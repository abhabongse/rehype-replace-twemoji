import { fileURLToPath } from "node:url";

import { rehypeReplaceTwemoji } from "@abhabongse/rehype-replace-twemoji";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

import { createMain } from "./shared-main.ts";

export const defaultProcessor = unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeReplaceTwemoji)
  .use(rehypeStringify);

const main = createMain(defaultProcessor);

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await main();
}
