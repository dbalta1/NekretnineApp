const express = require("express");
const bcrypt = require("bcrypt");
const path = require("path");
const session = require("express-session");
const db = require("./db");
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "public/html")));
app.use(express.static(path.join(__dirname, "public/css")));
app.use(express.static(path.join(__dirname, "public/scripts")));
app.use(express.static(path.join(__dirname, "public/slike1")));
app.use(express.json());
app.use(session({ secret: "tajna", resave: false, saveUninitialized: true }));

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const korisnik = await db.korisnik.findOne({
      where: { username },
    });

    if (!korisnik) {
      return res.status(401).json({ poruka: "Neuspješna prijava" });
    }

    const provjera = await bcrypt.compare(password, korisnik.password);

    if (provjera) {
      req.session.korisnik = korisnik.dataValues;
      return res.status(200).json({ poruka: "Uspješna prijava" });
    } else {
      return res.status(401).json({ poruka: "Neuspješna prijava" });
    }
  } catch (error) {
    return res.status(500).json({ poruka: "Server error" });
  }
});

//LOGOUT RUTA
app.post("/logout", (req, res) => {
  if (req.session.korisnik) {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).json({ poruka: "Server error" });
      } else {
        res.status(200).json({ poruka: "Uspješna odjava" });
      }
    });
  } else {
    res.status(401).json({ greska: "Neautorizovan pristup" });
  }
});

app.get("/korisnik", (req, res) => {
  if (req.session.korisnik) {
    res.status(200).json(req.session.korisnik);
  } else {
    res.status(401).json({ greska: "Neautorizovan pristup" });
  }
});

app.post("/upit", async (req, res) => {
  try {
    if (!req.session.korisnik) {
      return res.status(401).json({ poruka: "Neautorizovan pristup" });
    }

    const { nekretnina_id, tekst_upita } = req.body;
    const nekretnina = await db.nekretnina.findOne({
      where: {
        id: parseInt(nekretnina_id),
      },
    });

    if (!nekretnina) {
      return res.status(400).json({
        poruka: `Nekretnina sa id-em ${nekretnina_id} ne postoji`,
      });
    }

    await db.upit.create({
      KorisnikId: req.session.korisnik.id,
      NekretninaId: parseInt(nekretnina_id),
      tekst_upita,
    });

    res.status(200).json({
      poruka: "Upit je uspješno dodan",
    });
  } catch (error) {
    res.status(500).json({ poruka: "Server error" });
  }
});

app.put("/korisnik", async (req, res) => {
  try {
    if (!req.session.korisnik) {
      return res.status(401).json({ poruka: "Neautorizovan pristup" });
    }

    const korisnikId = req.session.korisnik.id;
    const existingUser = await db.korisnik.findByPk(korisnikId);

    if (!existingUser) {
      return res.status(400).json({ poruka: "Korisnik nije pronađen" });
    }

    const requestBody = req.body;
    const updatedUserData = {
      ime: requestBody.ime || existingUser.ime,
      prezime: requestBody.prezime || existingUser.prezime,
      username: requestBody.username || existingUser.username,
      password: requestBody.password
        ? hashPassword(requestBody.password)
        : existingUser.password,
    };

    await db.korisnik.update(updatedUserData, {
      where: { id: existingUser.id },
    });

    req.session.korisnik = await db.korisnik.findByPk(existingUser.id);

    res.status(200).json({ poruka: "Podaci su uspješno ažurirani" });
  } catch (error) {
    res.status(500).json({ poruka: "Server error" });
  }
});

app.get("/nekretnine", async function (req, res) {
  try {
    let nekretnine = await db.nekretnina.findAll();
    nekretnine = nekretnine.map((p) => p.dataValues);
    res.status(200).json(nekretnine);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/nekretnina/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const nekretnina = await db.nekretnina.findOne({
      where: { id },
    });

    if (!nekretnina) {
      return res
        .status(404)
        .json({ poruka: `Nekretnina sa id-em ${id} nije pronađena` });
    }

    const upiti = await db.upit.findAll({
      where: { NekretninaId: nekretnina.id },
    });

    const upitiData = await Promise.all(
      upiti.map(async (upit) => {
        const korisnik = await db.korisnik.findOne({
          where: { id: upit.KorisnikId },
        });
        return {
          id: upit.id,
          tekst_upita: upit.tekst_upita,
          username: korisnik ? korisnik.username : null,
        };
      })
    );

    res.status(200).json({ ...nekretnina.dataValues, upiti: upitiData });
  } catch (error) {
    res.status(500).json({ poruka: "Server error" });
  }
});

function hashPassword(tekst) {
  bcrypt.hash(tekst, 10, (err, hash) => {
    return err ?? hash;
  });
}

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
