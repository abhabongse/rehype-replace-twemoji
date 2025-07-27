import rehypeParse from "rehype-parse";
import rehypeStringify from "rehype-stringify";
import { unified } from "unified";

export const roundtripHtmlProcessor = unified()
  .use(rehypeParse, { fragment: true })
  .use(rehypeStringify);
