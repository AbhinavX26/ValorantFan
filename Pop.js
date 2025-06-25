let destinationURL = "";

function showPopupAfterAudio(link) {
    destinationURL = link;
    document.getElementById("custom-popup").style.display = "flex";
}

function redirectAndClosePopup() {
    const audio = document.getElementById("exitAudio");
    if (audio) {
        audio.currentTime = 0;
        audio.play();

        audio.onended = () => {
            document.getElementById("custom-popup").style.display = "none";
            if (destinationURL) {
                window.location.href = destinationURL;
            }
        };
    } else {
        document.getElementById("custom-popup").style.display = "none";
        if (destinationURL) {
            window.location.href = destinationURL;
        }
    }
}

function closePopupOnly() {
    document.getElementById("custom-popup").style.display = "none";
    destinationURL = "";
}

function delayedRedirect(url) {
    const audio = document.getElementById("exitAudio");
    if (!audio) {
        window.location.href = url;
        return;
    }

    audio.currentTime = 0;
    audio.play();
    audio.onended = () => {
        window.location.href = url;
    };
}

document.addEventListener('DOMContentLoaded', () => {
    const alertLinks = document.querySelectorAll('.alert-link');

    alertLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            showPopupAfterAudio(this.href);
        });
    });

    document.getElementById('custom-popup').addEventListener('click', function (e) {
        if (e.target === this) {
            closePopupOnly();
        }
    });

    const gotItBtn = document.querySelector('#custom-popup .got-it-button') || document.querySelector('#custom-popup button');
    if (gotItBtn) {
        gotItBtn.addEventListener('click', redirectAndClosePopup);
    }

    const navLinks = document.querySelectorAll('a[href*="html"]');
    navLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            delayedRedirect(this.getAttribute("href"));
        });
    });

    const homeBtn = document.querySelector('button.Home');
    const aboutBtn = document.querySelector('button.US');

    if (homeBtn) {
        homeBtn.onclick = function (e) {
            e.preventDefault();
            delayedRedirect("Home Page.html");
        };
    }

    if (aboutBtn) {
        aboutBtn.onclick = function (e) {
            e.preventDefault();
            delayedRedirect("About Us.html");
        };
    }
});