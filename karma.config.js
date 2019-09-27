module.exports = {
  frameworks: ["mocha"],
  port: 9876,
  browsers: ["Chrome"],
  files: [
    "./spec/index.bundle.spec.js",
    "./spec/karma-debughtml-refresh.js",
    "./spec/index.spec.html"
  ],
  preprocessors: {
    "./spec/index.spec.html": ["html2js"]
  },
  autoWatch: true,
  concurrency: Infinity,
  reporters: ["mocha"],
  colors: true
};
