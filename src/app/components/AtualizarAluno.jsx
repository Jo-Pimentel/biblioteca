import "../css/telaCadastro.css";
import { useState } from "react";
import { useEffect } from "react";
import AlunoService from "../service/AlunoService";

export default function AtualizarAluno() {
    const [mensagem, setMensagem] = useState("");
    const [nomeAluno, setNomeAluno] = useState("");
    const [cpfAluno, setCpfAluno] = useState("");
    const [idAluno, setIdAluno] = useState(0);
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

                <label>Digite o ID do aluno abaixo</label>
                <input type="number" onInput={(evt) => {
                    setIdAluno(evt.target.value);
                }}/>

                <button type="submit" onClick={() => {
                    const alunoAtualizado = {
                        "nome": nomeAluno,
                        "cpf": cpfAluno
                    }

                    alunoService.atualizarAluno(idAluno, alunoAtualizado).then((response) => {
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