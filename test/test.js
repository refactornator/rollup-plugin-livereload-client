const { resolve } = require("path");

const test = require("ava");
const { rollup } = require("rollup");

const mockfs = require("mock-fs");
const fs = require("fs");

const html = require("@rollup/plugin-html");
const livereloadClient = require("../");

const fixtures = resolve(__dirname, "fixtures");

test.beforeEach(() => {
  mockfs({
    [`${fixtures}/batman.js`]: mockfs.load(`${fixtures}/batman.js`),
    "node_modules/livereload-js/dist/livereload.js": "",
  });
});

test.afterEach(() => {
  mockfs.restore();
});

test.serial("injects livereload.js into index.html", async (t) => {
  const bundle = await rollup({
    input: resolve(fixtures, "batman.js"),
    plugins: [html(), livereloadClient({ include: true })],
  });

  const { output } = await bundle.generate({});

  t.snapshot(output);
});

test.serial("copies livereload.js into the build output dir", async (t) => {
  const bundle = await rollup({
    input: resolve(fixtures, "batman.js"),
    plugins: [html(), livereloadClient({ include: true })],
  });

  await bundle.write({
    output: {
      dir: "build",
    },
  });

  t.true(fs.existsSync(resolve(__dirname, "../build/livereload.js")));
});

test("the port is customizable", async (t) => {
  const bundle = await rollup({
    input: resolve(fixtures, "batman.js"),
    plugins: [html(), livereloadClient({ port: 1337 })],
  });

  const { output } = await bundle.generate({});

  t.snapshot(output);
});

test.serial("disable it in production", async (t) => {
  fs.mkdir("build", (err) => {
    if (err) throw err;
  });
  fs.writeFileSync("build/livereload.js", "");

  const bundle = await rollup({
    input: resolve(fixtures, "batman.js"),
    plugins: [html(), livereloadClient({ include: false })],
  });

  const { output } = await bundle.write({
    output: {
      dir: "build",
    },
  });

  t.snapshot(output);

  t.false(fs.existsSync(resolve("../build/livereload.js")));
});
