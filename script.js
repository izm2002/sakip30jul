const apiURL = "https://script.google.com/macros/s/AKfycbwDvpAKL3WxJc1byFUevWLRnZumjf1T32bTxBNJUa-fjwuljKWRLACg7ptKANqAFsyEMA/exec";

const ikuLengkap = document.getElementById("ikuLengkap");
const totalIKU = document.getElementById("totalIKU");
const persentase = document.getElementById("persentase");
const progressBar = document.getElementById("progressBar");
const statusProgress = document.getElementById("statusProgress");
const ikuBelumLengkap = document.getElementById("ikuBelumLengkap");
const indikatorList = document.getElementById("indikatorList");
const refreshButton = document.getElementById("refreshButton");

function tampilkanData(data) {

```
const jumlahLengkap = Number(data.ikuLengkap);
const jumlahTotal = Number(data.totalIKU);
const jumlahBelumLengkap = jumlahTotal - jumlahLengkap;
const nilaiProgres = Number(data.progres);

ikuLengkap.textContent = jumlahLengkap;
totalIKU.textContent = jumlahTotal;
persentase.textContent = nilaiProgres.toFixed(2) + "%";
progressBar.style.width = nilaiProgres + "%";
ikuBelumLengkap.textContent = jumlahBelumLengkap + " IKU";

if (jumlahLengkap === jumlahTotal) {
    statusProgress.textContent = "Seluruh IKU telah lengkap.";
} else {
    statusProgress.textContent =
        jumlahBelumLengkap + " IKU masih belum lengkap.";
}

indikatorList.innerHTML = "";

data.data.forEach(function(item) {

    const kartu = document.createElement("div");

    kartu.className = "iku-card";

    let kelasStatus = "status-belum";

    if (item.status === "Lengkap") {
        kelasStatus = "status-lengkap";
    }

    kartu.innerHTML =
        "<h3>" + item.iku + "</h3>" +
        "<span class='status " + kelasStatus + "'>" +
        item.status +
        "</span>" +
        "<div class='dokumen-detail'>" +
        "Dokumen tersedia: <strong>" +
        item.jumlahDokumen +
        " / 3</strong>" +
        "</div>";

    indikatorList.appendChild(kartu);

});
```

}

function tampilkanError(error) {

```
console.error(error);

statusProgress.textContent =
    "Data gagal dimuat.";

indikatorList.innerHTML =
    "<p class='loading'>" +
    "Gagal mengambil data dari Google Apps Script." +
    "</p>";
```

}

function ambilData() {

```
statusProgress.textContent =
    "Sedang mengambil data terbaru...";

indikatorList.innerHTML =
    "<p class='loading'>" +
    "Sedang memuat data IKU..." +
    "</p>";

fetch(apiURL)
    .then(function(response) {

        if (!response.ok) {
            throw new Error(
                "Status koneksi: " +
                response.status
            );
        }

        return response.json();

    })
    .then(function(data) {

        console.log(
            "Data berhasil dimuat:",
            data
        );

        tampilkanData(data);

    })
    .catch(function(error) {

        tampilkanError(error);

    });

}

if (refreshButton) {

refreshButton.addEventListener(
    "click",
    ambilData
);

}

ambilData();
