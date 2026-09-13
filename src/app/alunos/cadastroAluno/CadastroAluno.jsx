import "../../css/telaCadastro.css";
import { useState } from "react";
import { useEffect } from "react";
import AlunoService from "../../service/AlunoService";
import AtualizarAluno from "../atualizarAluno/AtualizarAluno";

export default function CadastroAluno() {
    const [mensagem, setMensagem] = useState("");
    const [nomeAluno, setNomeAluno] = useState("");
    const [cpfAluno, setCpfAluno] = useState("");
    const alunoService = new AlunoService;

    return (
        <div className="screen">
            <div className="telaCadastro">
                <label>Digite o nome do aluno abaixo</label>
                <input type="text" id="nomeAluno" onInput={(evt) => {
                    setNomeAluno(evt.target.value);
                }}/>

                <label>Digite o CPF do aluno abaixo</label>
                <input type="text" id="cpfAluno" onInput={(evt) => {
                    setCpfAluno(evt.target.value);
                }}/>

                <button type="submit" onClick={() => {
                    const novoAluno = {
                        "nome": nomeAluno,
                        "cpf": cpfAluno
                    }

                    alunoService.salvarAluno(novoAluno).then((response) => {
                        console.log(response.data);
                        setMensagem("Aluno cadastrado com sucesso!");
                    }).catch((error) => {
                        console.log(error);
                        setMensagem(error);
                    }) 
                }}>Cadastrar aluno</button>

                <h1>{mensagem}</h1>
            </div>
        </div>
    )
}