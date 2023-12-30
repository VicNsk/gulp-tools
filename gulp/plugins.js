/* connecting npm-modules */
import gulpif from "gulp-if";
import browserSync from "browser-sync";
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import replace from "gulp-replace";
import rename from "gulp-rename";
import newer from "gulp-newer";

/* list plugins */
export const plugins = {
  newer: newer,
  plumber: plumber,
  notify: notify,
  replace: replace,
  rename: rename,
  if: gulpif,
  browserSync: browserSync,
};
