import "../css/telaCadastro.css";
import { useState } from "react";

export default function CadastroItem() {
    const [autor, setAutor] = useState("");
    const [editora, setEditora] = useState("");
    const [qtdPaginas, setQtdPaginas] = useState(0);

    return(
        <div className="telaCadastro">
            <label>Digite o nome do autor abaixo</label>
            <input type="text" id="nomeItem" onInput={(evt) => {
                setAutor(evt.target.value);
            }}/>

            <label>Digite a editora do livro abaixo</label>
            <input type="number" id="qtdExemplaresDisponiveis" onInput={(evt) => {
                setEditora(evt.target.value);
            }}/>

            <label>Digite a quantidade de páginas abaixo</label>
            <input type="text" id="anoDePublicacao" onInput={(evt) => {
                setQtdPaginas(evt.target.value);
            }}/>

            <button onClick={() => {
                sessionStorage.setItem("TituloItem", tituloItem)
                sessionStorage.setItem("QtdExemplaresDisponiveis", qtdExemplaresDisponivies)
                sessionStorage.setItem("AnoPublicacao", anoPublicacao)
            }}>Próxima etapa</button>
        </div>
    )
}