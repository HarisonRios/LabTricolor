function validarSessao() {
  var email = sessionStorage.EMAIL_USUARIO;
  var nome = sessionStorage.NOME_USUARIO;

  var b_usuario = document.getElementById("b_usuario");


  if (email != null && nome != null) {
    b_usuario.innerHTML = nome;
  } else {
    window.location = "../login.html";
  }
}


function limparSessao() {
  sessionStorage.clear();
  window.location = "../login.html";
}


function aguardar() {
  var divAguardar = document.getElementById("div_aguardar");
  divAguardar.style.display = "flex";
}

function finalizarAguardar(texto) {
  if (texto) {
    Swal.fire({
      title: "Erro",
      text: texto,
      icon: "error",
      width: 400,
      padding: "2em",
      color: "#FF0000",
      background: "#fff",
      backdrop: `rgba(0,0,0,0.4)`,
    });
  }
}
