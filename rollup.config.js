const ts = require("rollup-plugin-typescript2");
const license = require("rollup-plugin-license");
const path = require("path");

const input = "src/index.ts";
const dist = "./dist";

const names = require("./config");

const plugins = [
  ts({
    tsconfig: "tsconfig.json"
  }),
  license({
    banner: {
      file: "./banner.txt",
      encoding: "utf-8"
    }
  })
];

export default [
  {
    input: input,
    plugins: plugins,
    output: [
      {
        file: path.resolve(dist, `${names.fileName}.js`),
        format: "esm"
      },
      {
        file: path.resolve(dist, `${names.fileName}.iife.js`),
        format: "iife",
        name: names.moduleName
      },
      {
        file: path.resolve(dist, `${names.fileName}.map.js`),
        format: "esm"
      }
    ]
  }
];
