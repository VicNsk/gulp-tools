import svgSprite from "gulp-svg-sprite";
import svgmin from "gulp-svgmin";
import cheerio from "gulp-cheerio";

export const sprite = () => {
  return (
    app.gulp
      .src(app.path.src.sprite)
      .pipe(
        app.plugins.plumber(
          app.plugins.notify.onError({
            title: "SPRITE",
            message: "Error: <%= error.message %>",
          })
        )
      )
      //
      .pipe(svgmin({ js2svg: { pretty: true } }))
      .pipe(
        cheerio({
          run: function ($) {
            $("[fill]").removeAttr("fill");
            $("[stroke]").removeAttr("stroke");
            $("[style]").removeAttr("style");
          },
          parserOptions: { xmlMode: true },
        })
      )
      .pipe(app.plugins.replace("&gt;", ">"))
      //
      .pipe(
        svgSprite({
          mode: {
            stack: {
              sprite: "../sprite.svg",
            },
          },
        })
      )
      //
      .pipe(app.gulp.dest(app.path.dest.sprite))
  );
};
