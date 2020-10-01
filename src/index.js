import fs from "fs";
import path from "path";

export default function livereloadClient(pluginOptions) {
  const { include = true, port = 35729 } = pluginOptions;

  return {
    name: "livereload-client",
    generateBundle(_options, bundle) {
      if (!include) {
        return;
      }

      const index = bundle["index.html"];
      if (index) {
        index.source = index.source.replace(
          "  </body>\n",
          `    <script src="livereload.js?port=${port}"></script>\n  </body>\n`
        );
      }
    },
    writeBundle(options, bundle) {
      const clientPath = path.resolve(`${options.dir}/livereload.js`);
      if (!include) {
        if (fs.existsSync(clientPath)) fs.unlinkSync(clientPath);
      } else {
        const index = bundle["index.html"];
        if (index) {
          fs.copyFileSync(
            path.resolve("node_modules/livereload-js/dist/livereload.js"),
            clientPath
          );
        }
      }
    },
  };
}
