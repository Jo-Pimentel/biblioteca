import { useEffect, useState } from "react";
import axios from "axios";
import AlunoService from "../service/AlunoService.jsx";
import Link from "next/link.js";
import AtualizarAluno from "./atualizarAluno/AtualizarAluno.jsx";

export default function CatalogoAlunos() {
    const [listaDeAlunos, setListaDeAlunos] = useState([]);
    const [nomeAluno, setNomeAluno] = useState("");
    const alunoService = new AlunoService;
    //console.log("renderizou");

    // Buscar todos os alunos
    useEffect(() => {
        alunoService.buscarAlunos().then((response) => {
            setListaDeAlunos(response.data);
        }).catch((error) => {
            console.log("Erro ao buscar os registros dos alunos. " + error);
        });
    }, []);

    // Buscar aluno por ID
    useEffect(() => {
        alunoService.buscarAlunoPorId(1).then((response) => {
            setNomeAluno(response.data);
        }).catch((error) => {
            console.log("Erro ao buscar o aluno com o ID fornecido. " + error);
        })
    }, []);

    return (
        <div>
            <h1>Alunos cadastrados</h1><br />
            <ol>
                {listaDeAlunos.map((aluno) => {
                    return(
                        <li key={aluno.id}>
                            Nome: {aluno.nome} | CPF: {aluno.cpf} | 
                            <button type="submit" onClick={() => {
                                const permissaoParaDeletar = confirm("Deseja realmente deletar esse aluno do sistema?");

                                if(permissaoParaDeletar) {
                                    alunoService.deletarAluno(aluno.id).then((response) => {
                                        alert("Aluno deletado do sistema com sucesso.");
                                        console.log(response.data);
                                        location.reload();
                                    }).catch((error) => {
                                        alert("Erro ao deletar o aluno do sistema.");
                                        console.log(error);
                                    })
                                }
                            }}>Deletar aluno do sistema</button>

                            <Link href={'/alunos/atualizarAluno'}>
                                <button onClick={() => {
                                    sessionStorage.setItem("IdAluno", aluno.id)
                                }}>Atualizar informações do aluno</button>
                            </Link>
                        </li>
                    )
                })}
            </ol>

            <Link href={'/alunos/cadastroAluno'}><button>Cadastrar novo aluno</button></Link>
            <Link href={'/'}><button>Voltar para a tela inicial</button></Link>
            <Link href={'/alugueis'}><button>Ir para os aluguéis</button></Link>
        </div> 
    )
}