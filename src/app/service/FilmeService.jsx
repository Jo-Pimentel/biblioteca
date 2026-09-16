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

    salvarFilme(filme) {
        return axiosInstance.post("/salvarFilme", filme)
    }

    atualizarFilme(id, filme) {
        return axiosInstance.put(`/atualizarFilme/${id}`, filme)
    }

    deletarFilme(id) {
        return axiosInstance.delete(`/deletarFilme/${id}`)
    }
}