import axios from 'axios'
import React from 'react'
import {Link} from 'react-router-dom'
import {useEffect , useState} from 'react'

const URITabla = 'http://localhost:4000/Tabla'

//falta el clasificador
const Tabla = () =>{
    const [datos , setDatos] = useState([])
    const [equipoSeleccionado , setEquipoSeleccionado] = useState({})

    useEffect(() => {
        CargaDeDatos()
    }, [])

    useEffect(() => {
        SetEquipoSeleccionado()
    }, [datos])

    const CargaDeDatos = async () =>{
        const aux = await axios.get(URITabla);
        ordenarDatos(aux.data)
    }

    const SetEquipoSeleccionado = () =>{
        let aux = datos.filter(n => n.Seleccionado === 1)
        setEquipoSeleccionado(aux)
    }

    const ordenarDatos = (dato) =>{
        let repo = []
        for(let i = 0; i< dato.length; i++){
            let d = [dato[i].puntos , dato[i]];
            for(let j = i+1; j< dato.length; j++){
                if(d[0] < dato[j].puntos){
                    [d[0],d[1] ,dato[j]] = [dato[j].puntos, dato[j] , d[1]]
                }
            }
            //aca adentro esta el prblam
            repo.push(d);
        }
        let retorno = repo.map((n) => n[1])
        setDatos(retorno)
    }

    return (
        <div className="d-flex flex-column justify-content-center align-items-center" style={{height: '100vh' , width: '100vw'}}>
            <Link to='/liga' className="position-absolute top-0 start-0 d-flex justify-content-center align-items-start" style={{width: '100px' , height: '25px' , margin: '15px' , textDecoration: 'none' , color: 'white', backgroundColor: 'black' , borderRadius:'10px' , fontSize: '17.5px' }}>
                    <p>VOLVER</p>
            </Link>
            <table style={{width: '50vw' , height: '84vh' , border: 'black solid 1px'}}>
                <tbody>
                    <tr style={{width: '100%' , height: '4vh' , borderBottom: 'black solid 1px'}}>
                        <th style={{width:"50%"}} >Nombre</th>
                        <th className="text-center" style={{width:"10%"}} >PJ</th>
                        <th className="text-center" style={{width:"10%"}} >P</th>
                        <th className="text-center" style={{width:"10%"}} >DFG</th>
                        <th className="text-center" style={{width:"10%"}} >GAF</th>
                        <th className="text-center" style={{width:"10%"}} >GEC</th>
                    </tr>
                    {datos && equipoSeleccionado[0] && datos.map((n , i)=> (
                        <tr key={i} style={{color: `${equipoSeleccionado[0].nombre === n.nombre ? 'red' : 'black'}`}}>
                            <th style={{width:"50%"}} >{n.nombre}</th>
                            <th className="text-center" style={{width:"10%"}} >{n.partidosJugados}</th>
                            <th className="text-center" style={{width:"10%"}} >{n.puntos}</th>
                            <th className="text-center" style={{width:"10%"}} >{n.golesAFavor - n.golesEnContra}</th>
                            <th className="text-center" style={{width:"10%"}} >{n.golesAFavor}</th>
                            <th className="text-center" style={{width:"10%"}} >{n.golesEnContra}</th>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Tabla;