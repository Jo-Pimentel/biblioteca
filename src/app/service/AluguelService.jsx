import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/biblioteca/alugueis"
})

export default class AluguelService {
    buscarAlugueis() {
        return axiosInstance.get("/buscarAlugueis");
    }

    realizarAluguel(aluguelDto) {
        return axiosInstance.post("/realizarAluguel", aluguelDto);
    }

    prorrogarDevolucao(id) {
        return axiosInstance.put(`/prorrogarDevolucao/${id}`);
    }

    devolucao(id) {
        return axiosInstance.put(`/devolucao/${id}`);
    }
}