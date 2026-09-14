import "../../../css/telaCadastro.css";
import Link from "next/link";
import { useState } from "react";

export default function CadastroItem() {
    const [diretor, setDiretor] = useState("");
    const [duracaoEmMinutos, setDuracaoEmMinutos] = useState(0);

    return(
        <div className="telaCadastro">
            <label>Digite o nome do diretor abaixo</label>
            <input type="text" onInput={(evt) => {
                setDiretor(evt.target.value);
            }}/>

            <label>Digite a duração em minutos do filme</label>
            <input type="number" onInput={(evt) => {
                setDuracaoEmMinutos(evt.target.value);
            }}/>

            <button onClick={() => {
                sessionStorage.setItem("TituloItem", tituloItem)
                sessionStorage.setItem("QtdExemplaresDisponiveis", qtdExemplaresDisponivies)
                sessionStorage.setItem("AnoPublicacao", anoPublicacao)
            }}>Próxima etapa</button>

            <div>
                <button><Link href={'/itens/cadastroItem'}>Voltar para a tela anterior</Link></button>
                <button><Link href={'/itens'}>Voltar para o catálogo</Link></button>
            </div>
        </div>
    )
}