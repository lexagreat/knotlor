const { src, dest } = require("gulp");
const changed = require("gulp-changed");
const imagemin = require("gulp-imagemin");
const recompress = require("imagemin-jpeg-recompress");
const pngquant = require("imagemin-pngquant");
const bs = require("browser-sync");
const plumber = require("gulp-plumber");

module.exports = function rastr() {
   return src("src/img/**/*.+(png|jpg|jpeg|gif|svg|ico)")
      .pipe(plumber())
      .pipe(changed("build/img"))
      .pipe(
         imagemin(
            {
               interlaced: true,
               progressive: true,
               optimizationLevel: 1,
            },
            [
               recompress({
                  loops: 3, // Уменьшаем количество проходов
                  min: 75, // Минимальный порог качества выше
                  max: 95, // Максимальный порог качества
                  quality: "high", // Можно попробовать 'veryhigh' или 'medium'
                  use: [
                     pngquant({
                        quality: [0.9, 1], // Повышаем качество для PNG
                        strip: true,
                        speed: 2, // Немного ускоряем
                     }),
                  ],
               }),
               imagemin.gifsicle(),
               // imagemin.optipng(),
               imagemin.svgo(),
            ]
         )
      )
      .pipe(dest("build/img"))
      .pipe(bs.stream());
};
