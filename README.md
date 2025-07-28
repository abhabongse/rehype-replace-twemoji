# Twemoji Replacer for Rehype

[![JSR][jsr:package/badge]][jsr:package/overview]

A [rehype][] plugin for replacing Unicode Emoji codepoints
with images from [jdecked/twemoji][github:twemoji].


## What is this?

This plugin extends the functionality of [jdecked/twemoji][github:twemoji]
to the [unified][] ([rehype][]) pipeline.
It scans for Unicode Emoji codepoints in HTML content
and replaces them with HTML `<img>` elements pointing to images of Emoji.

By default, it replaces Unicode Emoji codepoints with HTML `<img>` tags
pointing to [icons hosted on jsDelivr][jsdelivr:twemoji].
However, this plugin exposes the options of the upstream
[jdecked/twemoji][github:twemoji] package so it is possible
to change the URL to something else of your choice.


## When should I use this?

This plugin ensures that usage of Emoji characters in your content
appears normally and consistently in all kinds of client platforms.


## Example Usage

Suppose that you have the following HTML content:

```html
<p>
Lorem ipsum dolor sit amet, consectetur adipiscing elit.
😭 Vivamus iaculis eleifend ligula non blandit.
🇮🇸 Quisque ac ultrices elit. In iaculis mollis sagittis.
👨🏽‍🍼 Mauris a sapien blandit tortor porttitor scelerisque.
🏳️‍🌈 Donec molestie sapien orci, quis rutrum ante semper in.
👩‍🚀 Morbi bibendum elit vitae eros varius, sit amet tempus risus gravida.
❤️‍🔥 Phasellus non convallis nisi, non porta eros.
Nullam suscipit vel erat non eleifend.
</p>
```

With the plugin in the Rehype pipeline, the HTML output becomes:

```html
<p>
Lorem ipsum dolor sit amet, consectetur adipiscing elit.
<img class="emoji" draggable="false" alt="😭" src="https://cdn.jsdelivr.net/gh/jdecked/twemoji@16.0.1/assets/72x72/1f62d.png"> Vivamus iaculis eleifend ligula non blandit.
<img class="emoji" draggable="false" alt="🇮🇸" src="https://cdn.jsdelivr.net/gh/jdecked/twemoji@16.0.1/assets/72x72/1f1ee-1f1f8.png"> Quisque ac ultrices elit. In iaculis mollis sagittis.
<img class="emoji" draggable="false" alt="👨🏽‍🍼" src="https://cdn.jsdelivr.net/gh/jdecked/twemoji@16.0.1/assets/72x72/1f468-1f3fd-200d-1f37c.png"> Mauris a sapien blandit tortor porttitor scelerisque.
<img class="emoji" draggable="false" alt="🏳️‍🌈" src="https://cdn.jsdelivr.net/gh/jdecked/twemoji@16.0.1/assets/72x72/1f3f3-fe0f-200d-1f308.png"> Donec molestie sapien orci, quis rutrum ante semper in.
<img class="emoji" draggable="false" alt="👩‍🚀" src="https://cdn.jsdelivr.net/gh/jdecked/twemoji@16.0.1/assets/72x72/1f469-200d-1f680.png"> Morbi bibendum elit vitae eros varius, sit amet tempus risus gravida.
<img class="emoji" draggable="false" alt="❤️‍🔥" src="https://cdn.jsdelivr.net/gh/jdecked/twemoji@16.0.1/assets/72x72/2764-fe0f-200d-1f525.png"> Phasellus non convallis nisi, non porta eros.
Nullam suscipit vel erat non eleifend.
</p> 
```


## Installation

To use the plugin, install both [`@abhabongse/rehype-replace-twemoji`][jsr:package/overview]
and its required peer dependency [`@twemoji/api`][github:twemoji] (version 16.0.0 or higher).
Head over to the [package home page on JSR][jsr:package/overview]
on how to install the plugin package itself.

