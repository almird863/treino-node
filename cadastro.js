const formCadastro = document.getElementById('form-cadastro');

function fazerLogin(user) {
    fetch('http://localhost:3000/cadastro', {
        method: 'POST',
        headers: {'content-type':'application/json'},
        body:JSON.stringify(user)
        })
        .then((res) => {
            if (res.ok) {
                return res.json()
            } else {
                return res.json().then(erro => {
                    throw new Error(erro.message)
                })
            }
        })
        .then((dados) => {
            alert(dados.message);
        })
        .catch((erro) => {
            alert(erro.message);
        })
}


formCadastro.addEventListener('submit', (e) => {
    e.preventDefault();

    const user = document.getElementById('captura-user').value;
    const email = document.getElementById('captura-email').value;
    const senha = document.getElementById('captura-senha').value;

    loginAttempt = {
        nome:user,
        email:email,
        senha:senha
    }

    fazerLogin(loginAttempt)
})