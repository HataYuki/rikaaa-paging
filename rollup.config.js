const ts = require("rollup-plugin-typescript2");
const license = require("rollup-plugin-license");
module.exports = {
  inputOption: {
    input: "src/index.ts",
    plugins: [
      ts(),
      license({
        banner: {
          file: "./banner.txt",
          encoding: "utf-8"
        }
      })
    ]
  },
  outputOption: {
    format: "esm"
  }
};
