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

    buscarFilmesPorPagina(page) {
        return axiosInstance.get(`/buscarFilmesPorPagina?${page.page}=0&${page.size}=3&${page.sort}=id,asc`)
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