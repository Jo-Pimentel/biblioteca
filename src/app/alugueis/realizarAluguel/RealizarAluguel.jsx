import AluguelService from "@/app/service/AluguelService";
import { useEffect, useState } from "react";

export default function RealizarAluguel() {
    const [cpfAluno, setCpfAluno] = useState("");
    const aluguelService = new AluguelService;

    return (
        <div className="telaCadastro">
            <label>Digite o CPF do aluno abaixo</label>
            <input type="text" onInput={(evt) => {
                setCpfAluno(evt.target.value);
            }}/>

            <button onClick={() => {
                const aluguelDto = {
                    "cpfAluno": cpfAluno,
                    "idItem": sessionStorage.getItem("IdItem"),
                    "tipoItem": sessionStorage.getItem("TipoItem")
                };

                sessionStorage.clear();

                aluguelService.realizarAluguel(aluguelDto).then((response) => {
                    console.log(response.data);
                }).catch((error) => {
                    console.log(error);
                }) 
            }}>Realizar aluguel</button>
        </div>
    )
}