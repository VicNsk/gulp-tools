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
  },
  dest: {
    sprite: `${srcFolder}/assets/img/`,
    images: `${buildFolder}/assets/img/`,
    files: `${buildFolder}/`,
    html: `${buildFolder}/`,
  },
  watch: {
    sprite: `${srcFolder}/assets/img/svg/*.svg`,
    images: [
      `${srcFolder}/img/**/*.{jpg,jpeg,png,svg}`,
      `!${srcFolder}/img/svg/**/*.*`,
    ],
    files: [`${srcFolder}/assets/**/*.*`, `!${srcFolder}/assets/img/**/*.*`],
    html: [`${srcFolder}/**/*.html`, `${srcFolder}/components/**/*.html`],
  },
};
