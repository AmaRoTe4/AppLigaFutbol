import React from 'react'
// import {Link} from 'react-router-dom'
import axios from 'axios'
import {useEffect , useState} from 'react'
import {CargaFicture} from './funciones/CargaFicture.js'

const URI = 'http://localhost:4000/Equipos'
let numero = 0

const Liga = () =>{
    const [equiposTodos , setEquiposTodos ] = useState([])
    const [equiposLiga , setEquiposLiga ] = useState([])
    const [ficture, setFicture] = useState([[]])// estos 38 arrays con 10 array adentro
    const [lista , setLista] = useState([])
    const [fechaActual ,setFechaActual] = useState(0)

    useEffect(() =>{
        setPartido()
    })

    const setPartido = async () =>{
        const equipo = await axios.get(URI)
        setEquiposTodos(equipo.data)
        if(numero < 5){
            let aux = []
            for(let i = 0 ; i < 20 ; i++){
                aux.push(equiposTodos[i])
            }
            setEquiposLiga(aux)
            // console.log(equiposLiga)
            numero++
        }else{
            CargaDeEquipos()
            creadorDeFicture()
            numero++
        }
    }

    const CargaDeEquipos = () =>{
        let aux = equiposLiga.map((n , i) => n.id)
        setLista(aux)
    }

    const TransformacionAdos = () =>{
        let l = lista.map(n => n)
        let numero20 = l.pop()
        let aux = []
        for(let i = 0 ; i < 8 ; i++){
            aux.push(l.pop(l[18-i]))
        }
        let retorno = aux.concat(l)
        retorno.unshift(numero20)
        return retorno
    }
    

    const creadorDeFicture = () =>{
        let aux = TransformacionAdos()
        setFicture(CargaFicture(lista , aux))
    }

    const buscarEquipo = (fecha , indice , Lv) =>{
        if(numero > 200){
            let aux = equiposLiga.filter((n)=> n.id === ficture[fecha][indice][Lv])
            return aux[0].nombre
        }
    }

    const RetornoDeFecha = (indice , fecha) =>{
        if(ficture[0]){
            let aux = [0,0,0,0,0]
            if(indice === 0){
                return (
                    <div style={{height: '90%' , width:'90%'}} className="d-flex flex-column justify-content-center align-items-center">
                        {aux.map((n , i) => (
                            <div style={{marginBottom: "13px", marginTop: '13px'}}  key={i}>{buscarEquipo(fecha ,i ,0)} - {buscarEquipo(fecha ,i ,1)}</div>
                        ))}
                    </div>
                )
            }else{
                return (
                    <div style={{height: '90%' , width:'90%'}} className="d-flex flex-column justify-content-center align-items-center">
                        {aux.map((n , i) => (
                            <div  style={{marginBottom: "13px", marginTop: '13px'}} key={i+5}>{buscarEquipo(fecha ,i+5 ,0)} - {buscarEquipo(fecha ,i+5 , 1)}</div>
                        ))}
                    </div>
                )
            }
        }
    }

    const pasoDeFechas = (m) =>{
        if(m === 0){
            if(fechaActual !== 0){
                setFechaActual(fechaActual-1)
            }else{
                setFechaActual(37)
            }
            console.log(fechaActual)
        }else{
            if(fechaActual !== 37){
                setFechaActual(fechaActual+1)
            }else{
                setFechaActual(0)
            }
            console.log(fechaActual)
        }
    }

    //paara ver si todo esta en orden
    // const verRivales = () =>{
    //     for(let i = 3 ; i < 23; i++){
    //         let numeros = ficture.map((n) => 
    //             n.map(m => 
    //                 (m[0] !== i && m[1] === i) || (m[1] !== i && m[0] === i) ? 
    //                 m : ''
    //             )
    //         )
    //         numeros = numeros.map(n => n.filter(n => n !== ''))
    //         console.log(numeros.map(n => n[0][0] !== i ? n[0][0] : n[0][1]).sort((a , b) => a - b))
    //     }
    //     // console.log(numeros)
    // }

    return(
        <div className="d-flex flex-column justify-content-center align-items-center" style={{height: '100vh' , width: '100vw'}}>
            <div className="d-flex justify-content-center align-items-center" style={{ width: '80vw' , overflowX: 'hidden' , overflowY: 'auto' ,  height: '50vh' , border: 'black solid 1px'}}>
                <div className='d-flex flex-column justify-content-center align-items-center' style={{borderRight: 'solid 1px black' , width: '50%',  height: '100%'}}>
                    {RetornoDeFecha(0 , fechaActual)}
                </div>
                <div className='d-flex flex-column justify-content-center align-items-center' style={{width: '50%',  height: '100%'}}>
                    {RetornoDeFecha(1 , fechaActual)}
                </div>
            </div>
            <div>
                <button type="button" className="mt-3" onClick={(e) => {e.preventDefault() ; pasoDeFechas(0)}}>-</button>
                <button type="button" className="mt-3" onClick={(e) => {e.preventDefault() ; pasoDeFechas(1)}}>+</button>
            </div>
        </div>
    )
}

export default Liga