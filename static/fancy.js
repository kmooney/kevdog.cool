!function () {
    random_theme();
}();

function random_theme() {
    document.querySelector(":root").style.setProperty("--texthue", Math.random()*360);
}

function fun_mode() {
    var hue = 0;
    return window.setInterval(function() {
        document.querySelector(":root").style.setProperty("--texthue", hue);
        hue += 1;
        hue = hue % 360;
    }, 5);
}
