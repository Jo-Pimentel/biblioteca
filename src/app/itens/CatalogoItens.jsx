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
    let idsItensEscolhidos = [];
    let tiposItensEscolhidos = [];
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
                                if(livro.qtdExemplaresDisponiveis > 0) {
                                    const livroSelecionado = document.querySelectorAll("li")[indiceLivro];
                                    if(livroSelecionado.className != "itemSelecionado") {
                                        livroSelecionado.classList.add("itemSelecionado");
                                        idsItensEscolhidos.push(livro.id);
                                        tiposItensEscolhidos.push(livro.tipoItem);
                                    } else {
                                        livroSelecionado.classList.remove("itemSelecionado");
                                        idsItensEscolhidos.pop(livro.id);
                                        tiposItensEscolhidos.pop(livro.tipoItem);
                                    }
                                } else {
                                    alert("Livro indisponível");
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
                                if(filme.qtdExemplaresDisponiveis > 0) {
                                    const filmeSelecionado = document.querySelectorAll("li")[indiceFilme];
                                    if(filmeSelecionado.className == "itemSelecionado") {
                                        filmeSelecionado.classList.remove("itemSelecionado");
                                        idsItensEscolhidos.pop(filme.id);
                                        tiposItensEscolhidos.pop(filme.tipoItem);
                                    } else {
                                        filmeSelecionado.classList.add("itemSelecionado");
                                        idsItensEscolhidos.push(filme.id);
                                        tiposItensEscolhidos.push(filme.tipoItem);
                                    }
                                } else {
                                    alert("Filme indisponível");
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
                sessionStorage.setItem("IdsItensEscolhidos", JSON.stringify(idsItensEscolhidos));
                sessionStorage.setItem("TiposItensEscolhidos", JSON.stringify(tiposItensEscolhidos));
            }}>Alugar itens</button></Link>
        </>
    )
}