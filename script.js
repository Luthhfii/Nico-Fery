
function openInvitation() {
    const music = document.getElementById("weddingMusic");

    if (!music) {
        window.location.href = "halaman-kedua.html";
        return;
    }

    // Mulai lagu dari detik ke-22
    music.currentTime = 22;

    music.play()
        .then(function () {
            sessionStorage.setItem("musicStarted", "true");
            sessionStorage.setItem("musicTime", music.currentTime);

            // Pindah ke halaman kedua
            window.location.href = "halaman-kedua.html";
        })
        .catch(function (error) {
            console.log("Musik gagal diputar:", error);
            alert("Musik gagal diputar. Periksa file lagu.mp3.");
        });
}


function continueWeddingMusic() {
    const music = document.getElementById("weddingMusic");

    if (!music) return;

    // Lanjutkan musik jika sebelumnya sudah dimulai
    if (sessionStorage.getItem("musicStarted") === "true") {
        const savedTime = sessionStorage.getItem("musicTime");

        if (savedTime !== null) {
            music.currentTime = Number(savedTime);
        }

        music.play().catch(function (error) {
            console.log("Musik perlu diputar kembali:", error);
        });
    }

    // Simpan posisi lagu saat berpindah halaman
    window.addEventListener("beforeunload", function () {
        if (!music.paused) {
            sessionStorage.setItem("musicTime", music.currentTime);
        }
    });
}

/* PENGULANGAN MUSIK */

const music = document.getElementById("weddingMusic");

if (music) {
    music.addEventListener("timeupdate", function () {
        if (music.currentTime >= 309) {
            music.currentTime = 22;
            music.play();
        }
    });
}
