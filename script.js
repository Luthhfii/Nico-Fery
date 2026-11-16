
/* =====================================
   MUSIK DAN TOMBOL BUKA UNDANGAN
===================================== */

function openInvitation() {
    const music = document.getElementById("weddingMusic");

    // Membawa nama tamu ke halaman kedua
    const halamanKedua =
        "halaman-kedua.html" + window.location.search;

    if (!music) {
        window.location.href = halamanKedua;
        return;
    }

    // Mulai lagu dari detik ke-22
    music.currentTime = 22;

    music.play()
        .then(function () {

            sessionStorage.setItem("musicStarted", "true");
            sessionStorage.setItem("musicTime", music.currentTime);

            // Pindah ke halaman kedua
            window.location.href = halamanKedua;

        })
        .catch(function (error) {

            console.log("Musik gagal diputar:", error);

            alert("Musik gagal diputar. Periksa file lagu.mp3.");

        });
}


/* =====================================
   MELANJUTKAN MUSIK DI HALAMAN KEDUA
===================================== */

function continueWeddingMusic() {

    const music = document.getElementById("weddingMusic");

    if (!music) return;

    // Periksa apakah musik sudah dimulai
    if (sessionStorage.getItem("musicStarted") === "true") {

        const savedTime = sessionStorage.getItem("musicTime");

        // Lanjutkan dari posisi terakhir
        if (savedTime !== null) {
            music.currentTime = Number(savedTime);
        }

        music.play().catch(function (error) {
            console.log("Musik perlu diputar kembali:", error);
        });

    }

    // Simpan posisi musik ketika halaman berpindah
    window.addEventListener("beforeunload", function () {

        if (!music.paused) {
            sessionStorage.setItem(
                "musicTime",
                music.currentTime
            );
        }

    });

}


/* =====================================
   PENGULANGAN MUSIK
   DETIK 22 SAMPAI DETIK 309
===================================== */

const music = document.getElementById("weddingMusic");

if (music) {

    music.addEventListener("timeupdate", function () {

        if (music.currentTime >= 309) {

            music.currentTime = 22;

            music.play().catch(function (error) {
                console.log("Musik gagal dilanjutkan:", error);
            });

        }

    });

}


/* =====================================
   NAMA TAMU UNDANGAN
===================================== */

const urlParams = new URLSearchParams(window.location.search);

const guestName = urlParams.get("to");

const guestElement = document.getElementById("guestName");

if (guestElement && guestName && guestName.trim() !== "") {

    guestElement.textContent = guestName.trim();

}


/* =====================================
   COUNTDOWN PERNIKAHAN
===================================== */

// 4 Desember 2026, pukul 08.00 WIB
const weddingDate = new Date("2026-12-04T08:00:00+07:00").getTime();


function updateCountdown() {

    const now = new Date().getTime();

    const distance = weddingDate - now;

    const daysElement = document.getElementById("days");
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");

    // Periksa apakah elemen countdown tersedia
    if (
        !daysElement ||
        !hoursElement ||
        !minutesElement ||
        !secondsElement
    ) {
        return;
    }

    // Jika hari pernikahan sudah tiba
    if (distance <= 0) {

        daysElement.textContent = "00";
        hoursElement.textContent = "00";
        minutesElement.textContent = "00";
        secondsElement.textContent = "00";

        return;

    }

    // Hitung sisa waktu
    const days = Math.floor(
        distance / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (distance / (1000 * 60 * 60)) % 24
    );

    const minutes = Math.floor(
        (distance / (1000 * 60)) % 60
    );

    const seconds = Math.floor(
        (distance / 1000) % 60
    );

    // Tampilkan hasil countdown
    daysElement.textContent = String(days).padStart(2, "0");

    hoursElement.textContent = String(hours).padStart(2, "0");

    minutesElement.textContent = String(minutes).padStart(2, "0");

    secondsElement.textContent = String(seconds).padStart(2, "0");

}


// Jalankan countdown
updateCountdown();

// Perbarui setiap satu detik
setInterval(updateCountdown, 1000);
