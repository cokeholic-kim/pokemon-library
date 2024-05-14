import axios from "axios";

const instance = axios.create({
    baseURL: "https://pokeapi.co/api/v2",
    params: {
        limit: 20,
        offset: 0,
    }
})

export default instance