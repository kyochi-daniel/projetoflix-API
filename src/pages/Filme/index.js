import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './filme-info.css'
import api from '../../services/api'
import { toast } from 'react-toastify'


function Filme(){
    const { id } = useParams()
    const navigate = useNavigate()

    const [filme, setFilme] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(()=> {
        async function loadFIlme(){
            await api.get(`/movie/${id}`, {
                params:{
                    api_key: "dc3a1dc12322567da2d631d3d836a6a0",
                    language: "pt-BR",
                }
            })
            .then((response)=>{
                setFilme(response.data)
                setLoading(false)
            })
            .catch(()=>{
                navigate("/", { replace: true })
                return
            })
        }

        loadFIlme()

        return () => {
            console.log('COMPONENTE FOI DESMONTADO')
        }
    }, [navigate, id])

    function salvarFilme() {
        const minhaLista = localStorage.getItem('@primeflix')

        let filmesSalvos = JSON.parse(minhaLista) || []

        const hasFilme = filmesSalvos.some((filmesSalvos)=> filmesSalvos.id === filme.id )

        if(hasFilme) {
            toast.warn('Esse filme já está na sua lista')
            return
        }

        filmesSalvos.push(filme)
        localStorage.setItem('@primeflix', JSON.stringify(filmesSalvos))
        toast.success("Filme salvo com sucesso!")
    }

    if(loading) {
        return(
            <div className='filme-info'>
                <h1>Carregando detalhes...</h1>
            </div>
        )
    }

    return(
        <div className='filme-info'>
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>

            <h3>Sinopse</h3>
            <span>{filme.overview}</span>

            <strong>Avaliação: {filme.vote_average.toFixed(1)} /10</strong>

            <div className='area-buttons'>
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target="_blank" rel='externalcls' href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>Trailer</a>
                </button>
            </div>
        </div>
    )
}

export default Filme