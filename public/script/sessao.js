function validarSessaoLogin() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;

    if (email != null && nome != null) {
        window.location = "../index.html";
    }
}

function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;
    var apelido = sessionStorage.APELIDO_USUARIO;

    var usuario = document.getElementById("usuario");
    if (email != null && nome != null) {
        console.log("Usuário já logado");
    usuario.innerHTML = `
      <ul>
        <li class="user">Olá<p>, ${apelido}</p></li>
        <li><a class="sair" href="#" onclick="sair()">Sair<span class="icone-sair"></span></a></li>
      </ul>
    `;
        
    }
}
function sair() {
  sessionStorage.clear();
  window.location.reload();
}