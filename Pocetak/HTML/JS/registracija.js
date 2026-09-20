// Dohvaća registracijsku formu pomoću ID-a
const regForma = document.getElementById("forma-registracija");

// Ispisuje u konzolu je li forma uspješno pronađena
console.log("Forma:", regForma);

// Provjerava postoji li forma na stranici
if (regForma) {

    // Dodaje događaj koji se pokreće kada korisnik pošalje formu
    regForma.addEventListener("submit", (e) => {

        // Sprječava ponovno učitavanje stranice
        e.preventDefault();

        // Dohvaća sve registrirane korisnike iz localStorage-a
        let korisnici = JSON.parse(localStorage.getItem("sviKorisnici"));

        // Ako nema spremljenih korisnika, stvara prazno polje
        if (!korisnici)
            korisnici = [];

        // Ispisuje trenutno stanje polja korisnika
        console.log("PRIJE:", korisnici);

        // Dohvaća korisničko ime iz input polja
        const username = document.getElementById("username").value;

        // Dohvaća lozinku iz input polja
        const password = document.getElementById("password").value;

        // Dodaje novog korisnika u polje
        korisnici.push({
            ime: username,
            lozinka: password
        });

        // Sprema ažurirano polje u localStorage
        localStorage.setItem(
            "sviKorisnici",
            JSON.stringify(korisnici)
        );

        // Ispisuje sadržaj localStorage-a nakon spremanja
        console.log(
            "POSLIJE:",
            localStorage.getItem("sviKorisnici")
        );
    });
}