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
    images: [
      `${srcFolder}/img/**/*.{jpg,jpeg,png}`,
      `!${srcFolder}/img/svg/**/*.*`,
    ],
  },
  dest: {
    sprite: `${srcFolder}/assets/img/`,
    images: `${buildFolder}/assets/img/`,
  },
  watch: {
    sprite: `${srcFolder}/assets/img/svg/*.svg`,
  },
};
