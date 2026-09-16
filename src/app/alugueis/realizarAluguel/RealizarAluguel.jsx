import AluguelService from "@/app/service/AluguelService";
import { useEffect, useState } from "react";

export default function RealizarAluguel() {
    const [codigoItem, setCodigoItem] = useState("");
    const aluguelService = new AluguelService;

    return (
        <div className="telaCadastro">
            <label>Digite o código do item abaixo</label>
            <input type="text" onInput={(evt) => {
                setCodigoItem(evt.target.value);
            }}/>

            <button onClick={() => {
                const aluguelDto = {
                    "id": sessionStorage.getItem("IdAluno"),
                    "codigoItem": codigoItem
                };

                aluguelService.realizarAluguel(aluguelDto).then((response) => {
                    console.log(response.data);
                }).catch((error) => {
                    console.log(error);
                }) 
            }}>Realizar aluguel</button>
        </div>
    )
}