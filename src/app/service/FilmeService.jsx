import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/biblioteca/filmes"
})

export default class FilmeService {
    buscarFilmes() {
        return axiosInstance.get("/buscarFilmes")
    }

    buscarFilmePorId(id) {
        return axiosInstance.get(`/buscarFilmePorId/${id}`)
    }

    salvarFilme(livro) {
        return axiosInstance.post("/salvarFilme", livro)
    }

    atualizarFilme(id, livro) {
        return axiosInstance.put(`/atualizarFilme/${id}`, livro)
    }

    deletarFilme(id) {
        return axiosInstance.delete(`/deletarFilme/${id}`)
    }
}