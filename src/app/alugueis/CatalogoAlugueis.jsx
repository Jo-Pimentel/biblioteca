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

    useEffect(() => {
        aluguelService.listarAlugueisPorPagina({"page": paginaAtual, "size": 3, "sort": "dataAluguel"}).then((response) => {
            setDadosPagina(response.data);
            console.log(response.data);
        }).catch((error) => {
            alert("Erro ao buscar os aluguéis. " + error);
        })
    }, [paginaAtual])

    function formatarData(dataNaoFormatada) {
        if(dataNaoFormatada == null) {
            return "Ainda não devolvido";
        }
        const dataApenasComNumeros = dataNaoFormatada.split("-");
        return `${dataApenasComNumeros[2]}/${dataApenasComNumeros[1]}/${dataApenasComNumeros[0]}`;
    }

    const arrayPaginas = Array.from({length: dadosPagina?.totalPages}, (_, index) => index);

    return (
        <>
            <div className="container">
                <header>
                    <h1 className="tituloCatalogo">Aluguéis</h1>

                    <div className="botoesRotas">
                        <Link href={'/'} className="linkRota">Voltar para a tela inicial</Link>
                    </div>
                </header>
                
                <div className="entidadesRetornadas">
                    {dadosPagina?.content?.map((aluguel) => {
                        return (
                            <span className="entidadeRetornada" key={aluguel.id}>Aluno: {aluguel.aluno.nome} <hr/> <span>Itens</span> {aluguel.itens.map((item) => {
                                return (
                                    <span key={item.id}>{item.titulo}</span>
                                )
                            })} <hr /> Data de devolução: {formatarData(aluguel.dataDevolucao)} <br />
                            Aluguel realizado em: {formatarData(aluguel.dataAluguel)} <br />
                            Devolvido em: {formatarData(aluguel.devolvidoEm)} <br />
                                <div className="botoesAcoesEntidade">
                                    <button className="botaoAcaoEntidade" onClick={() => {
                                        aluguelService.prorrogarDevolucao(aluguel.id).then((response) => {
                                            console.log(response.data);
                                            location.reload();
                                        }).catch((error) => {
                                            console.log(error);
                                        })
                                    }}>Prorrogar devolução em 1 semana</button>

                                    <button className="botaoAcaoEntidade" onClick={() => {
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
                                    }}>Realizar devolução</button>
                                </div>
                            </span>
                        )
                    })}
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
            </div>
        </>
    )
}