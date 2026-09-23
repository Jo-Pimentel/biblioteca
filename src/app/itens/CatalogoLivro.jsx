export default function CatalogoLivro() {
    return (
        <div>
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
        </div>
    )
}