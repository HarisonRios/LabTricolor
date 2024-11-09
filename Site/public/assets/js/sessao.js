function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;
    var foto = sessionStorage.FOTO_USUARIO; 

    var b_usuario = document.getElementById("b_usuario");
    var foto_usuario = document.getElementById("foto_usuario");

    if (email != null && nome != null) {
        b_usuario.innerHTML = nome;

        if (foto != null) {
            foto_usuario.src = foto; 
        } else {
            foto_usuario.src = 'caminho/padrao/foto.png'; 
        }
    } else {
        window.location = "../login.html";
    }
}



function limparSessao() {
    sessionStorage.clear();
    window.location = "../login.html";
}

// carregamento (loading)
function aguardar() {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "flex";
}



function finalizarAguardar(texto) {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "none";

    if (texto) {
        Swal.fire({
            title: "Erro",
            text: texto,
            icon: "error",
            width: 400,
            padding: "2em",
            color: "#FF0000",
            background: "#fff",
            backdrop: `rgba(0,0,0,0.4)`
        });
    }
}
