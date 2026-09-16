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
    }, [])

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
                            <button onClick={() => {
                                sessionStorage.setItem("IdAluno", aluno.id);
                            }}>
                                <Link href={'/alunos/atualizarAluno'}>Atualizar informações do aluno</Link>
                            </button>
                            {/* <button onClick={(evt) => {
                                alert("Hello world")
                            }}>
                                <Link>Realizar aluguel</Link>
                            </button> */}
                        </li>
                    )
                })}
            </ol>

            <button><Link href={'/alunos/cadastroAluno'}>Cadastrar novo aluno</Link></button>
            <button><Link href={'/'}>Voltar para a tela inicial</Link></button>
        </div> 
    )
}