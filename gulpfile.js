const gulp = require("gulp");
const gulpRollup = require("gulp-rollup");
const ts = require("rollup-plugin-typescript2");
const rename = require("gulp-rename");
const bs = require("browser-sync");

const webpack = require("webpack");
const webpackConf = require("./webpack.config");

const karma = require("karma").Server;
const karmaConf = require("./karma.config");

const fs = require("fs-extra");
const uglify = require("uglify-es");

const gconf = require("./config");

gulp.task("tsToJs", () => {
  return gulp
    .src("src/**/*.ts")
    .pipe(
      gulpRollup({
        entry: "src/index.ts",
        format: "iife",
        moduleName: gconf.moduleName,
        plugins: [
          ts({
            tsconfig: "tsconfig.json"
          })
        ]
      })
    )
    .pipe(rename("rikaaa-paging.dev.iife.js"))
    .pipe(gulp.dest("example"));
});

gulp.task("production", cb => {
  const mainFilePath = `dist/${gconf.fileName}.js`;
  const iifeFilePath = `dist/${gconf.fileName}.iife.js`;
  const main = fs.readFileSync(mainFilePath);
  const iife = fs.readFileSync(iifeFilePath);

  const mincodeMain = uglify.minify(main.toString(), {
    output: {
      comments: /@license/
    }
  }).code;

  const mincodeIife = uglify.minify(iife.toString(), {
    output: {
      comments: /@license/
    }
  }).code;

  fs.writeFileSync(mainFilePath, mincodeMain);
  fs.writeFileSync(iifeFilePath, mincodeIife);

  cb();
});

gulp.task("initBs", cb => {
  bs.init({
    server: "example"
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
