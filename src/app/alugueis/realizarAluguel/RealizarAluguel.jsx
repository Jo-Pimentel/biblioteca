import AluguelService from "@/app/service/AluguelService";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function RealizarAluguel() {
    const [cpfAluno, setCpfAluno] = useState("");
    const [qtdMesesAluguel, setQtdMesesAluguel] = useState(0);
    const aluguelService = new AluguelService;

    return (
        <>
            <div className="telaCadastro">
                <label>Digite o CPF do aluno abaixo</label>
                <input type="text" onInput={(evt) => {
                    setCpfAluno(evt.target.value);
                }}/>

                <label>Digite a quantidade de meses do aluguel</label>
                <input type="number" onInput={(evt) => {
                    setQtdMesesAluguel(evt.target.value);
                }}/>

                <button onClick={() => {
                    const aluguelDto = {
                        "cpfAluno": cpfAluno,
                        "idsItens": JSON.parse(sessionStorage.getItem("IdsItensEscolhidos")),
                        "tiposItens": JSON.parse(sessionStorage.getItem("TiposItensEscolhidos")),
                        "qtdMesesAluguel": qtdMesesAluguel
                    };

                    console.log(aluguelDto);

                    sessionStorage.clear();

                    aluguelService.realizarAluguel(aluguelDto).then((response) => {
                        console.log(response.data);
                    }).catch((error) => {
                        console.log(error);
                    }) 
                }}>Realizar aluguel</button>
                <Link href={'/alugueis'}><button>Ir para o catálogo de aluguéis</button></Link>
                <Link href={'/itens'}><button>Ir para o catálogo de itens</button></Link>
            </div>
        </>
    )
}