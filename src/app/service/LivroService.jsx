import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/biblioteca/livros"
})

export default class LivroService {
    buscarLivros() {
        return axiosInstance.get("/buscarLivros")
    }

    buscarLivroPorId(id) {
        return axiosInstance.get(`/buscarLivroPorId/${id}`)
    }

    salvarLivro(livro) {
        return axiosInstance.post("/salvarLivro", livro)
    }

    atualizarLivro(id, livro) {
        return axiosInstance.put(`/atualizarLivro/${id}`, livro)
    }

    deletarLivro(id) {
        return axiosInstance.delete(`/deletarLivro/${id}`)
    }
}