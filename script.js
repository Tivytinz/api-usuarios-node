async function criarUsuario() {
    const nome = document.getElementById("nome").value;
    const email = document.getEelementById("email").value;

    await fetch("http://localhost:3000/usuarios", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"            
        },
        body JSON.stringify({ nome, email })
    });

    listarUsuarios();
}

async function listarUsuarios() {
    const resposta = await fetch("http://localhost:3000/usuarios");
    const usuarios = await resposta.json();

    const lista = document.getEelementById("lista");
    lista.innerHTML = "";

    usuarios.forEach(usuario => {
        const li = document.createElement("li");
        li.textContent = usuario.nome + " = " + usuario.email;
        lista.appenChild(li);
    });
}
listarUsuarios();