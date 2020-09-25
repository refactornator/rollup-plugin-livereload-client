const { join } = require("path");

const test = require("ava");
const { rollup } = require("rollup");

const html = require("@rollup/plugin-html");

const livereloadClient = require("../");

process.chdir(join(__dirname, "fixtures"));

test("injects livereload.js into index.html", async (t) => {
  const bundle = await rollup({
    input: "batman.js",
    plugins: [html(), livereloadClient()],
  });
  const { output } = await bundle.generate({});

  t.snapshot(output);
});

test("the port is customizable", async (t) => {
  const bundle = await rollup({
    input: "batman.js",
    plugins: [html(), livereloadClient({ port: 1337 })],
  });
  const { output } = await bundle.generate({});

  t.snapshot(output);
});
