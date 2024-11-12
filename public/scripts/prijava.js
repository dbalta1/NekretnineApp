function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  console.log("Login: " + username + " " + password);
  PoziviAjax.postLogin(username, password, (error, data) => {
    if (error) {
        console.log("Error: " + JSON.stringify(error))
    } else {
      console.log("username", username);
      window.location.href = "/profil.html";
      sessionStorage.setItem("username", username);
    }
  });
}
