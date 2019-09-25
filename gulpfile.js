const gulp = require("gulp");
const rollup = require("gulp-rollup");
const ts = require("rollup-plugin-typescript2");
const rename = require("gulp-rename");
const bs = require("browser-sync");

const webpack = require("webpack");
const webpackConf = require("./webpack.config");

const karma = require("karma").Server;
const karmaConf = require("./karma.config");

gulp.task("tsToJs", () => {
  return gulp
    .src("src/**/*.ts")
    .pipe(
      rollup({
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
