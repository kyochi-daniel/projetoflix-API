import axios from 'axios'

//Base da URL: https://api.themoviedb.org/3/
//URL DA API: /movie/now_playing?api_key=dc3a1dc12322567da2d631d3d836a6a0&language=pt-BR

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})

export default api