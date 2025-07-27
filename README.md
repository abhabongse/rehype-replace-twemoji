# Twemoji Replacer for Rehype

[![JSR][jsr:package/badge]][jsr:package/overview]

A [rehype][] plugin for replacing Unicode Emoji codepoints
with images from [jdecked/twemoji][github:twemoji].

This plugin does not provide SVG image icons by itself
but leverages the mechanisms provided by the upstream [jdecked/twemoji][github:twemoji].
By default, it replaces Unicode Emoji codepoints
with HTML `<img>` tags pointing to [icons hosted on jsDelivr][jsdelivr:twemoji].

Since it leverages the script from
By default, it leverages the \[hosting of Twemoji icons on jsDelivr.

<!-- Definitions -->

[github:twemoji]: https://github.com/jdecked/twemoji

[jsdelivr:twemoji]: https://www.jsdelivr.com/package/gh/jdecked/twemoji

[jsr:package/badge]: https://jsr.io/badges/@abhabongse/rehype-replace-twemoji

[jsr:package/overview]: https://jsr.io/@abhabongse/rehype-replace-twemoji

[rehype]: https://github.com/rehypejs/rehype
