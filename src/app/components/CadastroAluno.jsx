import "../css/telaCadastro.css";
import { useState } from "react";
import { useEffect } from "react";

export default function CadastroAluno() {
    const [mensagem, setMensagem] = useState("");
    const [nomeAluno, setNomeAluno] = useState("");
    const [cpfAluno, setCpfAluno] = useState("");
    const [aluno, setAluno] = useState("");
    
    //const [listaDeAlunos, setListaDeAlunos] = useState([]);

    // function cadastrarAluno() {
    //     if(!nomeAluno.trim() || !cpfAluno.trim()) {
    //         setMensagem("Erro! Algum dos campos não foi informado.");
    //     } else {
    //         const novoAluno = {
    //             "nomeAluno": nomeAluno,
    //             "cpf": cpfAluno
    //         }
            
            
    //     }
    //     useEffect(() => {
    //         alunoService.salvarAluno(novoAluno).then((response) => {
    //             console.log(aluno);
    //         }).catch((error) => {
    //             console.log("Erro ao cadastrar o aluno. " + error);
    //         })
    //     });
    // }

    return (
        <div className="screen">
            <div className="telaCadastro">
                <label>Digite o nome do aluno abaixo</label>
                <input type="text" id="nomeAluno" onInput={(evt) => {
                    setNomeAluno(evt.target.value);
                    console.log(nomeAluno);
                }}/>

                <label>Digite o CPF do aluno abaixo</label>
                <input type="text" id="cpfAluno" onInput={(evt) => {
                    setCpfAluno(evt.target.value);
                    console.log(cpfAluno);
                }}/>

                <input type="button" value="Cadastrar aluno" onInput={() => {
                    useEffect(() => {
                        alunoService.salvarAluno(novoAluno).then((response) => {
                            console.log(response.data);
                        }).catch((error) => {
                            console.log("Erro ao cadastrar o aluno. " + error);
                        })
                    });
                }}/>

                <h1>{mensagem}</h1>
            </div>
        </div>
    )
}