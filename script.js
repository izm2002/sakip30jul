/* =====================================
URL GOOGLE APPS SCRIPT
===================================== */

const apiURL =
"https://script.google.com/macros/s/AKfycbwDvpAKL3WxJc1byFUevWLRnZumjf1T32bTxBNJUa-fjwuljKWRLACg7ptKANqAFsyEMA/exec";

/* =====================================
MENGAMBIL ELEMEN HTML
===================================== */

const ikuLengkap =
document.getElementById("ikuLengkap");

const totalIKU =
document.getElementById("totalIKU");

const persentase =
document.getElementById("persentase");

const progressBar =
document.getElementById("progressBar");

const statusProgress =
document.getElementById("statusProgress");

const ikuBelumLengkap =
document.getElementById(
"ikuBelumLengkap"
);

const indikatorList =
document.getElementById(
"indikatorList"
);

const refreshButton =
document.getElementById(
"refreshButton"
);

/* =====================================
MENGAMBIL DATA DARI APPS SCRIPT
===================================== */

async function ambilData() {

```
indikatorList.innerHTML = `
    <p class="loading">
        Sedang memperbarui data...
    </p>
`;

statusProgress.textContent =
"Sedang mengambil data terbaru...";


try {

    const response =
    await fetch(apiURL);


    if (!response.ok) {

        throw new Error(
            "Data tidak dapat diambil"
        );

    }


    const hasil =
    await response.json();


    tampilkanProgress(hasil);


    tampilkanIKU(
        hasil.data
    );


}

catch (error) {

    console.error(error);


    statusProgress.textContent =
    "Data gagal dimuat.";


    indikatorList.innerHTML = `

        <p class="loading">

            Gagal mengambil data dari
            Google Apps Script.

        </p>

    `;

}
```

}

/* =====================================
MENAMPILKAN PROGRESS
===================================== */

function tampilkanProgress(data) {

```
const jumlahLengkap =
data.ikuLengkap;


const jumlahTotal =
data.totalIKU;


const jumlahBelumLengkap =
jumlahTotal -
jumlahLengkap;


const nilaiProgress =
Number(
    data.progres
);


ikuLengkap.textContent =
jumlahLengkap;


totalIKU.textContent =
jumlahTotal;


persentase.textContent =
nilaiProgress.toFixed(2)
+ "%";


progressBar.style.width =
nilaiProgress + "%";


ikuBelumLengkap.textContent =

jumlahBelumLengkap
+ " IKU";


if (
    jumlahLengkap
    === jumlahTotal
) {

    statusProgress.textContent =

    "Seluruh IKU telah memiliki "
    + "dokumen lengkap.";

}

else {

    statusProgress.textContent =

    jumlahBelumLengkap
    + " IKU masih belum lengkap.";

}
```

}

/* =====================================
MENAMPILKAN KARTU IKU
===================================== */

function tampilkanIKU(dataIKU) {

```
indikatorList.innerHTML = "";


dataIKU.forEach(
function(item) {


    const lengkap =

    item.status
    === "Lengkap";


    const kartu =

    document.createElement(
        "div"
    );


    kartu.classList.add(
        "iku-card"
    );


    const kelasStatus =

    lengkap

    ? "status-lengkap"

    : "status-belum";


    kartu.innerHTML = `

        <h3>
            ${item.iku}
        </h3>


        <span
        class="status ${kelasStatus}"
        >

            ${item.status}

        </span>


        <div
        class="dokumen-detail"
        >

            Dokumen tersedia:

            <strong>

                ${item.jumlahDokumen}

                / 3

            </strong>

        </div>

    `;


    indikatorList.appendChild(
        kartu
    );


});
```

}

/* =====================================
TOMBOL PERBARUI
===================================== */

refreshButton.addEventListener(

```
"click",

ambilData
```

);

/* =====================================
MEMUAT DATA SAAT WEBSITE DIBUKA
===================================== */

ambilData();
