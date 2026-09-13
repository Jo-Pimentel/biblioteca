import "../css/telaCadastro.css";
import { useState } from "react";

export default function CadastroItem() {
    const [diretor, setDiretor] = useState("");
    const [duracaoEmMinutos, setDuracaoEmMinutos] = useState(0);

    return(
        <div className="telaCadastro">
            <label>Digite o nome do diretor abaixo</label>
            <input type="text" id="nomeItem" onInput={(evt) => {
                setDiretor(evt.target.value);
            }}/>

            <label>Digite a duração em minutos do filme</label>
            <input type="number" id="qtdExemplaresDisponiveis" onInput={(evt) => {
                setDuracaoEmMinutos(evt.target.value);
            }}/>

            <button onClick={() => {
                sessionStorage.setItem("TituloItem", tituloItem)
                sessionStorage.setItem("QtdExemplaresDisponiveis", qtdExemplaresDisponivies)
                sessionStorage.setItem("AnoPublicacao", anoPublicacao)
            }}>Próxima etapa</button>
        </div>
    )
}