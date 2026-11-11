import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/biblioteca/itens"
})

export default class ItemService {
    buscarItens(pageable) {
        return axiosInstance.get(`/buscarItens?${pageable.page}=0&${pageable.size}=3&${pageable.sort}=id,asc`);
    }

    buscarLivors(pageable) {
        return axiosInstance.get(`/buscarLivros?${pageable.page}=0&${pageable.size}=3&${pageable.sort}=id,asc`);
    }

    buscarFilmes(pageable) {
        return axiosInstance.get(`/buscarFilmes?${pageable.page}=0&${pageable.size}=3&${pageable.sort}=id,asc`);
    }
}