const apiURL =
"https://script.google.com/macros/s/AKfycbwDvpAKL3WxJc1byFUevWLRnZumjf1T32bTxBNJUa-fjwuljKWRLACg7ptKANqAFsyEMA/exec";

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
document.getElementById("ikuBelumLengkap");

const indikatorList =
document.getElementById("indikatorList");

const refreshButton =
document.getElementById("refreshButton");

async function ambilData() {

```
try {

    statusProgress.textContent =
    "Sedang mengambil data terbaru...";


    indikatorList.innerHTML = `
        <p class="loading">
            Sedang memuat data IKU...
        </p>
    `;


    const response =
    await fetch(apiURL);


    if (!response.ok) {

        throw new Error(
            "Gagal mengambil data. Status: "
            + response.status
        );

    }


    const data =
    await response.json();


    console.log(
        "Data dari Google Apps Script:",
        data
    );


    /* MENAMPILKAN PROGRES */

    const jumlahLengkap =
    Number(data.ikuLengkap);


    const jumlahTotal =
    Number(data.totalIKU);


    const jumlahBelumLengkap =
    jumlahTotal -
    jumlahLengkap;


    const nilaiProgres =
    Number(data.progres);


    ikuLengkap.textContent =
    jumlahLengkap;


    totalIKU.textContent =
    jumlahTotal;


    persentase.textContent =
    nilaiProgres.toFixed(2)
    + "%";


    progressBar.style.width =
    nilaiProgres + "%";


    ikuBelumLengkap.textContent =
    jumlahBelumLengkap
    + " IKU";


    if (
        jumlahLengkap
        === jumlahTotal
    ) {

        statusProgress.textContent =
        "Seluruh IKU telah lengkap.";

    }

    else {

        statusProgress.textContent =
        jumlahBelumLengkap
        + " IKU masih belum lengkap.";

    }


    /* MENAMPILKAN KARTU IKU */

    indikatorList.innerHTML = "";


    data.data.forEach(
    function(item) {


        const kartu =
        document.createElement("div");


        kartu.className =
        "iku-card";


        const sudahLengkap =

        item.status
        === "Lengkap";


        const kelasStatus =

        sudahLengkap

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


}

catch (error) {

    console.error(
        "ERROR:",
        error
    );


    statusProgress.textContent =
    "Data gagal dimuat.";


    indikatorList.innerHTML = `

        <p class="loading">

            Gagal mengambil data.

            <br><br>

            Periksa Console dengan
            menekan F12.

        </p>

    `;

}
```

}

/* TOMBOL PERBARUI DATA */

refreshButton.addEventListener(

```
"click",

ambilData
```

);

/* MEMUAT DATA SAAT WEBSITE DIBUKA */

ambilData();
