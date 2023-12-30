import fileInclude from "gulp-file-include";
import pictureHtml from "gulp-webp-avif-html-nosvg-nogif-lazyload";
import versionNumber from "gulp-version-number";
import htmlformat from "gulp-format-html";
import htmlmin from "gulp-htmlmin";

export const pages = () => {
  return (
    app.gulp
      .src(app.path.src.html)
      .pipe(
        app.plugins.plumber(
          app.plugins.notify.onError({
            title: "HTML",
            message: "Error: <%= error.message %>",
          })
        )
      )
      //
      .pipe(fileInclude())
      .pipe(app.plugins.replace(/@img\//g, "img/"))
      .pipe(
        pictureHtml({
          primaryFormat: "avif",
          secondaryFormat: "webp",
          srcsetOutput: 0,
          youtubeCoverWebp: true,
        })
      )
      .pipe(
        versionNumber({
          value: "%DT%",
          append: {
            key: "_v",
            cover: 0,
            to: ["css", "js"],
          },
          output: {
            file: "gulp/version.json",
          },
        })
      )
      .pipe(htmlformat())
      //
      .pipe(app.plugins.if(app.isProd, app.plugins.replace(".css", ".min.css")))
      .pipe(app.plugins.if(app.isProd, app.plugins.replace(".js", ".min.js")))
      .pipe(
        app.plugins.if(
          app.isProd,
          htmlmin({
            collapseWhitespace: true,
            removeComments: true,
          })
        )
      )
      //
      .pipe(app.gulp.dest(app.path.dest.html))
      .pipe(app.plugins.browserSync.stream())
  );
};
