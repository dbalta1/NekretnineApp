const PoziviAjax = (() => {
  function impl_getKorisnik(fnCallback) {
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
      if (ajax.readyState == 4 && ajax.status == 200) {
        fnCallback(null, ajax.responseText);
      } else if (ajax.readyState == 4 && ajax.status == 401) {
        fnCallback(ajax.statusText, null);
      }
    };
    ajax.open("GET", "http://localhost:3000/korisnik/", true);
    ajax.send();
  }

  function impl_putKorisnik(noviPodaci, fnCallback) {
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
      if (ajax.readyState == 4 && ajax.status == 200) {
        fnCallback(null, ajax.responseText);
      } else if (ajax.readyState == 4 && ajax.status == 401) {
        fnCallback(ajax.responseText, null);
      }
    };
    ajax.open("PUT", "http://localhost:3000/korisnik", true);
    ajax.setRequestHeader("Content-Type", "application/json");
    ajax.send(JSON.stringify({ ...noviPodaci }));
  }

  function impl_postUpit(nekretnina_id, tekst_upita, fnCallback) {
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
      if (ajax.readyState == 4 && ajax.status == 200) {
        fnCallback(null, ajax.responseText);
      } else if (
        ajax.readyState == 4 &&
        (ajax.status == 401 || ajax.status == 400)
      ) {
        fnCallback(ajax.responseText, null);
      }
    };
    ajax.open("POST", "http://localhost:3000/upit", true);
    ajax.setRequestHeader("Content-Type", "application/json");
    ajax.send(JSON.stringify({ nekretnina_id, tekst_upita }));
  }

  function impl_getNekretnine(fnCallback) {
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
      if (ajax.readyState == 4 && ajax.status == 200) {
        fnCallback(null, ajax.responseText);
      } else if (ajax.readyState == 4 && ajax.status == 401) {
        fnCallback(ajax.statusText, null);
      }
    };
    ajax.open("GET", "http://localhost:3000/nekretnine", true);
    ajax.send();
  }

  function impl_postLogin(username, password, fnCallback) {
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
      if (ajax.readyState == 4 && ajax.status == 200) {
        fnCallback(null, ajax.responseText);
      } else if (ajax.readyState == 4 && ajax.status == 401) {
        fnCallback(ajax.responseText, null);
      }
    };
    ajax.open("POST", "http://localhost:3000/login", true);
    ajax.setRequestHeader("Content-Type", "application/json");
    ajax.send(JSON.stringify({ username, password }));
  }

  function impl_postLogout(fnCallback) {
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
      if (ajax.readyState == 4 && ajax.status == 200) {
        fnCallback(null, ajax.responseText);
      } else if (ajax.readyState == 4 && ajax.status == 401) {
        fnCallback(ajax.statusText, null);
      }
    };
    ajax.open("POST", "http://localhost:3000/logout", true);
    ajax.send();
  }

  function impl_getNekretninaById(nekretnina_id, fnCallback) {
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
      if (ajax.readyState == 4 && ajax.status == 200) {
        fnCallback(null, ajax.responseText);
      } else if (ajax.readyState == 4 && ajax.status == 401) {
        fnCallback(ajax.statusText, null);
      }
    };
    ajax.open("GET", "http://localhost:3000/nekretnina/" + nekretnina_id, true);
    ajax.send();
  }

  return {
    postLogin: impl_postLogin,
    postLogout: impl_postLogout,
    getKorisnik: impl_getKorisnik,
    putKorisnik: impl_putKorisnik,
    postUpit: impl_postUpit,
    getNekretnine: impl_getNekretnine,
    getNekretninaById: impl_getNekretninaById,
  };
})();
