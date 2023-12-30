import webp from "gulp-webp";
import avif from "gulp-avif";
import imagemin from "gulp-imagemin";

export const img = () => {
  return (
    app.gulp
      .src(app.path.src.images)
      .pipe(
        app.plugins.plumber(
          app.plugins.notify.onError({
            title: "IMAGES",
            message: "Error: <%= error.message %>",
          })
        )
      )
      .pipe(app.plugins.newer(app.path.dest.images))
      //
      .pipe(
        app.plugins.if(
          app.isProd,
          imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            quality: 80,
            interlaced: true,
            optimizationLevel: 3, // 0 to 7
          })
        )
      )
      //
      .pipe(app.gulp.dest(app.path.dest.images))
  );
};

export const webpImg = () => {
  return (
    app.gulp
      .src(app.path.src.img)
      .pipe(
        app.plugins.plumber(
          app.plugins.notify.onError({
            title: "WEBP_IMAGES",
            message: "Error: <%= error.message %>",
          })
        )
      )
      .pipe(app.plugins.newer(app.path.dest.images))
      //
      .pipe(webp())
      .pipe(app.gulp.dest(app.path.dest.images))
  );
};

export const avifImg = () => {
  return (
    app.gulp
      .src(app.path.src.img)
      .pipe(
        app.plugins.plumber(
          app.plugins.notify.onError({
            title: "AVIF_IMAGES",
            message: "Error: <%= error.message %>",
          })
        )
      )
      .pipe(app.plugins.newer(app.path.dest.images))
      //
      .pipe(avif())
      .pipe(app.gulp.dest(app.path.dest.images))
  );
};
