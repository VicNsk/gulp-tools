import webpack from "webpack";
import webpackStream from "webpack-stream";

export const scripts = () => {
  return (
    app.gulp
      .src(app.path.src.scripts)
      .pipe(
        app.plugins.plumber(
          app.plugins.notify.onError({
            title: "JS",
            message: "Error: <%= error.message %>",
          })
        )
      )
      //
      .pipe(
        webpackStream(
          {
            mode: app.isProd ? "production" : "development",
            output: { filename: app.isProd ? "app.min.js" : "app.js" },
            module: {
              rules: [
                {
                  test: /\.js$/,
                  exclude: "/node_modules/",
                  use: {
                    loader: "babel-loader",
                    options: {
                      presets: ["@babel/preset-env"],
                    },
                  },
                },
              ],
            },
            optimization: { minimize: app.isProd },
            devtool: app.isDev ? "source-map" : false,
          },
          webpack
        )
      )
      //
      .pipe(app.gulp.dest(app.path.dest.scripts))
      .pipe(app.plugins.browserSync.stream())
  );
};
