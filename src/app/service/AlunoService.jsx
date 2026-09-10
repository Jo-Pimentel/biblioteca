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

    salvarAluno(aluno) {
        return axiosInstance.post("/salvarAluno");
    }

    atualizarAluno(id, aluno) {
        return axiosInstance.put(`/atualizarAluno/${id}`)
    }

    deletarAluno(id) {
        return axiosInstance.delete(`/deletarAluno/${id}`)
    }
}