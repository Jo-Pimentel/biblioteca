import Link from "next/link";
import { useEffect, useState } from "react";
import AlunoService from "../service/AlunoService";
import AluguelService from "../service/AluguelService";

export default function CatalogoAlugueis() {
    const alunoService = new AlunoService;
    const aluguelService = new AluguelService;
    const [dadosPagina, setDadosPagina] = useState({});
    const [paginaAtual, setPaginaAtual] = useState(0);
    const [listaDeAlunos, setListaDeAlunos] = useState([]);
    const [listaDeAlugueis, setListaDeAlugueis] = useState([]);

    // useEffect(() => {
    //     alunoService.buscarAlunos().then((response) => {
    //         setListaDeAlunos(response.data);
    //     }).catch((error) => {
    //         alert("Erro ao buscar os alunos " + error);
    //     })
    // }, []);

    // useEffect(() => {
    //     aluguelService.buscarAlugueis().then((response) => {
    //         setListaDeAlugueis(response.data);
    //     }).catch((error) => {
    //         alert("Erro ao buscar os aluguéis " + error);
    //     })
    // }, []);

    useEffect(() => {
        aluguelService.listarAlugueisPorPagina({"page": paginaAtual, "size": 3, "sort": "dataAluguel"}).then((response) => {
            setDadosPagina(response.data);
            console.log(response.data);
        }).catch((error) => {
            alert("Erro ao buscar os aluguéis. " + error);
        })
    }, [paginaAtual])

    return (
        <>
            <h1>Aluguéis</h1> <br />
            <div>
                <ol>
                    {dadosPagina?.content?.map((aluguel) => {
                        return (
                            <li key={aluguel.id}>Aluno: {aluguel.aluno.nome} <br />Itens: {aluguel.itens.map((item) => {
                                return (
                                    <><div key={item.id}>{item.titulo}</div></>
                                )
                            })} <br />Data de devolução: {aluguel.dataDevolucao} <br />
                            Aluguel realizado em: {aluguel.dataAluguel} <br />
                            Devolvido em: {aluguel.devolvidoEm} <br />
                                <button onClick={() => {
                                    aluguelService.prorrogarDevolucao(aluguel.id).then((response) => {
                                        console.log(response.data);
                                        location.reload();
                                    }).catch((error) => {
                                        console.log(error);
                                    })
                                }}>Prorrogar devolução em 1 semana</button>

                                <button onClick={() => {
                                    const confirmarDevolucao = confirm("Deseja realmente realizar a devolução dos itens?");

                                    if(confirmarDevolucao) {
                                        aluguelService.devolucao(aluguel.id).then(() => {
                                            alert("Itens devolvidos com sucesso.");
                                            location.reload();
                                        }).catch((error) => {
                                            alert("Erro ao devolver os itens");
                                            console.log(error);
                                        })
                                    }
                                }}>Realizar devolução</button> <br /><hr /><br />
                            </li>
                        )
                    })}
                </ol>

                <button onClick={() => {
                    setPaginaAtual((prev) => prev - 1)
                }}
                disabled={paginaAtual == 0}
                >Página anterior</button>

                <button onClick={() => {
                    setPaginaAtual((prev) => prev + 1)
                }}
                disabled={paginaAtual >= dadosPagina.totalPages - 1}
                >Próxima página</button>
            </div>
            
            <Link href={'/'}><button>Voltar para a tela inicial</button></Link>
        </>
    )
}