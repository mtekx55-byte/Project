// Čeka da se cijela HTML stranica učita
document.addEventListener("DOMContentLoaded", () => {

    // Dohvaća element u koji će se ispisivati proizvodi iz košarice
    const container = document.getElementById("kosarica-container");

    // Dohvaća element u koji će se ispisati ukupna cijena
    const ukupnoContainer = document.getElementById("ukupno-container");

    // Dohvaća proizvode iz localStorage-a
    // Ako nema spremljenih proizvoda, koristi prazno polje []
    let kosarica = JSON.parse(localStorage.getItem("popisKosarica")) || [];

    // Provjerava je li košarica prazna
    if (kosarica.length === 0) {

        // Ispisuje poruku da nema proizvoda
        container.innerHTML = "<p>Vaša košarica je prazna.</p>";

        // Prekida daljnje izvršavanje funkcije
        return;
    }

    // Varijabla u koju ćemo spremati HTML proizvoda
    let htmlSadrzaj = "";

    // Varijabla za zbrajanje ukupne cijene
    let ukupnaCijena = 0;

    // Prolazi kroz svaki proizvod u košarici
    kosarica.forEach((item, index) => {

        // Uklanja znak € i pretvara tekst u decimalni broj
        let cistCijena = parseFloat(
            item.cijena.replace('€', '').replace(',', '.')
        );

        // Dodaje cijenu proizvoda ukupnoj cijeni
        ukupnaCijena += cistCijena;

        // Dodaje HTML kod za jedan proizvod
        htmlSadrzaj += `
            <div class="proizvod-u-kosarici">

                <!-- Slika proizvoda -->
                <img src="${item.slika}" style="width: 100px;">

                <!-- Naziv proizvoda -->
                <h5>${item.naziv}</h5>

                <!-- Veličina proizvoda -->
                <p>Veličina: ${item.velicina}</p>

                <!-- Cijena proizvoda -->
                <p>Cijena: ${item.cijena}</p>

                <!-- Gumb za uklanjanje proizvoda -->
                <button onclick="ukloniIzKosarice(${index})">
                    Ukloni
                </button>

            </div>
        `;
    });

    // Ispisuje sve proizvode na stranicu
    container.innerHTML = htmlSadrzaj;

    // Ispisuje ukupnu cijenu s dvije decimale
    ukupnoContainer.innerHTML =
        `<h3>Ukupno: ${ukupnaCijena.toFixed(2)} €</h3>`;

    // Dohvaća gumb "Plati"
    const btnPlati = document.getElementById("btn-plati");

    // Provjerava postoji li gumb
    if (btnPlati) {

        // Dodaje događaj na klik gumba
        btnPlati.addEventListener("click", () => {

            // Dohvaća ime kupca
            const ime = document.getElementById("ime").value;

            // Dohvaća adresu kupca
            const adresa = document.getElementById("adresa").value;

            // Provjerava jesu li sva polja ispunjena
            if (!ime || !adresa) {

                // Prikazuje upozorenje
                alert("Molimo unesite ime i adresu!");

                // Prekida izvršavanje funkcije
                return;
            }

            // Potvrda uspješne kupnje
            alert("Hvala na kupnji, " + ime + "! Vaša narudžba je zaprimljena.");

            // Briše cijelu košaricu iz localStorage-a
            localStorage.removeItem("popisKosarica");

            // Preusmjerava korisnika na početnu stranicu
            window.location.href = "/Pocetak/HTML/pocetna.html";
        });
    }
});


// Funkcija za uklanjanje proizvoda iz košarice
function ukloniIzKosarice(index) {

    // Dohvaća proizvode iz localStorage-a
    let kosarica = JSON.parse(localStorage.getItem("popisKosarica"));

    // Briše jedan element na zadanoj poziciji (index)
    kosarica.splice(index, 1);

    // Sprema ažurirano polje natrag u localStorage
    localStorage.setItem("popisKosarica", JSON.stringify(kosarica));

    // Osvježava stranicu kako bi se prikazale promjene
    location.reload();
}