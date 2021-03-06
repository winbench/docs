var os = require('os');
var gulp = require('gulp');
var concat = require('gulp-concat');
var less = require('gulp-less');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var mdquery = require('mdquery').transform;
var textTransformation = require('gulp-text-simple');

var highlightTheme = 'github';

var rootHeadlineText = "TMPROOT";

var insertRootHeadline = textTransformation(function (txt) {
    var headline = os.EOL + os.EOL + '# ' + rootHeadlineText;
    var frontMatterBegin = txt.indexOf('+++');
    var frontMatterEnd = frontMatterBegin >= 0 ? txt.indexOf('+++', frontMatterBegin + 3) + 3 : -1;
    var insertionPoint = Math.max(frontMatterEnd, 0);
    return txt.substring(0, insertionPoint) + headline + txt.substring(insertionPoint);
});

var removeRootHeadline = textTransformation(function (txt) {
    var pattern = new RegExp(os.EOL + '#\\s+' + rootHeadlineText + os.EOL);
    return txt.replace(pattern, '');
});

gulp.task('preprocess-markdown', function () {
    return gulp.src('src/content/**/*.md')
        .pipe(insertRootHeadline())
        .pipe(mdquery())
        .pipe(removeRootHeadline())
        .pipe(gulp.dest('rig/content'));
});

gulp.task('build-less', function () {
    return gulp.src('src/static/css/*.less')
        .pipe(less())
        .pipe(concat('custom.css'))
        .pipe(gulp.dest('src/static/css/'));
});

gulp.task('build-css', function () {
    return gulp.src(['node_modules/purecss/build/base.css',
                     'node_modules/purecss/build/buttons.css',
                     'node_modules/purecss/build/grids-responsive.css',
                     'node_modules/purecss/build/menus-core.css',
                     'node_modules/highlight.js/styles/' + highlightTheme + '.css',
                     'rig/themes/blackburn/static/css/side-menu.css',
                     'rig/themes/blackburn/static/css/blackburn.css',
                     'src/static/css/*.css'])
        .pipe(concat('style.min.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('rig/static/css/'));
});

gulp.task('build-js', function () {
    return gulp.src(['src/static/js/*.js'])
        .pipe(uglify())
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest('rig/static/js/'));
});

gulp.task('copy-images', function () {
    return gulp.src('src/static/img/**/*')
        .pipe(gulp.dest('rig/static/img'));
});

gulp.task('prepare', gulp.parallel(gulp.series('build-less', 'build-css'), 'build-js', 'copy-images'));

gulp.task('default', gulp.parallel('prepare', 'preprocess-markdown'));

gulp.task('watch', gulp.series('default', function () {
    gulp.watch('src/content/**/*.md', gulp.task('preprocess-markdown'));
    gulp.watch('src/static/css/*.less', gulp.series('build-less', 'build-css'));
    gulp.watch('src/static/img/*.*', gulp.task('copy-images'));
    gulp.watch('src/static/js/*.js', gulp.task('build-js'));
}));
