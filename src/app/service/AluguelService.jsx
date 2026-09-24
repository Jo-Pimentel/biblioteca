import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/biblioteca/alugueis"
})

export default class AluguelService {
    buscarAlugueis() {
        return axiosInstance.get("/buscarAlugueis");
    }

    listarAlugueisPorPagina(pagina) {
        return axiosInstance.get(`/listarAlugueisPorPagina?page=${pagina.page}&size=${pagina.size}&sort=${pagina.sort},asc`)
    }

    realizarAluguel(aluguelDto) {
        return axiosInstance.post("/realizarAluguel", aluguelDto)
        .catch((error) => {
            // if(error.response) {
            // }
            alert(error.response.data.mensagem);

        });
    }

    prorrogarDevolucao(id) {
        return axiosInstance.put(`/prorrogarDevolucao/${id}`);
    }

    devolucao(id) {
        return axiosInstance.put(`/devolucao/${id}`);
    }
}