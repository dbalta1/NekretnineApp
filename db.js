const Sequelize = require("sequelize");
const sequelize = new Sequelize("wt24", "root", "password", {
  host: "127.0.0.1",
  dialect: "mysql",
  logging: false,
});
const db = {};

db.sequelize = sequelize;

db.korisnik = require("./modeli/korisnik.js")(sequelize);
db.nekretnina = require("./modeli/nekretnina.js")(sequelize);
db.upit = require("./modeli/upit.js")(sequelize);

db.nekretnina.hasMany(db.upit, { as: "upiti" });
db.korisnik.hasMany(db.upit, { as: "upiti" });

async function napraviTabele() {
  await db.sequelize.sync();
}

napraviTabele();

async function punjenjeTabela() {
  db.korisnik.create({
    ime: "Dzana",
    prezime: "Balta",
    username: "dzana",
    password: "$2b$10$cA7jCvUCy18U7WHvQ88MkuHO8hQqyH4DNyhojzlcZUmsNElVDmPs6",
  });

  db.nekretnina.create({
    tip_nekretnine: "Stan",
    naziv: "Useljiv stan Sarajevo",
    kvadratura: 58,
    cijena: 232000,
    tip_grijanja: "plin",
    lokacija: "Novo Sarajevo",
    godina_izgradnje: 2019,
    datum_objave: "01.10.2023.",
    opis: "Sociis natoque penatibus.",
  });

  db.nekretnina.create({
    tip_nekretnine: "Poslovni prostor",
    naziv: "Mali poslovni prostor",
    kvadratura: 20,
    cijena: 70000,
    tip_grijanja: "struja",
    lokacija: "Centar",
    godina_izgradnje: 2005,
    datum_objave: "20.08.2023.",
    opis: "Magnis dis parturient montes.",
  });

  db.upit.create({
    NekretninaId: 1,
    KorisnikId: 1,
    tekst_upita: "Test",
  });
}

setTimeout(punjenjeTabela, 1000);
module.exports = db;
