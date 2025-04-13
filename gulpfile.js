/**
 * gulpfile.js
 */

const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const sourcemaps = require("gulp-sourcemaps");

// Paths (adjust according to your folder structure)
const files = {
  scssPath: "scss/**/*.scss",
};

// Compile SCSS into CSS
function scssTask() {
  return src(files.scssPath)
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write("."))
    .pipe(dest("css"));
}

// Watch for file changes
function watchTask() {
  watch([files.scssPath], scssTask);
}

// Default Gulp task
exports.default = series(scssTask, watchTask);
