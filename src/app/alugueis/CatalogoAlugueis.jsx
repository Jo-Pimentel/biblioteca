import Link from "next/link";
import { useEffect, useState } from "react";
import AlunoService from "../service/AlunoService";
import AluguelService from "../service/AluguelService";

export default function CatalogoAlugueis() {
    const alunoService = new AlunoService;
    const aluguelService = new AluguelService;
    const [listaDeAlunos, setListaDeAlunos] = useState([]);
    const [listaDeAlugueis, setListaDeAlugueis] = useState([]);

    useEffect(() => {
        alunoService.buscarAlunos().then((response) => {
            setListaDeAlunos(response.data);
        }).catch((error) => {
            alert("Erro ao buscar os alunos " + error);
        })
    }, []);

    useEffect(() => {
        aluguelService.buscarAlugueis().then((response) => {
            setListaDeAlugueis(response.data);
        }).catch((error) => {
            alert("Erro ao buscar os aluguéis " + error);
        })
    }, []);

    return (
        <>
            <h1>Aluguéis</h1> <br />
            <div>
                <ol>
                    {listaDeAlugueis.map((aluguel) => {
                        return (
                            <li key={aluguel.id}>Aluno: {aluguel.aluno.nome} <br />Item: {aluguel.item.titulo} <br />Data de devolução: {aluguel.dataDevolucao} <br />
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
                                    const confirmarDevolucao = confirm("Deseja realmente realizar a devolução de " + aluguel.item.titulo + "?");

                                    if(confirmarDevolucao) {
                                        aluguelService.devolucao(aluguel.id).then(() => {
                                            alert(aluguel.item.titulo + " devolvido com sucesso.");
                                            location.reload();
                                        }).catch((error) => {
                                            alert("Erro ao devolver o item");
                                            console.log(error);
                                        })
                                    }
                                }}>Realizar devolução</button> <br /><hr /><br />
                            </li>
                        )
                    })}
                </ol>
            </div>
            
            <Link href={'/'}><button>Voltar para a tela inicial</button></Link>
        </>
    )
}