import fs from "fs";
import fonter from "gulp-fonter";
import ttf2woff2 from "gulp-ttf2woff2";

export const otfToTtf = () => {
  // Ищем файлы шрифтов .otf
  return (
    app.gulp
      .src(`${app.path.srcFolder}/assets/fonts/*.otf`, {})
      .pipe(
        app.plugins.plumber(
          app.plugins.notify.onError({
            title: "FONTS",
            message: "Error: <%= error.message %>",
          })
        )
      )
      // Конвертируем в .ttf
      .pipe(fonter({ formats: ["ttf"] }))
      // Выгружаем в исходную папку
      .pipe(app.gulp.dest(`${app.path.srcFolder}/assets/fonts/`))
  );
};

export const ttfToWoff = () => {
  // Ищем файлы шрифтов .ttf
  return (
    app.gulp
      .src(`${app.path.srcFolder}/assets/fonts/*.ttf`, {})
      .pipe(
        app.plugins.plumber(
          app.plugins.notify.onError({
            title: "FONTS",
            message: "Error: <%= error.message %>",
          })
        )
      )
      // Выгружаем *.ttf
      // .pipe(app.gulp.dest(`${app.path.srcFolder}/assets/fonts/`))
      // Конвертируем в .woff
      .pipe(fonter({ formats: ["woff"] }))
      // Выгружаем в папку с результатом
      .pipe(app.gulp.dest(`${app.path.srcFolder}/assets/fonts/`))
      // Ищем файлы шрифтов .ttf
      .pipe(app.gulp.src(`${app.path.srcFolder}/assets/fonts/*.ttf`))
      // Конвертируем в .woff2
      .pipe(ttf2woff2())
      // Выгружаем в папку с результатом
      .pipe(app.gulp.dest(`${app.path.srcFolder}/assets/fonts/`))
  );
};

export const fontStyle = () => {
  let fontsFile = `${app.path.srcFolder}/sass/_fonts.scss`;
  // Проверяем существуют ли файлы шрифтов
  fs.readdir(`${app.path.srcFolder}/assets/fonts/`, function (err, fontsFiles) {
    if (fontsFiles) {
      // Проверяем существует ли файл стилей для подключения шрифтов
      // Если есть - удаляем
      if (fs.existsSync(fontsFile)) {
        fs.unlink(fontsFile, cb);
      }
      // Создаем новый файл стилей для подключения шрифтов
      fs.writeFile(fontsFile, "", cb);
      let newFileOnly;
      for (var i = 0; i < fontsFiles.length; i++) {
        // Записываем подключения шрифтов в файл стилей
        let fontFileName = fontsFiles[i].split(".")[0];
        if (newFileOnly !== fontFileName) {
          let fontName = fontFileName.split("-")[0]
            ? fontFileName.split("-")[0]
            : fontFileName;
          let fontWeight = fontFileName.split("-")[1]
            ? fontFileName.split("-")[1]
            : fontFileName;
          if (fontWeight.toLowerCase() === "thin") {
            fontWeight = 100;
          } else if (fontWeight.toLowerCase() === "extralight") {
            fontWeight = 200;
          } else if (fontWeight.toLowerCase() === "light") {
            fontWeight = 300;
          } else if (fontWeight.toLowerCase() === "medium") {
            fontWeight = 500;
          } else if (fontWeight.toLowerCase() === "semibold") {
            fontWeight = 600;
          } else if (fontWeight.toLowerCase() === "bold") {
            fontWeight = 700;
          } else if (
            fontWeight.toLowerCase() === "extrabold" ||
            fontWeight.toLowerCase() === "heavy"
          ) {
            fontWeight = 800;
          } else if (fontWeight.toLowerCase() === "black") {
            fontWeight = 900;
          } else {
            fontWeight = 400;
          }
          fs.appendFile(
            fontsFile,
            `@font-face {\n\tfont-family: "${fontName}";\n\tsrc: url("../assets/fonts/${fontFileName}.woff2") format("woff2"),\n\turl("../assets/fonts/${fontFileName}.woff") format("woff"),\n\turl("../assets/fonts/${fontFileName}.ttf") format("ttf");\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;\n\tfont-display: swap;\n}\r\n`,
            cb
          );
          newFileOnly = fontFileName;
        }
      }
    } else {
      // Если шрифтов нет
      fs.unlink(fontsFile, cb);
    }
  });
  return app.gulp.src(`${app.path.srcFolder}/assets/fonts/`);

  function cb() {}
};
