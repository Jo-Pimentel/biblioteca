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

    // useEffect(() => {
    //     aluguelService.buscarAlugueis().then((response) => {
    //         setListaDeAlugueis(response.data);
    //     }).catch((error) => {
    //         alert("Erro ao buscar os aluguéis " + error);
    //     })
    // }, []);

    return (
        <>
            <div>
                {listaDeAlunos.map((aluno) => {
                    return (
                        <li key={aluno.id}>
                            Nome: {aluno.nome} 
                            <Link href={'/alugueis/realizarAluguel'}>
                                <button onClick={() => {
                                    sessionStorage.setItem("IdAluno", aluno.id);
                                }}>
                                    Realizar aluguel
                                </button> <br />
                            </Link>
                        </li>
                    )
                })}
            </div>
            <Link href={'/alugueis/realizarAluguel'}>Realizar novo aluguel</Link> <hr />

            {/* <div>
                <ol>
                    {listaDeAlugueis.map((aluguel) => {
                        return (
                            <li key={aluguel.id}>Aluno: {aluguel.aluno.nome} | Item: {aluguel.item.titulo} | Data de devolução: {aluguel.dataDevolucao}</li>
                        )
                    })}
                </ol>
            </div> */}
        </>
    )
}