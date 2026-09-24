import { useEffect, useState } from "react";
import axios from "axios";
import AlunoService from "../service/AlunoService.jsx";
import Link from "next/link.js";
import AtualizarAluno from "./atualizarAluno/AtualizarAluno.jsx";

export default function CatalogoAlunos() {
    const [listaDeAlunosPaginados, setListaDeAlunosPaginados] = useState([]);
    const [dadosPagina, setDadosPagina] = useState({});
    const [paginaAtual, setPaginaAtual] = useState(0);
    const [nomeAluno, setNomeAluno] = useState("");
    const alunoService = new AlunoService;
    let index = 0;
    
    useEffect(() => {
        alunoService.buscarAlunosPorPagina({"page": paginaAtual, "size": 3, "sort": "id"}).then((response) => {
            setDadosPagina(response.data);
            setListaDeAlunosPaginados(response.data.content);
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        })
    }, [paginaAtual]);

    return (
        <div>
            <h1>Alunos cadastrados</h1><br />
            <ol>
                {
                    dadosPagina?.content?.map((alunoPaginado) => {
                        return(
                            <li key={alunoPaginado.id}>
                                Nome: {alunoPaginado.nome} | CPF: {alunoPaginado.cpf} | 
                                <button type="submit" onClick={() => {
                                    const permissaoParaDeletar = confirm("Deseja realmente deletar esse aluno do sistema?");

                                    if(permissaoParaDeletar) {
                                        alunoService.deletarAluno(alunoPaginado.id).then((response) => {
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
                    })
                }
            </ol>

            <button onClick={() => {
                setPaginaAtual(0)
            }}>Primeira página</button>

            <button onClick={() => {
                setPaginaAtual((prev) => prev - 1)
                console.log(paginaAtual);
                // irParaPaginaSelecionada({"page": paginaAtual, "size": 2, "sort": "id"})
            }}
            disabled={paginaAtual == 0}
            >Página anterior</button>

            <span>Página {paginaAtual + 1} de {dadosPagina.totalPages}</span>

            <button onClick={() => {
                setPaginaAtual(paginaAtual + 1)
                console.log(paginaAtual)
            }}
            disabled={paginaAtual + 1 >= dadosPagina.totalPages}
            >Próxima página</button>
            
            <button onClick={() => {
                setPaginaAtual(dadosPagina.totalPages - 1)
            }}>Última página</button>
            
            <br/>

            <Link href={'/alunos/cadastroAluno'}><button>Cadastrar novo aluno</button></Link>
            <Link href={'/'}><button>Voltar para a tela inicial</button></Link>
            <Link href={'/alugueis'}><button>Ir para os aluguéis</button></Link>
        </div> 
    )
}