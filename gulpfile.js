/* connecting npm-modules */
import gulp from "gulp";
import { plugins } from "./gulp/plugins.js";

/* import configuration file */
import { path } from "./gulp/path.js";

/* global variable values */
global.app = {
  isDev: !process.argv.includes("--prod"),
  isProd: process.argv.includes("--prod"),
  gulp: gulp,
  path: path,
  plugins: plugins,
};

/* import tasks */
import { clean } from "./gulp/tasks/clean.js";
import { server } from "./gulp/tasks/server.js";
import { otfToTtf, ttfToWoff, fontStyle } from "./gulp/tasks/fonts.js";
import { img, webpImg, avifImg } from "./gulp/tasks/images.js";
import { resources } from "./gulp/tasks/resources.js";
import { sprite } from "./gulp/tasks/sprite.js";
import { pages } from "./gulp/tasks/pages.js";
import { styles } from "./gulp/tasks/styles.js";
import { scripts } from "./gulp/tasks/scripts.js";

/*  tracking changes in files */
const watcher = () => {
  gulp.watch(path.watch.files, resources);
  gulp.watch(path.watch.images, img);
  gulp.watch(path.watch.html, pages);
  gulp.watch(path.watch.styles, styles);
  gulp.watch(path.watch.scripts, scripts);
};

/* task execution scripts */
const fonts = gulp.series(otfToTtf, ttfToWoff, fontStyle);
const imgWebp = gulp.parallel(webpImg, avifImg);
const mainTasks = gulp.series(
  clean,
  gulp.parallel(fonts, sprite),
  gulp.series(img, app.plugins.if(app.isProd, imgWebp)),
  gulp.parallel(resources, pages, styles, scripts)
);

// developer/building tasks
const dev = gulp.series(mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(mainTasks);

/* export of tasks and scripts */
export { dev };
export { build };

export { fonts };
export { sprite };

/* default task */
export default app.isDev ? dev : build;
