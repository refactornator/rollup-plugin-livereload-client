# rollup-plugin-livereload-client

🍣 A Rollup plugin which adds the LiveReload client for use during development

## Installation

```
npm install --save-dev rollup-plugin-livereload-client
```

## Usage

This plugin is meant to be used with plugins that output html, like [@rollup/plugin-html](https://github.com/rollup/plugins/tree/master/packages/html).

```js
// rollup.config.js
import html from "@rollup/plugin-html";
import livereloadClient from "rollup-plugin-livereload-client";

const development = process.env.ROLLUP_WATCH;

export default {
  entry: "entry.js",
  output: {
    dir: "build",
  },
  plugins: [html(), development && livereload()],
};
```

`index.html` will be modified to include a script tag to load `livereload.js`. Which will also be copied into the `build` directory.

## Options

### `port`

Type: `Number`<br>
Default: `35729`

Specifies the port number that the separate livereload server is running on.

## Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information what has changed recently.

## Contributing

Contributions and feedback are very welcome.

To get it running:

1. Clone the project.
2. `npm install`
3. `npm run build`

## Attribution

This plugin is similar to [rollup-plugin-livereload](https://github.com/thgh/rollup-plugin-livereload) by Thomas Ghysels. The main difference being, this is the client only. I needed this to integrate with the LiveReload server already running in Spring Boot.

## Credits

- [William Lindner](https://github.com/wlindner)
- [All Contributors][link-contributors]

## License

The MIT License (MIT). Please see [License File](LICENSE) for more information.

[link-author]: https://github.com/wlindner
[link-contributors]: ../../contributors
[livereload-client]: https://www.npmjs.com/package/livereload-client
[@rollup/plugin-html]: https://www.npmjs.com/package/@rollup/plugin-html
