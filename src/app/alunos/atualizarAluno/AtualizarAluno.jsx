import "../../css/telaCadastro.css";
import { useState } from "react";
import { useEffect } from "react";
import Link from "next/link";
import AlunoService from "../../service/AlunoService";

export default function AtualizarAluno() {
    const [mensagem, setMensagem] = useState("");
    const [nomeAluno, setNomeAluno] = useState("");
    const [cpfAluno, setCpfAluno] = useState("");
    const [idAluno, setIdAluno] = useState(0);
    const [alunoAtualizado, setAlunoAtualizado] = useState({});
    const alunoService = new AlunoService;
    const listaDeAlunos = alunoService.buscarAlunos().then((response) => {
        console.log(response.data);
    }).catch((error) => {
        console.log(error);
    })

    useEffect(() => {
        alunoService.buscarAlunoPorId(sessionStorage.getItem("IdAluno")).then((response) => {
            setAlunoAtualizado(response.data);
        }).catch((error) => {
            console.log(error);
        })
    }, [])

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
                    let confirmarAtualizacao = confirm("Deseja realmente atualizar este aluno?");

                    console.log(nomeAluno.trim != " ");
                    console.log(cpfAluno.trim != " ");
                    if(nomeAluno.trim != "") {
                        alunoAtualizado.nome = nomeAluno;
                        console.log(alunoAtualizado.nome);
                    }

                    if(cpfAluno.trim != "") {
                        alunoAtualizado.cpf = cpfAluno;
                        console.log(alunoAtualizado.cpf);
                    }

                    sessionStorage.clear();
                    console.log(alunoAtualizado);

                    alunoService.atualizarAluno(alunoAtualizado.id, alunoAtualizado).then((response) => {
                        console.log(response.data);
                        alert("Aluno cadastrado com sucesso!");
                    }).catch((error) => {
                        console.log(error);
                        alert(error);
                    }) 
                }}>Atualizar aluno</button>

                <h1>{mensagem}</h1>

                <Link href={'/alunos'}><button>Voltar para o catálogo</button></Link>
                <Link href={'/'}><button>Voltar para a tela inicial</button></Link>
            </div>
        </div>
    )
}