```sh
# Install with npm 
npx jsr add @abhabongse/rehype-replace-twemoji
npm install @twemoji/api

# Install with pnpm 10.9+
pnpm i jsr:@abhabongse/rehype-replace-twemoji @twemoji/api

# Install with pnpm (older versions)
pnpm dlx jsr add @abhabongse/rehype-replace-twemoji
pnpm i @twemoji/api

# Install with yarn 4.9+
yarn add jsr:@abhabongse/rehype-replace-twemoji @twemoji/api

# Install with yarn (older versions)
yarn dlx jsr add @abhabongse/rehype-replace-twemoji
yarn add @twemoji/api

# Install with deno
deno add jsr:@abhabongse/rehype-replace-twemoji npm:@twemoji/api

# Install with bun
bunx jsr add @abhabongse/rehype-replace-twemoji
bun add @twemoji/api
```

> \[!NOTE]
> If you encounter peer dependency warnings,
> ensure you have `@twemoji/api` version 16.0.0 or higher installed.
> This package is required for the plugin to function properly.

To use the plugin in your pipeline,
consult the relevant documentation with the keyword [rehype][].

- [Astro](https://docs.astro.build/en/guides/markdown-content/#adding-remark-and-rehype-plugins)
- [MDX](https://mdxjs.com/docs/extending-mdx/#using-plugins)
- [Next.js](https://nextjs.org/docs/app/guides/mdx#remark-and-rehype-plugins)
- [Nuxt Content](https://content.nuxt.com/docs/getting-started/configuration#rehypeplugins)


## Customization via Options

If you wish to avoid using third-party CDNs or prefer SVG images,
you can pass long options to the upstream
[jdecked/twemoji][github:twemoji] package.

```typescript
const options = {
  className: "twemoji",
  callback(icon: string): string {
    return `/twemoji/${icon}.svg`;
  },
}
```

With these options, the original example HTML from above
will be transformed into the following:

```html
<p>
Lorem ipsum dolor sit amet, consectetur adipiscing elit.
<img class="twemoji" draggable="false" alt="😭" src="/twemoji/1f62d.svg"> Vivamus iaculis eleifend ligula non blandit.
<img class="twemoji" draggable="false" alt="🇮🇸" src="/twemoji/1f1ee-1f1f8.svg"> Quisque ac ultrices elit. In iaculis mollis sagittis.
<img class="twemoji" draggable="false" alt="👨🏽‍🍼" src="/twemoji/1f468-1f3fd-200d-1f37c.svg"> Mauris a sapien blandit tortor porttitor scelerisque.
<img class="twemoji" draggable="false" alt="🏳️‍🌈" src="/twemoji/1f3f3-fe0f-200d-1f308.svg"> Donec molestie sapien orci, quis rutrum ante semper in.
<img class="twemoji" draggable="false" alt="👩‍🚀" src="/twemoji/1f469-200d-1f680.svg"> Morbi bibendum elit vitae eros varius, sit amet tempus risus gravida.
<img class="twemoji" draggable="false" alt="❤️‍🔥" src="/twemoji/2764-fe0f-200d-1f525.svg"> Phasellus non convallis nisi, non porta eros.
Nullam suscipit vel erat non eleifend.
</p>
```


## API Reference

Head over to the [JSR package documentation][jsr:package/api-reference] for the full API documentation.


## Help, Support, and Contribute

If you are a user of this package, I would like to hear from you!
[Create a discussion thread][github:package/discussion]
or send me a direct message if you have feedback or suggestions.


## License

[Apache-2.0](./LICENSE) © Abhabongse Janthong

<!-- Definitions -->

[github:package/discussion]: https://github.com/abhabongse/rehype-replace-twemoji/discussions

[github:twemoji]: https://github.com/jdecked/twemoji

[github:twemoji/options]: https://github.com/jdecked/twemoji?tab=readme-ov-file#object-as-parameter

[jsdelivr:twemoji]: https://www.jsdelivr.com/package/gh/jdecked/twemoji

[jsr:package/api-reference]: https://jsr.io/@abhabongse/rehype-replace-twemoji/doc

[jsr:package/badge]: https://jsr.io/badges/@abhabongse/rehype-replace-twemoji

[jsr:package/overview]: https://jsr.io/@abhabongse/rehype-replace-twemoji

[rehype]: https://github.com/rehypejs/rehype

[unified]: https://github.com/unifiedjs/unified
