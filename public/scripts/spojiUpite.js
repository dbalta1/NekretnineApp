function dodaj() {
  const urlParams = new URLSearchParams(window.location.search);
  const nekretninaId = JSON.parse(urlParams.get("id"));
  const tekstUpita = document.getElementById("novi").value;
  PoziviAjax.postUpit(nekretninaId, tekstUpita, function (err, data) {
    if (err) return;
    else {
      const lista_upita = document.getElementById("lista-upita");
      const li = document.createElement("li");
      li.setAttribute("class", "upit");
      const user = document.createElement("p");
      const b = document.createElement("b");
      b.textContent = sessionStorage.getItem("username");
      const tekstUpitaEl = document.createElement("p");
      tekstUpitaEl.textContent = tekstUpita;
      tekstUpitaEl.setAttribute("class", "upit-tekst");
      user.appendChild(b);
      li.appendChild(user);
      li.appendChild(tekstUpitaEl);
      lista_upita.appendChild(li);
    }
  });
}
