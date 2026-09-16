import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/biblioteca/alugueis"
})

export default class AluguelService {
    buscarAlugueis() {
        return axios.get("/buscarAlugueis");
    }

    realizarAluguel(aluguelDto) {
        return axios.post("/realizarAluguel", aluguelDto);
    }

    prorrogarDevolucao(id) {
        return axios.put(`/prorrogarDevolucao/${id}`);
    }

    devolucao(id) {
        return axios.put(`/devolucao/${id}`);
    }
}