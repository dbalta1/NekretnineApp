let SpisakNekretnina = function () {
  let listaNekretnina = [];
  let listaKorisnika = [];

  let init = function (listaNekretnina1, listaKorisnika1) {
    listaNekretnina = listaNekretnina1;
    listaKorisnika = listaKorisnika1;
  };

  let filtrirajNekretnine = function (kriterij) {
    let vratiNekretnine = [];

    for (let i = 0; i < listaNekretnina.length; i++) {
      if (
        (!kriterij.tip_nekretnine ||
          listaNekretnina[i].tip_nekretnine === kriterij.tip_nekretnine) &&
        (!kriterij.min_kvadratura ||
          listaNekretnina[i].kvadratura >= kriterij.min_kvadratura) &&
        (!kriterij.max_kvadratura ||
          listaNekretnina[i].kvadratura <= kriterij.max_kvadratura) &&
        (!kriterij.min_cijena ||
          listaNekretnina[i].cijena >= kriterij.min_cijena) &&
        (!kriterij.max_cijena ||
          listaNekretnina[i].cijena <= kriterij.max_cijena)
      )
        vratiNekretnine.push(listaNekretnina[i]);
    }
    return vratiNekretnine;
  };

  let ucitajDetaljeNekretnine = function (id) {
    for (let i = 0; i < listaNekretnina.length; i++) {
      if (listaNekretnina[i].id === id) return listaNekretnina[i];
    }
    return null;
  };

  return {
    init: init,
    filtrirajNekretnine: filtrirajNekretnine,
    ucitajDetaljeNekretnine: ucitajDetaljeNekretnine,
  };
};
