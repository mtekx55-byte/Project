// Dohvaćamo div u navbaru gdje se prikazuje prijava / profil
const authContainer = document.getElementById("auth-container");

// Čitamo stanje prijave iz localStorage
const jePrijavljen = localStorage.getItem("jePrijavljen");
const imeKorisnika = localStorage.getItem("imeKorisnika");

// Provjeravamo postoji li taj element na stranici
if (authContainer) {
    // AKO je korisnik prijavljen
    if (jePrijavljen === "true") {
        // Uzmi prvo slovo imena (npr. "Marko" → "M")
        const inicijal = imeKorisnika ? imeKorisnika.charAt(0).toUpperCase() : "?";

        // Ubaci HTML za avatar + dropdown izbornik
        authContainer.innerHTML = `
            <div class="dropdown">
                <button type="button"
                class="btn btn-light dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false">
                    <div style="
                        width: 32px;
                        height: 32px;
                        border-radius: 50%;
                        background: #0d6efd;
                        color: white;
                        display:flex;
                        align-items:center;
                        justify-content:center;
                        font-weight:bold;">
                        ${inicijal}
                    </div>
                </button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#" id="odjava-btn">Odjavi se</a></li>
                </ul>
            </div>
        `;

        // Dodajemo event listener na logout gumb
        document.getElementById("odjava-btn").addEventListener("click", () => {
            // Brišemo podatke o prijavi
            localStorage.removeItem("jePrijavljen");
            localStorage.removeItem("imeKorisnika");
            // Osvježimo stranicu da se izgled promijeni
            window.location.reload();
        });

    } 
    // AKO korisnik NIJE prijavljen
    else {
        
        // Prikazujemo gumb za prijavu
        authContainer.innerHTML =
            `<a href="prijava.html" class="btn btn-outline-light">Prijava</a>`;
    }
}