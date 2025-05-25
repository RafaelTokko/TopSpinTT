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

    var usuario = document.getElementById("usuario");
    if (email != null && nome != null) {
        console.log("Usuário já logado");
    usuario.innerHTML = `
      <ul>
        <li class="user">Olá<p>, ${nome}</p></li>
        <li><a class="sair" href="#" onclick="sair()">Sair<span class="icone-sair"></span></a></li>
      </ul>
    `;
    }
    if (window.location.href.includes("login.html") || window.location.href.includes("cadastro.html")) {
            return;
    } else {
        saveRedirect();
    }
}

function validarSessaoPesquisa() {
    var idUsuario = sessionStorage.ID_USUARIO;
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;

    var pesquisa = document.getElementById("pesquisa");
    if (email != null && nome != null) {
        console.log("Usuário já logado");
    } else {
    pesquisa.innerHTML = `
            <div class="painel-pesquisa">
                <div class="conteudo-pesquisa">
                    <div class="texto-nao-logado">
                        <h2>Você precisa estar logado para responder a pesquisa!</h1>
                    </div>
                    <div class="itens-nao-logado">
                        <button id="entrar" onclick="location.href='./login.html';">Entre com sua conta</button>
                        <p>ou</p>
                        <button id="cadastrar" onclick="location.href='./cadastro.html';">Crie uma conta agora!</button>
                    </div>
                </div>
            </div>
    `;
    return;
    }

    fetch("/pesquisa/verificar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idServer: idUsuario })
    })
    .then(res => res.json())
    .then(resposta => {
        if (resposta.respondeu) {
            abrirCard(); 
        }
    })
    .catch(() => {});
}

function sair() {
  sessionStorage.clear();
  window.location.reload();
}

function saveRedirect() {
      sessionStorage.setItem("redirectAfterLogin", window.location.href);
      console.log(sessionStorage.getItem("redirectAfterLogin"));
}