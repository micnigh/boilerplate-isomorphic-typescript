import { GulpConfig } from "gulpfile.types.config";

let isDev = process.env.NODE_ENV === "production" ? false : true;
let distPath = isDev ? ".tmp/development" : ".tmp/production";

let config: GulpConfig = {
  distPath: distPath,
  js: [
    {
      taskName: "app",
      entries: [
        "client/src/js/*.ts{,x}",
      ],
      dest: distPath + "/js/",
    },
  ],
  css: [
    {
      taskName: "app",
      entries: [
        "client/src/css/*.scss",
      ],
      dest: distPath + "/css/",
    },
  ],
  spritesheet: [
    {
      taskName: "app",
      src: [
        "client/src/sprites/**/*.png",
      ],
      dest: distPath + "/css/",
    },
  ],
};

export default config;
