export default function CadastroAluno() {
    let mensagemSucesso = "Aluno cadastrado com sucesso"
    return (
        <div className="containerCadastro">
            <label>Digite o nome do aluno abaixo</label>
            <input type="text" id="nomeAluno"/>

            <label>Digite a senha do aluno abaixo</label>
            <input type="password" id="senhaAluno"/>

            <button>Cadastrar</button>

            <h1>{mensagemSucesso}</h1>
        </div>
    )
}