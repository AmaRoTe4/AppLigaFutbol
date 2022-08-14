/* eslint-disable jsx-a11y/alt-text */
import axios from 'axios'
import { useState , useEffect} from 'react'
import Simulacion from './funciones/simulacionPartido.js'

const URI = 'http://localhost:4000/Equipos'

const PartidosAlAsar = () =>{
    const [primerCarga , setPrimerCarga] = useState(0);
    const [seleccion , setSeleccion] = useState([true , true]);
    const [indiceSeleccionadoPartido , setindiceSeleccionadoPartido] = useState(0);
    const [indicePerfil , setIndicePerfil] = useState(0);
    const [equipos , setEquipos] = useState([]) 
    const [partidos , setPartidos] = useState([])

    useEffect(() =>{
        setPartido()
    })

    const setPartido = async () =>{
        const equipo = await axios.get(URI)
        setEquipos(equipo.data)
        if(primerCarga < 21){
            cargaDePartidos()
            setPrimerCarga(primerCarga + 1)
        }
    }


    const activatePartido = (indice) =>{
        if(seleccion[0]){
            setSeleccion([false , seleccion[1]])
            setindiceSeleccionadoPartido(indice)
        }else{
            setSeleccion([true , seleccion[1]])
        }
    }

    const cargaDePartidos = () =>{
        let retorno = []
        for(let i = 0 ; i < (equipos.length / 2); i+=2){
            let aux = {local: equipos[i].nombre , visitante: equipos[i+1].nombre , golesLocal: 0 , golesVisitante: 0, estadisticasLocal: [equipos[i].Defensa , equipos[i].Medio , equipos[i].Ataque] , estadisticasVisitante: [equipos[i+1].Defensa , equipos[i+1].Medio , equipos[i+1].Ataque]}
            retorno.push(aux)
        }
        setPartidos(retorno)
    }

    const PartidoEnJuego = () =>{
        const equipo1 = [equipos[indiceSeleccionadoPartido * 2].Defensa , equipos[indiceSeleccionadoPartido * 2].Medio , equipos[indiceSeleccionadoPartido * 2].Ataque] 
        const equipo2 = [equipos[(indiceSeleccionadoPartido * 2) + 1].Defensa , equipos[(indiceSeleccionadoPartido * 2) + 1].Medio , equipos[(indiceSeleccionadoPartido * 2) + 1].Ataque] 

        const resultado = Simulacion(equipo1 , equipo2)
        let aux = partidos.map(n => n.local !== partidos[indiceSeleccionadoPartido].local && n.visitante !== partidos[indiceSeleccionadoPartido].visitante);

        let partido = partidos.map((n , i) => aux[i] ? n : {local: n.local , visitante: n.visitante , golesLocal: resultado[0] , golesVisitante: resultado[1] , estadisticasLocal: n.estadisticasLocal , estadisticasVisitante: n.estadisticasVisitante})

        setPartidos(partido)
    }

    const PartidosEnJuego = () =>{
        let retorno = []
        for(let i = 0 ; i < partidos.length ; i++){
            const resultados = Simulacion(partidos[i].estadisticasLocal , partidos[i].estadisticasVisitante)
            
            retorno.push({local: partidos[i].local , visitante: partidos[i].visitante , golesLocal: resultados[0] , golesVisitante: resultados[1], estadisticasLocal: partidos[i].estadisticasLocal , estadisticasVisitante: partidos[i].estadisticasVisitante})
        }
        setPartidos(retorno);
    }

    const activatePerfilDeEquipo = (indice, lv) =>{
        if(seleccion[1]){
            setSeleccion([seleccion[0] , false])
            setIndicePerfil([indice , lv])
        }else{
            setSeleccion([seleccion[0] , true])
        }
    }

    const Perfil = () =>{
        if(!seleccion[1]){
            const indice = indicePerfil[0];
            const estado = indicePerfil[1];
            return (
                <div style={{width: '100%', height: '100%' }} className="d-flex flex-column align-items-center">
                    <button className='btn btn-dark' style={{transform: 'translateY(-100px)',position: 'absolute' , width: '100px'}} onClick={(e) => {e.preventDefault(); activatePerfilDeEquipo()}}>volver</button>
                    <div className='d-flex flex-column justify-content-center align-items-center' style={{border: 'black 1px solid' , width: '90%', height: '300px' , fontSize: '25px' }}>
                        {estado === 'l' && <div>
                            <p>Nombre: {partidos[indice].local}</p>
                            <p>Ataque: {partidos[indice].estadisticasLocal[2]}</p>
                            <p>Medio: {partidos[indice].estadisticasLocal[1]}</p>
                            <p>Defensa: {partidos[indice].estadisticasLocal[0]}</p>
                        </div>}
                        {estado === 'v' && <div>
                            <p>Nombre: {partidos[indice].visitante}</p>
                            <p>Ataque: {partidos[indice].estadisticasVisitante[2]}</p>
                            <p>Medio: {partidos[indice].estadisticasVisitante[1]}</p>
                            <p>Defensa: {partidos[indice].estadisticasVisitante[0]}</p>
                        </div>}
                    </div>
                </div>
            )
        }
        
    }

    const PartidoEspecifico = () =>{
        if(!seleccion[0] && seleccion[1]){
            return (
                <div style={{width: '100%', height: '100%' }} className="d-flex flex-column align-items-center">
                    <button className='btn btn-dark' style={{transform: 'translateY(-100px)',position: 'absolute'}} onClick={(e) => {e.preventDefault(); PartidoEnJuego()}}>Simular</button>
                    <div className='d-flex align-content-center' style={{width: '105%', height: '10%' , borderBottom: '2px solid black'}}>
                        <div style={{width: '92%' , backgroundColor: 'rgb(50 , 255 , 50)'}}></div>
                        <button className="d-flex btn justify-content-center align-items-center" style={{width: '8%' , border:'none'}} onClick={(e) => {e.preventDefault() ; activatePartido()}}>X</button >
                    </div>
                    <div className='d-flex flex-column' style={{width: '100%', height: '90%' , borderBottom: '1px solid black'}}>
                        <div className='d-flex justify-content-around' style={{width: '100%', height: '30%' , borderBottom: '1px solid black' , fontSize: '70px'}}>
                            <div className="d-flex Perfil justify-content-center align-items-center" style={{width: '33.3%' , fontSize: '27px'}} onClick={(e) => {e.preventDefault() ; activatePerfilDeEquipo(indiceSeleccionadoPartido , 'l' )}}>{partidos[indiceSeleccionadoPartido].local}</div>
                            <div className="text-center" style={{width: '33.3%'}}>
                                {partidos[indiceSeleccionadoPartido].golesLocal}-{partidos[indiceSeleccionadoPartido].golesVisitante}
                            </div>
                            <div className="d-flex Perfil justify-content-center align-items-center" style={{width: '33.3%' , fontSize: '27px'}} onClick={(e) => {e.preventDefault() ; activatePerfilDeEquipo(indiceSeleccionadoPartido , 'v' )}}>{partidos[indiceSeleccionadoPartido].visitante}</div>
                        </div>
                    </div>
                </div>
            )
        }else{
            return ''
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center" style={{height: '100vh' , width: '100vw'}}>
            <div className="row d-flex justify-content-center" style={{maxHeight: '60vh' , width: '60vw' , overflowX: 'hidden' , overflowY: 'auto'}}>
                {seleccion[0] && <button className='btn btn-dark' style={{transform: 'translateY(-100px)' , width:'250px',position: 'absolute'}} onClick={(e) => {e.preventDefault(); PartidosEnJuego()}}>Simular Todos los partidos</button>}
                {seleccion[0] && partidos.map((n , i) =>(
                    <div key={i} onClick={(e) => {e.preventDefault() ; activatePartido(i)}} className="col-12 d-flex justify-content-center" style={{fontSize: '20px', margin: '0px'}}>
                        <p className="text-center border border-dark" style={{width: '45%'}}>{n.local}</p>
                        <p className="text-center border border-dark" style={{width: '10%'}}>{n.golesLocal}-{n.golesVisitante}</p>
                        <p className="text-center border border-dark" style={{width: '45%'}}>{n.visitante}</p>    
                    </div >
                ))} 
                {PartidoEspecifico()}
                {Perfil()}
            </div>
        </div>
    )
}

export default PartidosAlAsar
