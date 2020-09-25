import fs from "fs";
import path from "path";

export default function livereloadClient(pluginOptions = { port: 35729 }) {
  return {
    name: "livereload-client",
    generateBundle(_options, bundle) {
      const index = bundle["index.html"];
      if (index) {
        index.source = index.source.replace(
          "  </body>\n",
          `    <script src="livereload.js?port=${pluginOptions.port}"></script>\n  </body>\n`
        );
      }
    },
    writeBundle(options, bundle) {
      const index = bundle["index.html"];
      if (index) {
        fs.copyFileSync(
          path.resolve("node_modules/livereload-js/dist/livereload.js"),
          path.resolve(`${options.dir}/livereload.js`)
        );
      }
    },
  };
}
