const filmesDisponivies = [
    {id: 1, nome: "Cidade de Deus"},
    {id: 2, nome: "Lisbela e o prisioneiro"},
    {id: 3, nome: "A nova onda do imperador"}
]

export default function ListaDeFilmes() {
    const listaFilmes = filmesDisponivies.map(filme =>
        <li key={filme.id}>{filme.nome}</li>
    );
    return (
        <ul>
            {listaFilmes}
        </ul>
    )
}