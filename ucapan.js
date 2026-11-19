import {
    database,
    ref,
    push,
    set,
    onValue
} from "./firebase.js";

// Ambil elemen formulir
const form = document.getElementById("formUcapan");
const namaInput = document.getElementById("namaUcapan");
const kehadiranInput = document.getElementById("kehadiranUcapan");
const pesanInput = document.getElementById("pesanUcapan");
const tombolKirim = document.getElementById("tombolKirimUcapan");
const statusUcapan = document.getElementById("statusUcapan");
const daftarUcapan = document.getElementById("daftarUcapan");

// Isi nama otomatis dari alamat undangan jika tersedia
const parameterURL = new URLSearchParams(window.location.search);
const namaTamu = parameterURL.get("to");

if (namaTamu && namaTamu.trim()) {
    namaInput.value = namaTamu.trim();
}

// Simpan ucapan ke Firebase
form.addEventListener("submit", async function (event) {

    event.preventDefault();

    const nama = namaInput.value.trim();
    const kehadiran = kehadiranInput.value;
    const pesan = pesanInput.value.trim();

    if (!nama || !kehadiran || !pesan) {
        statusUcapan.textContent = "Mohon lengkapi semua kolom.";
        return;
    }

    tombolKirim.disabled = true;
    tombolKirim.textContent = "Mengirim...";
    statusUcapan.textContent = "";

    try {

        const lokasiUcapan = push(ref(database, "ucapan"));

        await set(lokasiUcapan, {
            nama: nama,
            kehadiran: kehadiran,
            pesan: pesan,
            waktu: Date.now()
        });

        statusUcapan.textContent = "Terima kasih! Ucapan berhasil dikirim.";

        form.reset();

    } catch (error) {

        console.error("Gagal mengirim ucapan:", error);

        statusUcapan.textContent =
            "Ucapan gagal dikirim. Silakan coba kembali.";

    } finally {

        tombolKirim.disabled = false;
        tombolKirim.textContent = "Kirim Ucapan";

    }

});


// Menampilkan ucapan dari Firebase secara otomatis
const lokasiDaftarUcapan = ref(database, "ucapan");

onValue(lokasiDaftarUcapan, function (snapshot) {

    daftarUcapan.replaceChildren();

    if (!snapshot.exists()) {

        const kosong = document.createElement("p");
        kosong.textContent = "Belum ada ucapan. Jadilah yang pertama!";
        daftarUcapan.appendChild(kosong);

        return;
    }

    const semuaUcapan = [];

    snapshot.forEach(function (item) {
        semuaUcapan.push(item.val());
    });

    // Ucapan terbaru ditampilkan paling atas
    semuaUcapan.reverse();

    // Tampilkan maksimal 50 ucapan terbaru
    semuaUcapan.slice(0, 50).forEach(function (data) {

        const kartu = document.createElement("div");
        kartu.className = "item-ucapan";

        const nama = document.createElement("strong");
        nama.textContent = data.nama || "Tamu Undangan";

        const kehadiran = document.createElement("small");
        kehadiran.textContent = " • " + (data.kehadiran || "");

        const pesan = document.createElement("p");
        pesan.textContent = data.pesan || "";

        const waktu = document.createElement("small");

        if (data.waktu) {
            waktu.textContent = new Date(data.waktu).toLocaleString("id-ID");
        }

        kartu.appendChild(nama);
        kartu.appendChild(kehadiran);
        kartu.appendChild(pesan);
        kartu.appendChild(waktu);

        daftarUcapan.appendChild(kartu);

    });

});
