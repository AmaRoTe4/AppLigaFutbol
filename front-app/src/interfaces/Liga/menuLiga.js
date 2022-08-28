import React from 'react'
import {Link} from 'react-router-dom'
import {useEffect , useState} from 'react'
import axios from 'axios'
// import Carga from './funciones/cargaDeEquiposDeLaLiga.js'
// import cargaResultados from './funciones/cargaDeResultados.js'

const URITabla = 'http://localhost:4000/Tabla/'

const MenuDeLiga = () =>{
    //equipos
    const [Equipos ,setEquipos] = useState([])
    //el equipo seleecionado
    const [equipoSeleccionado , setEquipoSeleccionado] = useState({});    
    //ventana actual abierta
    const [inte , setInte] = useState([true , true]);
    
    useEffect(()=>{
        creacionDeTabla();
    }, [])

    const creacionDeTabla = async () =>{
        // Seleccionado
        const e = await axios.get(URITabla)
        let aux = e.data;
        let confirmacion = aux.filter(n => n.Seleccionado === 1)
        if(confirmacion[0] === undefined){
            setEquipos(aux);
        }else{
            // Carga()
            // cargaResultados()
            setEquipoSeleccionado(confirmacion[0])
            setInte([false , true])
        }
    }

    
    // ---------------seleecion de equipo----------------------

    const cambioDeSeleccion = (aux) =>{
        setEquipoSeleccionado(aux);
    }

    const aceptar = async () =>{
        await axios.put(`${URITabla}${equipoSeleccionado.idDeEquipo}` ,
        {
            Seleccionado: 1
        })
        window.location.reload()
    }
    
    //interfas de seleecion de equipo
    const InterfaceDeSeleccionDeEquipo = () =>{
        return (
            <>
            <button className="btn" style={{backgroundColor:'white' , color:"black"}} onClick={(e)=>{e.preventDefault(); aceptar()}}>Seleccionar Equipo</button>
            <table className="mt-3" style={{width: '50vw' , height: '84vh' , border: 'black solid 1px'}}>
                <tbody>
                    {Equipos && Equipos.map((n , i)=> (
                        <tr key={i}>
                            {equipoSeleccionado !== n && 
                            <th style={{color: 'white' , height:'5%'}} className='text-center' onClick={(e)=>{e.preventDefault(); cambioDeSeleccion(n)}}>{n.nombre}</th>}
                            {equipoSeleccionado === n && 
                            <th style={{color: 'white' , height:'5%'}} className='text-center selecionado'>{n.nombre}</th>}
                        </tr>
                    ))}
                </tbody>
            </table>
            </>
        )
    }

    // --------------------------------------------------------------

    // ----------------------------Menu------------------------------
    //menu de interaccion
    const Menu = () =>{
        return (
            <>
            <Link to='/' className="position-absolute top-0 start-0 d-flex justify-content-center align-items-start" style={{width: '100px' , height: '30px' , margin: '15px' , textDecoration: 'none' , color: 'black', backgroundColor: 'white' , borderRadius:'10px' , fontSize: '20px' }}>
                    <p>VOLVER</p>
            </Link>
            <div className="d-flex flex-column justify-content-center align-items-center" style={{width: '90%' , height: '90%'}}>
                <div className="border border-dark d-flex flex-column justify-content-center align-items-center" style={{width: '37.5%' , height: '6%' , marginBottom: '25px',  color: 'black', backgroundColor: 'white' , borderRadius:'10px', fontSize: '20px'}} onClick={(e)=> {e.preventDefault() ; mostrarPerfil(0)}} >
                    {equipoSeleccionado.nombre}
                </div>
                <div className="d-flex justify-content-center align-content-center" style={{width: '85%' , height: '85%' , margin: '10px'}}>
                    <Link to='/Liga/Ficture' className="border border-dark d-flex flex-column justify-content-around align-items-center" style={{textDecoration: 'none' , color: 'black' , width: '50%' , height: '100%', margin: '10px', backgroundColor: 'white' , borderRadius:'10px'}}>FICTURE
                    </Link>   
                    <Link to='/Liga/Tabla' className="border border-dark d-flex flex-column justify-content-around align-items-center" style={{textDecoration: 'none' , color: 'black' ,width: '50%' , height: '100%', margin: '10px', backgroundColor: 'white' , borderRadius:'10px'}}>TABLA
                    </Link> 
                </div>
            </div>
            </>
        )
    }
    
    //perfil de equipo
    const Perfil = () =>{
        return (
            <div className='border border-white d-flex flex-column justify-content-around align-items-end' style={{width: '93.5%' , height: '32.5%' , margin: '15px' , textDecoration: 'none' , color: 'black', backgroundColor: 'white' , borderRadius:'10px'}}>
                <button className='btn' style={{padding: '15px' , transform: 'translate(3px , 3px)'}} onClick={(e)=> {e.preventDefault() ; mostrarPerfil(1)}}>X</button>
                <div className='text-center' style={{width:'100%'}}>
                    <p>nombre: {equipoSeleccionado.nombre}</p>
                    <p>puntos: {equipoSeleccionado.puntos}</p>
                    <p>golesAFavor: {equipoSeleccionado.golesAFavor}</p>
                    <p>golesEnContra: {equipoSeleccionado.golesEnContra}</p>                
                </div>
            </div>
        )
    }

    //intercabio de interfaces en menu
    const mostrarPerfil = (aux) =>{
        if(aux === 0){
            setInte([false , false])
        }else{
            setInte([false , true])
        }
    }
    // --------------------------------------------------------------
    
    return (
        <div className="d-flex flex-column justify-content-center align-items-center" style={{height: '100vh' , width: '100vw' , backgroundColor: 'black'}}>
            {inte[0] && InterfaceDeSeleccionDeEquipo()}
            {!inte[0] && inte[1] && equipoSeleccionado && Menu()}
            {!inte[1] && Perfil()}
        </div>
    )
}

export default MenuDeLiga;
