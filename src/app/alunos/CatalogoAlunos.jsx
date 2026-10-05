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
        <div className="container">
            <h1 className="tituloCatalogo">Alunos cadastrados</h1><br />
            <div className="entidadesRetornadas">
                {
                    dadosPagina?.content?.map((alunoPaginado) => {
                        return(
                            <span className="entidadeRetornada" key={alunoPaginado.id}>
                                Nome: {alunoPaginado.nome} | CPF: {alunoPaginado.cpf}
                                <span className="botoesAcoesEntidade"> 
                                    <button className="botaoAcaoEntidade" type="submit" onClick={() => {
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
                                        <button className="botaoAcaoEntidade" onClick={() => {
                                            sessionStorage.setItem("IdAluno", aluno.id)
                                        }}>Atualizar informações do aluno</button>
                                    </Link>
                                </span>
                            </span>
                        )
                    })
                }
            </div>

            <div className="botoesPaginacao">
                <button className="botaoPaginadoPrimeiraEUltimaPagina" onClick={() => {
                    setPaginaAtual(0)
                }}>Primeira página</button>

                {arrayPaginas.map((pagina) => {
                    return (
                        <button className="botaoPaginado" onClick={() => {
                            setPaginaAtual(pagina)
                        }}
                        disabled={paginaAtual == pagina}
                        >{pagina + 1}</button>
                    )
                })}

                <button className="botaoPaginadoPrimeiraEUltimaPagina" onClick={() => {
                    setPaginaAtual(arrayPaginas.length - 1)
                }}>Última página</button>
            </div>

            <div className="botoesRotas">
                <Link href={'/alunos/cadastroAluno'}><button className="botaoRota">Cadastrar novo aluno</button></Link>
                <Link href={'/'}><button className="botaoRota">Voltar para a tela inicial</button></Link>
                <Link href={'/alugueis'}><button className="botaoRota">Ir para os aluguéis</button></Link>
            </div>
        </div> 
    )
}