//import { useEffect, useState } from "react";
import axios from "axios";
import AlunoService from "../service/AlunoService.jsx";
import { useEffect } from "react";
import { useState } from "react";


export default function BuscarAlunos() {
    const [listaDeAlunos, setListaDeAlunos] = useState([]);
    const [nomeAluno, setNomeAluno] = useState("");
    const alunoService = new AlunoService;
    console.log("renderizou");

    // Buscar todos os alunos
    useEffect(() => {
        alunoService.buscarAlunos().then((response) => {
            setListaDeAlunos(response.data);
        }).catch((error) => {
            console.log("Erro ao buscar os registros dos alunos. " + error);
        });
    }, []);

    // Buscar aluno por ID
    useEffect(() => {
        alunoService.buscarAlunoPorId(1).then((response) => {
            setNomeAluno(response.data);
        }).catch((error) => {
            console.log("Erro ao buscar o aluno com o ID fornecido. " + error);
        })
    }, [])

    return (
        <div>
            <h1>Alunos cadastrados</h1>
            <ol>
                {listaDeAlunos.map((aluno) => {
                    return(
                    <li key={aluno.id}>Nome: {aluno.nome} CPF: {aluno.cpf}</li>)
                })}
            </ol>
        </div>
        
    )
}