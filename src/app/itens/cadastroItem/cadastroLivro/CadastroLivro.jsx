import LivroService from "@/app/service/LivroService";
import "../../../css/telaCadastro.css";
import { useState } from "react";

export default function CadastroItem() {
    const [autor, setAutor] = useState("");
    const [editora, setEditora] = useState("");
    const [qtdPaginas, setQtdPaginas] = useState(0);
    const livroService = new LivroService;

    return(
        <div className="telaCadastro">
            <label>Digite o nome do autor abaixo</label>
            <input type="text" id="nomeItem" onInput={(evt) => {
                setAutor(evt.target.value);
            }}/>

            <label>Digite a editora do livro abaixo</label>
            <input type="text" id="qtdExemplaresDisponiveis" onInput={(evt) => {
                setEditora(evt.target.value);
            }}/>

            <label>Digite a quantidade de páginas abaixo</label>
            <input type="number" id="anoDePublicacao" onInput={(evt) => {
                setQtdPaginas(evt.target.value);
            }}/>

            <button onClick={() => {
                const novoLivro = {
                    "titulo": sessionStorage.getItem("TituloItem"),
                    "autor": autor,
                    "anoPublicacao": sessionStorage.getItem("AnoPublicacao"),
                    "editora": editora,
                    "qtdExemplaresDisponiveis": sessionStorage.getItem("QtdExemplaresDisponiveis"),
                    "qtdPaginas": qtdPaginas
                }

                livroService.salvarLivro(novoLivro).then((response) => {
                    console.log(response.data);
                }).catch((error) => {
                    alert("Erro ao salvar o livro no sistema " + error);
                })
            }}>Próxima etapa</button>
        </div>
    )
}