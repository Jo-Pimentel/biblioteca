import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/biblioteca/alunos"
})

export default class AlunoService {
    buscarAlunos() {
        return axiosInstance.get("/buscarAlunos");
    }

    buscarAlunoPorId(id) {
        return axiosInstance.get(`/buscarAlunoPorId/${id}`);
    }

    buscarAlunosPorPagina(informacoesPagina) {
        return axiosInstance.get(`/buscarAlunosPorPagina?page=${informacoesPagina.page}&size=${informacoesPagina.size}&sort=${informacoesPagina.sort},asc`);
    }

    salvarAluno(aluno) {
        return axiosInstance.post("/salvarAluno", aluno);
    }

    atualizarAluno(id, aluno) {
        return axiosInstance.put(`/atualizarAluno/${id}`, aluno)
    }

    atualizarAlunoPorCpf(cpf, alunoAtualizado) {
        return axiosInstance.put(`atualizarAlunoPorCpf/${cpf}`, alunoAtualizado)
    }

    deletarAluno(id) {
        return axiosInstance.delete(`/deletarAluno/${id}`)
    }
}