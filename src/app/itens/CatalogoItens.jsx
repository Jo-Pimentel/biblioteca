import Link from "next/link";
import LivroService from "../service/LivroService";
import FilmeService from "../service/FilmeService";
import { useEffect, useState } from "react";
import "../css/telaCadastro.css";

export default function CatalogoItens() {
    const livroService = new LivroService;
    const filmeService = new FilmeService;
    const [listaLivros, setListaLivros] = useState([]);
    const [listaFilmes, setListaFilmes] = useState([]);

    useEffect(() => {
        livroService.buscarLivros().then((response) => {
            setListaLivros(response.data);
        }).catch((error) => {
            console.log("Erro ao buscar os registros dos livros. " + error);
        });
    }, []);

    useEffect(() => {
        filmeService.buscarFilmes().then((response) => {
            setListaFilmes(response.data);
        }).catch((error) => {
            console.log("Erro ao buscar os registros dos filmes. " + error);
        });
    }, []);

    return (
        <>
            <h1>Catálogo de itens</h1>

            <p>Livros</p>

            <ol>
                {
                    listaLivros.map((livro) => {
                        return (
                            <li key={livro.id}>
                                {livro.titulo} | Cópias disponíveis: {livro.qtdExemplaresDisponiveis} | Código: {livro.codigoItem}

                                <button onClick={() => {
                                    const confirmarApagamento = confirm("Deseja realmente deletar este livro do sistema?");

                                    if(confirmarApagamento) {
                                        livroService.deletarLivro(livro.id).then((response) => {
                                            alert("Livro deletado com sucesso");
                                            location.reload();
                                        }).catch((error) => {
                                            console.log(error);
                                        })
                                    }
                                }}>Deletar livro do sistema</button>

                                <Link href={'/atualizarItem'}><button>Atualizar informações do livro</button></Link><br />
                                <Link href={'/alugueis/realizarAluguel'}><button onClick={() => {
                                    sessionStorage.setItem("IdItem", livro.id);
                                    sessionStorage.setItem("TipoItem", livro.tipoItem);
                                }}>Alugar livro</button></Link> <br />
                            </li>
                        )
                    })
                }
            </ol>

            <p>Filmes</p>

            <ol>
                {
                    listaFilmes.map((filme) => {
                        return (
                            <li key={filme.id}>
                                {filme.titulo} | Cópias disponíveis: {filme.qtdExemplaresDisponiveis} | Código: {filme.codigoItem}

                                <button onClick={() => {
                                    const confirmarApagamento = confirm("Deseja realmente deletar este livro do sistema?");

                                    if(confirmarApagamento) {
                                        filmeService.deletarFilme(filme.id).then((response) => {
                                            alert("Filme apagado com sucesso.");
                                            location.reload();
                                        }).catch((error) => {
                                            console.log(error);
                                        })
                                    }
                                }}>Deletar filme do sistema</button>

                                <Link href={'/atualizarItem'}><button>Atualizar informações do filme</button></Link> <br />
                                <Link href={'/alugueis/realizarAluguel'}><button onClick={() => {
                                    sessionStorage.setItem("IdItem", filme.id);
                                    sessionStorage.setItem("TipoItem", filme.tipoItem);
                                }}>Alugar filme</button></Link> <br />
                            </li>
                        )
                    })
                }
            </ol>

            <button><Link href={'/itens/cadastroItem'}>Cadastrar novo item</Link></button>
            <button><Link href={'/'}>Voltar para a página inicial</Link></button>
        </>
    )
}