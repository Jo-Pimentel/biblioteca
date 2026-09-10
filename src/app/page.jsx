"use client";
import Image from "next/image";
import React from "react";
import { useState } from 'react';
import CadastroAluno from "./components/CadastroAluno.jsx";
import CadastroItem from "./components/CadastroItem.jsx";
import CatalogoItens from "./components/CatalogoItens.jsx";
//import LoginAluno from "./components/LoginAluno.jsx";
import BuscarAlunos from "./components/BuscarAlunos.jsx";

export default function Home() {
  return (
    <>
      <BuscarAlunos/>
    </>
  );
}
