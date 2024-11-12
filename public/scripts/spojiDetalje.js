const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
PoziviAjax.getNekretninaById(id, function (err, data) {
  if (err) {
  } else {
    data = JSON.parse(data);
    const osobine = Object.keys(data);
    const posebneOsobine = ["upiti", "id", "tip_nekretnine"];
    osobine.forEach((property) => {
      if (!posebneOsobine.includes(property)) {
        document.getElementById(property).textContent += data[property];
      }
    });
    const lista_upita = document.getElementById("lista-upita");
    data.upiti.forEach((upit) => {
      const li = document.createElement("li");
      li.setAttribute("class", "upit");
      const user = document.createElement("p");
      const b = document.createElement("b");
      b.textContent = upit.username;
      const tekstUpita = document.createElement("p");
      tekstUpita.textContent = upit.tekst_upita;
      tekstUpita.setAttribute("class", "upit-tekst")
      user.appendChild(b);
      li.appendChild(user);
      li.appendChild(tekstUpita);
      lista_upita.appendChild(li);
    });
    if (sessionStorage.getItem("username")) {
      document.getElementById("forma").style.display = "block";
    }
  }
});
