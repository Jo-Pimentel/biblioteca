import "../css/telaCadastro.css";

export default function CadastroItem() {
    return(
        <div className="telaCadastro">
            <label>Digite o nome do item abaixo</label>
            <input type="text" id="nomeItem"/>

            <label>Digite o nome do item abaixo</label>
            <input type="text" id="nomeItem"/>

            <label>Digite a quantidade de exemplares disponíveis</label>
            <input type="number" id="qtdExemplaresDisponiveis"/>

            <label>Digite o ano de publicação do item</label>
            <input type="text" id="autorAno"/>
        </div>
    )
}