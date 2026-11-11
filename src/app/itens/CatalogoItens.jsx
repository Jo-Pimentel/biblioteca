import Link from "next/link";
import LivroService from "../service/LivroService";
import FilmeService from "../service/FilmeService";
import { useEffect, useState } from "react";
import "../css/telaCadastro.css";
import "../css/catalogo.css";
import ItemService from "../service/ItemService";

export default function CatalogoItens() {
    const livroService = new LivroService;
    const filmeService = new FilmeService;
    const itemService = new ItemService;
    const [paginaAtualLivros, setPaginaAtualLivros] = useState(0);
    const [paginaAtualFilmes, setPaginaAtualFilmes] = useState(0);
    const [paginaAtual, setPaginaAtual] = useState(0);
    const [dadosPaginaLivros, setDadosPaginaLivros] = useState({});
    const [dadosPaginaFilmes, setDadosPaginaFilmes] = useState({});
    const [dadosPaginaAmbos, setDadosPaginaAmbos] = useState({});
    const [dadosPagina, setDadosPagina] = useState({});
    const [listaDeItens, setListaDeItens] = useState([]);
    const [dadosPaginaExibida, setDadosPaginaExibida] = useState({});
    let idsItensEscolhidos = [];
    let tiposItensEscolhidos = [];
    let index = 0;

    useEffect(() => {
        livroService.buscarLivrosPorPagina({"page": paginaAtualLivros, "size": 3, "sort": "id"}).then((response) => {
            setDadosPaginaLivros(response.data);
        }).catch((error) => {
            console.log("Erro ao buscar os registros dos livros. " + error);
        });
    }, [paginaAtualLivros]);

    useEffect(() => {
        filmeService.buscarFilmesPorPagina({"page": paginaAtualFilmes, "size": 3, "sort": "id"}).then((response) => {
            setDadosPaginaFilmes(response.data);
        }).catch((error) => {
            console.log("Erro ao buscar os registros dos filmes. " + error);
        });
    }, [paginaAtualFilmes]);

    useEffect(() => {
        itemService.buscarItens({"page": paginaAtualFilmes, "size": 3, "sort": "id"}).then((response) => {
            setDadosPagina(response.data);
            setDadosPaginaAmbos(response.data);
            setListaDeItens(response.data.content);
        }).catch((error) => {
            console.log("Erro ao buscar os registros dos filmes. " + error);
        });
    }, [paginaAtualFilmes]);

    const arrayPaginas = Array.from({length: dadosPagina?.totalPages}, (_, index) => index)

    return (
        <>
            <header>
                <h1 className="tituloCatalogo">Catálogo de itens</h1>
            </header>

            <label htmlFor="">Ver: </label>
            <select onChange={(evt) => {
                setPaginaAtual(0);
                if(evt.target.value == "livros") {
                    setDadosPagina(dadosPaginaLivros);
                } else if(evt.target.value == "filmes") {
                    setDadosPagina(dadosPaginaFilmes);
                } else {
                    setDadosPagina(dadosPaginaAmbos);
                }
            }}>
                <option disabled>Escolha os itens exibidos</option>
                <option value="livros">Apenas livros</option>
                <option value="filmes">Apenas filmes</option>
                <option value="ambos">Ambos</option>
            </select>

            {/* <ol>
                {dadosPagina?.content?.map((item) => {
                    return (
                        <span className="entidadeRetornada">
                            <li key={item.id}>Título: {item.titulo} <hr /> Exemplares disponíveis: {item.qtdExemplaresDisponiveis}</li>
                        </span>
                    )
                })}
            </ol> */}

            <div className="entidadesRetornadas">
                {dadosPagina?.content?.map((item) => {
                    return (
                        <span className="entidadeRetornadaItem" key={item.id}>
                            <img className="imgItem" src={item.urlImgItem} alt="" />
                            <span className="tituloItem">{item.titulo}</span>
                        </span>
                    ) // Na-na-não aguentam nada,
                })}
            </div>

            {/* <p>Livros</p>

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
            </ol> */}

            {/* <div className="container">
                <Link href={'/itens/cadastroItem'}><button>Cadastrar novo item</button></Link>
                <Link href={'/'}><button>Voltar para a página inicial</button></Link>
                <Link href={'/alugueis'}><button>Ir para aluguéis</button></Link>
                <Link href={'/alugueis/realizarAluguel'}><button onClick={() => {
                    sessionStorage.setItem("IdsItensEscolhidos", JSON.stringify(idsItensEscolhidos));
                    sessionStorage.setItem("TiposItensEscolhidos", JSON.stringify(tiposItensEscolhidos));
                }}>Alugar itens</button></Link>
            </div> */}
        </>
    )
}