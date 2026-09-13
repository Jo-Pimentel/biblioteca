import "../css/telaCadastro.css";
import { useState } from "react";
import CadastroFilme from "./CadastroFilme";
import CadastroLivro from "./CadastroLivro";

export default function CadastroItem() {
    const [tituloItem, setTituloItem] = useState("");
    const [qtdExemplaresDisponivies, setQtdExemplaresDisponiveis] = useState(0);
    const [anoPublicacao, setAnoPublicacao] = useState(0);
    const [tipoItem, setTipoItem] = useState("livro");
    const [proximaPagina, setProximaPagina] = useState();

    return(
        <div className="telaCadastro">
            <label>Digite o nome do item abaixo</label>
            <input type="text" id="nomeItem" onInput={(evt) => {
                setTituloItem(evt.target.value);
            }}/>

            <label>Digite a quantidade de exemplares disponíveis</label>
            <input type="number" id="qtdExemplaresDisponiveis" onInput={(evt) => {
                setQtdExemplaresDisponiveis(evt.target.value);
            }}/>

            <label>Digite o ano de publicação do item</label>
            <input type="text" id="anoDePublicacao" onInput={(evt) => {
                setAnoPublicacao(evt.target.value);
            }}/>

            <select onChange={(evt) => {
                setTipoItem(evt.target.value)
            }}>
                <option value="livro">Livro</option>
                <option value="filme">Filme</option>
            </select>

            <button onClick={() => {
                sessionStorage.setItem("TituloItem", tituloItem)
                sessionStorage.setItem("QtdExemplaresDisponiveis", qtdExemplaresDisponivies)
                sessionStorage.setItem("AnoPublicacao", anoPublicacao)

                if(tipoItem == "livro") {
                    setProximaPagina(<CadastroLivro></CadastroLivro>)
                } else {
                    setProximaPagina(<CadastroFilme></CadastroFilme>)
                }
            }}>Próxima etapa</button>

            <div>
                {proximaPagina}
            </div>
        </div>
    )
}