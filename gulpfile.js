const gulp = require("gulp");
const gulpRollup = require("gulp-rollup");
const ts = require("rollup-plugin-typescript2");
const rename = require("gulp-rename");
const bs = require("browser-sync");

const webpack = require("webpack");
const webpackConf = require("./webpack.config");

const karma = require("karma").Server;
const karmaConf = require("./karma.config");

const rollup = require("rollup");
const rollupConf = require("./rollup.config");
const uglify = require("uglify-es");
const fs = require("fs-extra");

gulp.task("tsToJs", () => {
  return gulp
    .src("src/**/*.ts")
    .pipe(
      gulpRollup({
        entry: "src/rikaaa-paging.ts",
        format: "iife",
        moduleName: "rikaaapaging",
        plugins: [
          ts({
            tsconfig: "tsconfig.json"
          })
        ]
      })
    )
    .pipe(rename("rikaaa-paging.js"))
    .pipe(gulp.dest("dist"));
});

gulp.task("production", async cb => {
  const bundle = await rollup.rollup(rollupConf.inputOption);
  const { output } = await bundle.generate(rollupConf.outputOption);
  const code = output[0].code;
  const minCode = uglify.minify(code, {
    output: {
      comments: /(@license)/
    }
  }).code;
  fs.writeFile("./index.js", minCode, () => {
    cb();
  });
});

gulp.task("initBs", cb => {
  bs.init({
    server: "dist"
  });
  cb();
});

gulp.task("watch", () => {
  return gulp.watch(
    ["dist/*.html", "src/**/*.ts", "dist/index.js"],
    gulp.series(gulp.task("tsToJs"), cb => {
      bs.reload();
      cb();
    })
  );
});

gulp.task("outputTestJs", cb => {
  const compiler = webpack(webpackConf);
  compiler.run(() => cb());
});

gulp.task("karma", cb => {
  const server = new karma(karmaConf);
  server.start();
  cb();
});

gulp.task("testWatch", cb => {
  gulp.watch(["src/**/*.ts", "spec/**/*.spec.ts"], gulp.task("outputTestJs"));
  cb();
});

gulp.task("test", gulp.series(["outputTestJs", "karma", "testWatch"]));
gulp.task("develop", gulp.series(["tsToJs", "initBs", "watch"]));
