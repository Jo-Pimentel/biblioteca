import Link from "next/link";
import { useEffect, useState } from "react";
import AlunoService from "../service/AlunoService";

export default function CatalogoAlugueis() {
    const alunoService = new AlunoService;
    const [listaDeAlunos, setListaDeAlunos] = useState([]);

    useEffect(() => {
        alunoService.buscarAlunos().then((response) => {
            setListaDeAlunos(response.data);
        }).catch((error) => {
            alert("Erro ao buscar os alunos " + error);
        })
    }, []);

    return (
        <>
            <div>
                {listaDeAlunos.map((aluno) => {
                    return (
                        <li key={aluno.id}>
                            Nome: {aluno.nome} 
                            <button onClick={() => {
                                sessionStorage.setItem("IdAluno", aluno.id)
                            }}>
                                <Link href={'/alugueis/realizarAluguel'}>Realizar aluguel</Link>
                            </button>
                        </li>
                    )
                })}
            </div>
            <Link href={'/alugueis/realizarAluguel'}>Realizar novo aluguel</Link>
        </>
    )
}