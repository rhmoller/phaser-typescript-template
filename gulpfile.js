var gulp = require("gulp");
var connect = require("gulp-connect");
var watch = require("gulp-watch");
var tsc = require("gulp-tsc");

gulp.task("webserver", function () {
    connect.server({
        livereload: true,
        root: ["build"]
    });
});

gulp.task("livereload", function () {
    gulp.src(["build/*.js", "root/**/*.*"])
        .pipe(watch())
        .pipe(connect.reload());
});

gulp.task("root", function () {
    gulp.src(["root/**/*"], { base: 'root'}).pipe(gulp.dest("build"));
    gulp.src(["lib/**/*"], { base: 'lib'}).pipe(gulp.dest("build"));
});

gulp.task("compile", function () {
    return gulp.src("src/**/*.ts")
        .pipe(tsc({
            out: "game.js"
        }))
        .pipe(gulp.dest("build"));
});

gulp.task("watch", function () {
    gulp.watch("src/**/*.ts", ["compile"]);
    gulp.watch("root/**/*.*", ["root"]);
});

gulp.task("default", ["root", "compile", "webserver", "livereload", "watch"]);
