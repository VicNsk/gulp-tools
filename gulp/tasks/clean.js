import { deleteAsync } from "del";

export const clean = () => {
  console.log(app.path.buildFolder);
  console.log(
    console.log(app.isDev ? "-- development --" : "-- production --")
  );
  return deleteAsync(app.path.clean);
};
