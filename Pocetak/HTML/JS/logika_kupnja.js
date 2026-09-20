// Čeka da se cijela HTML stranica učita prije pokretanja JavaScript koda
document.addEventListener("DOMContentLoaded", () => {
    const gumbiVelicina = document.querySelectorAll(".gumb-velicina"); // Dohvaća sve gumbe za odabir veličine
    const gumbDodaj = document.getElementById("dodaj-u-kosaricu"); // Dohvaća gumb Dodaj u košaricu jer u HTML smo dodali id
    const brojacKosarice = document.getElementById("brojac-kosarice"); // Prikazuje broj proizvoda koje smo dodali u košaricu
    let odabranaVelicina = null; // Varijabla u koju spremamo odabranu veličinu proizvoda

    // ODABIR VELIČINE
    gumbiVelicina.forEach(gumb => {
        gumb.addEventListener("click", () => {
            // Uklanja oznaku "odabrano" sa svih gumba
            gumbiVelicina.forEach(g => g.classList.remove("odabrano"));
            // Dodaje oznaku samo na kliknuti gumb
            gumb.classList.add("odabrano");
            // Sprema odabranu veličinu iz data atributa
            odabranaVelicina = gumb.dataset.velicina;
        });
    });

    // DODAVANJE U KOŠARICU

    // Provjerava postoji li gumb na stranici
    if (gumbDodaj) {

        // Kada korisnik klikne "Dodaj u košaricu"
        gumbDodaj.addEventListener("click", () => {
            
             // Stvara objekt proizvoda s podacima sa stranice
            const proizvod = {
                naziv: document.querySelector(".naziv-proizvoda").innerText,
                cijena: document.querySelector(".cijena-proizvoda").innerText,
                slika: document.querySelector(".asdslika").src,
                velicina: odabranaVelicina
            };

            // Ako veličina nije odabrana, prekida izvršavanje
            if (!proizvod.velicina) {
                alert("Odaberite veličinu!");
                return;
            }

            // Dohvaća postojeću košaricu iz localStorage
            let kosarica = JSON.parse(localStorage.getItem("popisKosarica")) || [];

            // Dodaje novi proizvod u košaricu
            kosarica.push(proizvod);

            // Sprema ažuriranu košaricu natrag u localStorage
            localStorage.setItem("popisKosarica", JSON.stringify(kosarica));

            // Ažurira broj proizvoda u košarici
            azurirajBrojac();

            //Šalje obavijest korisniku
            alert("Dodano u košaricu!");

            // Osvježava stranicu kako bi se prikazali novi podaci
            location.reload();
        });
    }

    // BROJAČ KOŠARICE
    function azurirajBrojac() {
        // Dohvaća sadržaj košarice
        let kosarica = JSON.parse(localStorage.getItem("popisKosarica")) || [];

        // Ako brojač postoji na stranici, ispisuje broj proizvoda
        if (brojacKosarice) {
            brojacKosarice.textContent = kosarica.length;
        }
    }

    // Poziva funkciju odmah nakon učitavanja stranice
    azurirajBrojac();
});