let listaNekretnina = [];

PoziviAjax.getNekretnine((error, data) => {
  listaNekretnina = JSON.parse(data);
  nekretnine.init(listaNekretnina, []);
  spojiNekretnine(divStan, nekretnine, "Stan");
  spojiNekretnine(divKuca, nekretnine, "Kuća");
  spojiNekretnine(divPp, nekretnine, "Poslovni prostor");
});

function spojiNekretnine(divReferenca, instancaModula, tip_nekretnine) {
  const filtriraneNekretnine = instancaModula.filtrirajNekretnine({
    tip_nekretnine: tip_nekretnine,
  });

  divReferenca.innerHTML = "";

  for (let i = 0; i < filtriraneNekretnine.length; i++) {
    const nekretnina = filtriraneNekretnine[i];

    const nekretninaDiv = document.createElement("div");
    nekretninaDiv.className = "grid-item";

    nekretninaDiv.innerHTML = `
            <img src="kuca2.jpg" alt="slikanekretnine">
            <table class="tabela">
                <tr>
                    <td><b>${nekretnina.naziv}</b></td>
                </tr>
                <tr>
                    <td><b>Kvadratura: </b>${nekretnina.kvadratura} m2</td>
                </tr>
                <tr>
                    <td class="cijena"><b>Cijena: </b>${
                      nekretnina.cijena === null
                        ? "na upit"
                        : `${nekretnina.cijena} KM`
                    }</td> 
                </tr>
            </table>
            <button class="gumb" onclick="prikaziDodatno(this)" id=${
              nekretnina.id
            }>Detalji</button>
            <div style="display: none; margin-top: 10px;" id="dodatno${
              nekretnina.id
            }">
                <div> <b>Lokacija</b>: ${nekretnina.lokacija} </div>
                <div> <b>Godina izgradnje </b>: ${
                  nekretnina.godina_izgradnje
                } </div>
                <button class="gumb"onclick="window.location.href='detalji.html?id=${
                  nekretnina.id
                }'">Otvori detalje</button>
            </div>
        `;
    divReferenca.appendChild(nekretninaDiv);
  }
}

const divStan = document.getElementById("stan");
const divKuca = document.getElementById("kuca");
const divPp = document.getElementById("pp");

function prikaziDodatno(element) {
  document.getElementById("dodatno" + element.id).style = "display: block;";
}

let nekretnine = SpisakNekretnina();
nekretnine.init(listaNekretnina, []);
