"use client";
import Image from "next/image";
import React from "react";
import { useState } from 'react';
import CadastroAluno from "./alunos/cadastroAluno/CadastroAluno.jsx";
import CadastroItem from "./itens/cadastroItem/CadastroItem.jsx";
import CatalogoItens from "./itens/CatalogoItens.jsx";
import CatalogoAlunos from "./alunos/CatalogoAlunos.jsx";
//import AtualizarAluno from "./alunos/AtualizarAluno.jsx";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Link from 'next/link';

export default function App() {
  return (
    <>
      <Link href={'/alunos'}>Alunos</Link>
      <Link href={'/itens'}>Itens</Link>
    </>
  );
}
