import * as dartSass from "sass";
import gulpSass from "gulp-sass";
import avifWebpCss from "gulp-avif-css-fix";
import cleanCss from "gulp-clean-css";
import autoprefixer from "gulp-autoprefixer";
import groupMedia from "gulp-group-css-media-queries";

const sass = gulpSass(dartSass);

export const styles = () => {
  return (
    app.gulp
      .src(app.path.src.styles, { sourcemaps: true })
      .pipe(
        app.plugins.plumber(
          app.plugins.notify.onError({
            title: "SCSS",
            message: "Error: <%= error.message %>",
          })
        )
      )
      //
      .pipe(sass({ outputStyle: "expanded" }))
      .pipe(app.plugins.replace(/@img\//g, "../img/"))
      .pipe(avifWebpCss())
      .pipe(groupMedia())
      .pipe(
        autoprefixer({
          grid: true,
          overrideBrowserslist: ["last 3 versions"],
          cascade: true,
        })
      )
      //
      .pipe(app.plugins.if(app.isProd, app.gulp.dest(app.path.dest.styles)))
      .pipe(app.plugins.if(app.isProd, cleanCss({ level: 2 })))
      .pipe(app.plugins.if(app.isProd, app.plugins.rename({ suffix: ".min" })))
      //
      .pipe(app.gulp.dest(app.path.dest.styles))
      .pipe(app.plugins.browserSync.stream())
  );
};
