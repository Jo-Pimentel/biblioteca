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
            console.log(botoesPaginas);
        }).catch((error) => {
            console.log(error);
        })
    }, [paginaAtual]);

    // while(botoesPaginas.length < dadosPagina?.totalPages) {
    //     setBotoesPaginas(botoesPaginas.push(botoesPaginas.length + 1));
    //     console.log(botoesPaginas);
    // }

    // for(let i = 0; i < dadosPagina.totalPages; i++) {
    //     botoesPaginas.push(i);
    //     console.log(botoesPaginas);
    // }

    const arrayPaginas = Array.from({length: dadosPagina?.totalPages}, (_, index) => index)

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

            {arrayPaginas.map((pagina) => {
                return (
                    <button onClick={() => {
                        setPaginaAtual(pagina)
                    }}
                    disabled={paginaAtual == pagina}
                    >{pagina + 1}</button>
                )
            })}

            <button onClick={() => {
                setPaginaAtual(arrayPaginas.length - 1)
            }}>Última página</button>
            
            <br/>

            <Link href={'/alunos/cadastroAluno'}><button>Cadastrar novo aluno</button></Link>
            <Link href={'/'}><button>Voltar para a tela inicial</button></Link>
            <Link href={'/alugueis'}><button>Ir para os aluguéis</button></Link>
        </div> 
    )
}