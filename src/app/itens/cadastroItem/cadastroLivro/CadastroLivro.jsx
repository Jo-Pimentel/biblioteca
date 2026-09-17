import LivroService from "../../../service/LivroService";
import "../../../css/telaCadastro.css";
import { useState } from "react";
import Link from "next/link";

export default function CadastroItem() {
    const [autor, setAutor] = useState("");
    const [editora, setEditora] = useState("");
    const [qtdPaginas, setQtdPaginas] = useState(0);
    const livroService = new LivroService;

    return(
        <div className="telaCadastro">
            <label>Digite o nome do autor abaixo</label>
            <input type="text" onInput={(evt) => {
                setAutor(evt.target.value);
            }}/>

            <label>Digite a editora do livro abaixo</label>
            <input type="text" onInput={(evt) => {
                setEditora(evt.target.value);
            }}/>

            <label>Digite a quantidade de páginas abaixo</label>
            <input type="number" onInput={(evt) => {
                setQtdPaginas(evt.target.value);
            }}/>

            <button onClick={() => {
                const novoLivro = {
                    "titulo": sessionStorage.getItem("TituloItem"),
                    "autor": autor,
                    "anoPublicacao": sessionStorage.getItem("AnoPublicacao"),
                    "editora": editora,
                    "qtdExemplaresDisponiveis": sessionStorage.getItem("QtdExemplaresDisponiveis"),
                    "qtdPaginas": qtdPaginas,
                }

                sessionStorage.clear;

                livroService.salvarLivro(novoLivro).then((response) => {
                    console.log(response.data);
                    alert("Livro cadastrado com sucesso!");
                }).catch((error) => {
                    alert("Erro ao salvar o livro no sistema " + error);
                })
            }}>Próxima etapa</button>

            <div>
                <button><Link href={'/itens/cadastroItem'}>Voltar para a tela anterior</Link></button>
                <button><Link href={'/itens'}>Voltar para o catálogo</Link></button>
            </div>
        </div>
    )
}