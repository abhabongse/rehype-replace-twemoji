import twemoji, { type TwemojiOptions } from "@twemoji/api";
import type * as hast from "hast";
import { fromHtml } from "hast-util-from-html";
import type { Plugin } from "unified";
import { visit, SKIP } from "unist-util-visit";

/**
 * A {@link https://github.com/rehypejs/rehype | Rehype} plugin
 * that replaces Unicode Emoji codepoints with images from Twemoji.
 */
export const rehypeReplaceTwemoji: Plugin<[TwemojiOptions?], hast.Root> = (
  options: TwemojiOptions = {},
) => {
  return function (tree: hast.Root) {
    visit(tree, "text", (node, index, parent) => {
      if (!parent || index === undefined) return;

      // Uses @twemoji/api to parse Unicode Emoji codepoints into HTML <img> elements
      // See <https://github.com/jdecked/twemoji/blob/main/LEGACY.md#string-parsing>
      const newHtmlString = twemoji.parse(node.value, options);

      if (newHtmlString === node.value) return;

      // Convert raw HTML string into proper HAST nodes
      // and replace them back into the tree
      const newHastNode = fromHtml(newHtmlString, { fragment: true });
      parent.children.splice(index, 1, ...newHastNode.children);

      // Skips HAST nodes we've just added
      return [SKIP, index + newHastNode.children.length];
    });
  };
};
