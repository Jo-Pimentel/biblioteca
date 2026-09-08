import { useState } from 'react';

export default function UseStateTeste() {
    const [contador, setContador] = useState(0);
    const [cliquesTotais, setCliquesTotais] = useState(0);
    const [escolha, setEscolha] = useState("Elinarki");
    const [fruta, setFruta] = useState("");

    const mudarEscolha = (evt) => {
        setEscolha(evt.target.value);
    }

    return (
        <div>
            <button onClick={() => {
                setContador(contador + 1)
                setCliquesTotais(cliquesTotais + 1)
            }}>
                Incrementar contador
            </button>

            <button onClick={() => {if(contador > 0){
                setContador(contador - 1)
                setCliquesTotais(cliquesTotais + 1)
            }}}>
                Decrementar contador
            </button>

            <select onChange={mudarEscolha}>
                <option disabled>Escolha uma das opções abaixo</option>
                <option value="Felipe Nego">Felipe</option>
                <option value="Elinazi">Elinarki</option>
                <option value="Luquinhas the Big">Luquinhas</option>
                <option value="Alenin o trovador">Alexandre</option>
            </select>

            <select onChange={(evt) => {
                setFruta(evt.target.value)
            }}>
                <option disabled>Qual fruta você quer?</option>
                <option value="Pera">Pêra</option>
                <option value="Uva">Uva</option>
                <option value="Maçã">Maçã</option>
                <option value="Salada-Mista">Salada-Mista</option>
            </select>

            <h1>Contador: {contador}</h1>
            <h1>Quantidade de cliques totais: {cliquesTotais}</h1>
            <h1>Escolha: {escolha}</h1>
            <h1>Fruta escolhida: {fruta}</h1>
        </div>
    )
}