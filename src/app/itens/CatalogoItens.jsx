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
    let itensEscolhidos = [];
    let index = 0;

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
                        let indiceLivro = index;
                        if(index == listaLivros.length) {
                            index = 0;
                        } else {
                            index += 1;
                        }
                        return (
                            <li key={livro.id} onClick={(evt) => {
                                const livroSelecionado = document.querySelectorAll("li")[indiceLivro];
                                if(livroSelecionado.className == "itemSelecionado") {
                                    livroSelecionado.classList.remove("itemSelecionado");
                                    itensEscolhidos.pop(livro);
                                    console.log(itensEscolhidos)
                                } else {
                                    livroSelecionado.classList.add("itemSelecionado");
                                    itensEscolhidos.push(livro);
                                    console.log(itensEscolhidos);
                                }
                            }}>
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
                        let indiceFilme = index;
                        index += 1;
                        return (
                            <li key={filme.id} onClick={() => {
                                const filmeSelecionado = document.querySelectorAll("li")[indiceFilme];
                                if(filmeSelecionado.className == "itemSelecionado") {
                                    filmeSelecionado.classList.remove("itemSelecionado");
                                    itensEscolhidos.pop(filme);
                                    console.log(itensEscolhidos)
                                } else {
                                    filmeSelecionado.classList.add("itemSelecionado");
                                    itensEscolhidos.push(filme);
                                    console.log(itensEscolhidos);
                                }
                            }}>
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

                                <Link href={'/itens/atualizarItem'}><button>Atualizar informações do filme</button></Link> <br />
                                <Link href={'/alugueis/realizarAluguel'}><button onClick={() => {
                                    sessionStorage.setItem("IdItem", filme.id);
                                    sessionStorage.setItem("TipoItem", filme.tipoItem);
                                }}>Alugar filme</button></Link> <br />
                            </li>
                        )
                    })
                }
            </ol>

            <Link href={'/itens/cadastroItem'}><button>Cadastrar novo item</button></Link>
            <Link href={'/'}><button>Voltar para a página inicial</button></Link>
            <Link href={'/alugueis'}><button>Ir para aluguéis</button></Link>
            <Link href={'/alugueis/realizarAluguel'}><button onClick={() => {
                let stringItensEscolhidos = JSON.stringify(itensEscolhidos);
                sessionStorage.setItem("ItensEscolhidos", stringItensEscolhidos);
            }}>Alugar itens</button></Link>
        </>
    )
}