import AluguelService from "@/app/service/AluguelService";
import { useEffect, useState } from "react";

export default function RealizarAluguel() {
    const [cpfAluno, setCpfAluno] = useState("");
    const [codigoItem, setCodigoItem] = useState("");
    const aluguelService = new AluguelService;

    return (
        <div className="telaCadastro">
            <label>Digite o CPF do aluno abaixo</label>
            <input type="text" onInput={(evt) => {
                setCpfAluno(evt.target.value);
            }}/>

            <label>Digite o código do item abaixo</label>
            <input type="text" onInput={(evt) => {
                setCodigoItem(evt.target.value);
            }}/>

            <button onClick={() => {
                useEffect(() => {
                    aluguelService.realizarAluguel
                }, [])
            }}>Realizar aluguel</button>
        </div>
    )
}