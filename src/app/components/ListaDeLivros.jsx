const livrosDisponiveis = [
    {id: 1, nome: "A divina comédia"},
    {id: 2, nome: "Meu pé de laranja lima"},
    {id: 3, nome: "Vidas secas"}
]

export default function ListaDeFilmes() {
    const listaLivros = livrosDisponiveis.map(livro =>
        <li key={livro.id}>{livro.nome}</li>
    );
    return (
        <div>
            {listaLivros}
        </div>
    )
}