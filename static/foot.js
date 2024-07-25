!function() { // register funmode
    var funMode = localStorage.getItem('funMode') == "true" || false;
    var darkMode = localStorage.getItem('darkMode') == "true" || false;

    var $els = document.getElementsByClassName("funmode");
    for (var i = 0; i < $els.length; i++){
        var localEl = $els[i];
        localEl.addEventListener("click", function(e) {
            funMode = !funMode;
            if (funMode) {
                timer = fun_mode();
                localEl.text="✨ fun mode!";
            }
            if (!funMode) {
                window.clearInterval(timer);
                localEl.text="✨ fun mode?";
            }
            localStorage.setItem('funMode', funMode);
            e.preventDefault();
            return false;
        });

        // init 
        if (funMode) {
            localEl.text = "✨ fun mode!";
            timer = fun_mode();
        } else {
            localEl.text = "✨ fun mode?";
        }
    }

    var $darkels = document.getElementsByClassName("darkmode");
    for (var i = 0; i < $darkels.length; i++) {
        var de = $darkels[i];
        de.addEventListener("click", function(e) {
            darkMode = !darkMode;
            if (darkMode) {
                document.getElementsByTagName("body")[0].classList.add("dark");
                de.text="🌠 dark mode!";
            }
            if (!darkMode) {
                document.getElementsByTagName("body")[0].classList.remove("dark");
                de.text="🌠 dark mode?";
            }
            localStorage.setItem('darkMode', darkMode);
            e.preventDefault();
            return false;
        });

        // init
        console.log("🌠 dark mode", darkMode);
        if (darkMode) {
            de.text = "🌠 dark mode!";
            document.getElementsByTagName("body")[0].classList.add("dark");
        } else {
            de.text = "🌠 dark mode?";
        }
    }
}();