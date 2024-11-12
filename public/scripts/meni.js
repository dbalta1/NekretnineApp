const sveOpcije = [
  {
    tekst: "Nekretnine",
    prijavljen: 0,
    link: "nekretnine.html",
  },
  {
    tekst: "Prijava",
    prijavljen: -1,
    link: "prijava.html",
  },
  {
    tekst: "Profil",
    prijavljen: 1,
    link: "profil.html",
  },
  {
    tekst: "Odjava",
    prijavljen: 1,
  },
];

function odjava() {
  PoziviAjax.postLogout((error, data) => {
    if (error) {
    } else {
      sessionStorage.removeItem("username");
      window.location.href = "/prijava.html";
    }
  });
}

function postaviOpcije(korisnik) {
  const header = document.getElementById("meni");

  sveOpcije.forEach((opcija) => {
    const listItem = document.createElement("li");

    if (opcija.link) {
      const link = document.createElement("a");
      link.href = opcija.link;
      link.innerText = opcija.tekst;
      listItem.appendChild(link);
    } else {
      listItem.addEventListener("click", odjava);
      listItem.innerText = opcija.tekst;
    }

    if (korisnik) {
      if (opcija.prijavljen >= 0) {
        header.appendChild(listItem);
      }
    } else {
      if (opcija.prijavljen <= 0) {
        header.appendChild(listItem);
      }
    }
  });

  if (korisnik) {
    sessionStorage.setItem("username", korisnik.username);
  }
}

PoziviAjax.getKorisnik((error, korisnik) => {
  postaviOpcije(JSON.parse(korisnik));
});
