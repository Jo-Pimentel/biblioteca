import FilmeService from "@/app/service/FilmeService";
import "../../../css/telaCadastro.css";
import Link from "next/link";
import { useState } from "react";

export default function CadastroItem() {
    const [diretor, setDiretor] = useState("");
    const [duracaoEmMinutos, setDuracaoEmMinutos] = useState(0);
    const filmeService = new FilmeService;

    return(
        <div className="telaCadastro">
            <label>Digite o nome do diretor abaixo</label>
            <input type="text" onInput={(evt) => {
                setDiretor(evt.target.value);
            }}/>

            <label>Digite a duração em minutos do filme</label>
            <input type="number" onInput={(evt) => {
                setDuracaoEmMinutos(evt.target.value);
            }}/>

            <button onClick={() => {
                console.log(sessionStorage.getItem("TituloItem"));

                const novoFilme = {
                    "titulo": sessionStorage.getItem("TituloItem"),
                    "diretor": diretor,
                    "anoPublicacao": sessionStorage.getItem("AnoPublicacao"),
                    "duracaoEmMinutos": duracaoEmMinutos,
                    "qtdExemplaresDisponiveis": sessionStorage.getItem("QtdExemplaresDisponiveis"),
                };

                //sessionStorage.clear;

                filmeService.salvarFilme(novoFilme).then((response) => {
                    console.log(response.data);
                    alert("Filme cadastrado com sucesso.");
                }).catch((error) => {
                    console.log(error);
                })
            }}>Próxima etapa</button>

            <div>
                <Link href={'/itens/cadastroItem'}><button>Voltar para a tela anterior</button></Link>
                <Link href={'/itens'}><button>Voltar para o catálogo</button></Link>
            </div>
        </div>
    )
}