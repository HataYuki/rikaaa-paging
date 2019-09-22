const gulp = require("gulp");
const rollup = require("gulp-rollup");
const ts = require("rollup-plugin-typescript2");
const rename = require("gulp-rename");
const bs = require("browser-sync");

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

gulp.task(
  "develop",
  gulp.series(gulp.task("tsToJs"), gulp.task("initBs"), gulp.task("watch"))
);
