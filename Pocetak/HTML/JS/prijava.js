// Čeka da se cijela HTML stranica učita prije izvršavanja JavaScript koda
document.addEventListener("DOMContentLoaded", () => {

    // Dohvaća prvu <form> na stranici
    const loginForma = document.querySelector("form");

    // Provjerava postoji li forma i nalazi li se korisnik na stranici prijava.html
    if (loginForma && window.location.pathname.includes("prijava.html")) {

        // Dodaje događaj koji se pokreće kada korisnik pošalje formu
        loginForma.addEventListener("submit", (e) => {

            // Sprječava ponovno učitavanje stranice nakon slanja forme
            e.preventDefault();

            // Dohvaća vrijednost iz input polja s ID-om "username"
            const username = document.getElementById("username").value;

            // Dohvaća vrijednost iz input polja s ID-om "password"
            const password = document.getElementById("password").value;

            // Dohvaća sve registrirane korisnike iz localStorage-a
            // Ako nema spremljenih korisnika, stvara se prazno polje []
            const korisnici = JSON.parse(localStorage.getItem("sviKorisnici")) || [];

            // Traži korisnika čije se korisničko ime i lozinka podudaraju
            const korisnik = korisnici.find(k =>
                k.ime === username && k.lozinka === password
            );

            // Ako korisnik nije pronađen
            if (!korisnik) {

                // Prikazuje poruku o pogrešnim podacima
                alert("Krivi podaci!");

                // Prekida daljnje izvršavanje funkcije
                return;
            }

            // Sprema informaciju da je korisnik prijavljen
            localStorage.setItem("jePrijavljen", "true");

            // Sprema korisničko ime prijavljenog korisnika
            localStorage.setItem("imeKorisnika", username);

            loginForma.reset();

            // Preusmjerava korisnika na početnu stranicu
            window.location.href = "pocetna.html";
        });
    }
});