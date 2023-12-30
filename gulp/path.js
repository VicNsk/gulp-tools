/* paths to project folders */
const srcFolder = "./src";
const buildFolder = "./build";
//
export const path = {
  srcFolder: srcFolder,
  buildFolder: buildFolder,
  clean: buildFolder,
  //
  src: {
    sprite: `${srcFolder}/assets/img/svg/*.svg`,
    img: [
      `${srcFolder}/img/**/*.{jpg,jpeg,png}`,
      `!${srcFolder}/img/svg/**/*.*`,
    ],
    images: [
      `${srcFolder}/img/**/*.{jpg,jpeg,png,svg,webp,avif,gif,ico}`,
      `!${srcFolder}/img/svg/**/*.*`,
    ],
    files: [`${srcFolder}/assets/**/*.*`, `!${srcFolder}/assets/img/**/*.*`],
    html: `${srcFolder}/pages/*.html`,
    styles: `${srcFolder}/sass/style.scss`,
    scripts: `${srcFolder}/scripts/app.js`,
  },
  dest: {
    sprite: `${srcFolder}/assets/img/`,
    images: `${buildFolder}/assets/img/`,
    files: `${buildFolder}/`,
    html: `${buildFolder}/`,
    styles: `${buildFolder}/css/`,
    scripts: `${buildFolder}/js/`,
  },
  watch: {
    sprite: `${srcFolder}/assets/img/svg/*.svg`,
    images: [
      `${srcFolder}/img/**/*.{jpg,jpeg,png,svg}`,
      `!${srcFolder}/img/svg/**/*.*`,
    ],
    files: [`${srcFolder}/assets/**/*.*`, `!${srcFolder}/assets/img/**/*.*`],
    html: `${srcFolder}/**/*.html`,
    styles: `${srcFolder}/**/*.scss`,
    scripts: `${srcFolder}/**/*.js`,
  },
};
