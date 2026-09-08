import ListaDeLivros from "./ListaDeLivros.jsx";
import ListaDeFilmes from "./ListaDeFilmes.jsx";
import { useState } from 'react';

export default function ListaDeItens() {
    //let lista = <ListaDeLivros></ListaDeLivros>
    const [lista, setLista] = useState('');

    function alternarLista(evt) {
        // if(lista == <ListaDeLivros></ListaDeLivros>) {
        //     lista = <ListaDeFilmes></ListaDeFilmes>
        // } else {
        //     lista = <ListaDeLivros></ListaDeLivros>
        // }
        setLista(evt.target.value)
    }
    return (
        <>
            <select id="" value={lista} onChange={alternarLista}>
                <option value={<ListaDeLivros/>}>Lista de livros</option>
                <option value={<ListaDeFilmes/>}>Lista de filmes</option>
            </select>
            <div>
                {lista}
            </div>
        </>
    )
}