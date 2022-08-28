import axios from 'axios'

const URIResultados = 'http://localhost:4000/Resultados/'

const cargaResultados = async () =>{
    console.log('reiniciado')
    for(let i = 0 ; i < 380; i++){
        await axios.put(URIResultados+(i+6860) , {"golesLocal": 0, "golesVisitante": 0 ,"estado": 0 , "idDePartido":i })
    }
}

export default cargaResultados