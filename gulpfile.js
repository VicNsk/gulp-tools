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
import { server } from "./gulp/tasks/server.js";

/*  tracking changes in files */
const watcher = () => {};

/* task execution scripts */
const mainTasks = gulp.series();

// developer/building tasks
const dev = gulp.series(mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(mainTasks);

/* export of tasks and scripts */
export { dev };
export { build };

/* default task */
export default app.isDev ? dev : build;
