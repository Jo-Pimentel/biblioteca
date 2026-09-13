import { Link, BrowserRouter, Routes, Route } from 'react-router-dom';
import CatalogoAlunos from '../alunos/CatalogoAlunos.jsx';
import CatalogoItens from './CatalogoItens.jsx';

export default function Home() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/alunos' element={<CatalogoAlunos/>}>Alunos</Route>
                    <Route path='/itens' element={<CatalogoItens/>}>Itens</Route>
                    {/* <Route path='/alunos' element={<CatalogoAlunos/>}>Aluguéis</Route> */}
                </Routes>
            </BrowserRouter>

            <Link to={"/alunos"}>Alunos</Link>
            <Link to={"/itens"}>Itens</Link>
        </div>
    )
}