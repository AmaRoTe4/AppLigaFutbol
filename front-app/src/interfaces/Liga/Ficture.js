import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {useEffect , useState} from 'react'
import {CargaFicture} from '../funciones/CargaFicture.js'
import Simulacion from '../funciones/simulacionPartido.js'

const URITabla = 'http://localhost:4000/Tabla/'
const URIResultados = 'http://localhost:4000/Resultados/'

const Ficture = () =>{
    const [equipoSeleccionado , setEquipoSeleccionado] = useState({})
    const [numero , setNumero] = useState(0)
    const [equiposLiga , setEquiposLiga ] = useState([]) 
    //este tiene todas las fechas almacenadas , sun 38 arrays con 10 array dentro cada uno con 2 id en su interrios repreentados  en otro array de 2 posiciones.
    const [ficture, setFicture] = useState([[]])
    const [fechaActual ,setFechaActual] = useState(0)
    //indice de partido el cual estamnos , este tiene la fecha y el numero del partido
    const [partidoSel , setPartidoSel] = useState(0);
    const [seleccion , setSeleccion] = useState([true , true])
    //aca esten todos los resultados de lo partidos
    const [resultados , setResultados] = useState([]);

    useEffect(() =>{
        setPartido()
    },[numero])

    const setPartido = async () =>{
        const equipo = await axios.get(URITabla)
        setEquiposLiga(equipo.data)
        if(numero < 5){
            CargaDeResultados()
            setNumero(numero + 1)
            SetEquipoSeleccionado()
        }else{
            creadorDeFicture()
            if(numero <= 300){
                setNumero(numero + 1)
            }
        }
    }

    // ----------------------indentifica el equipo nuestro--------------------

    //busca a equipo que seleccinamos an el menu
    const SetEquipoSeleccionado = () =>{
        let aux = equiposLiga.filter(n => n.Seleccionado === 1)
        setEquipoSeleccionado(aux)
    }

    //-----------------------------genera las fechas----------------------
    //este es para el tema de creacion de ficture
    //esto es asi ya que es filtura usa 2 plantillas
    const TransformacionAdos = () =>{
        let l = equiposLiga.map(n => n.id)
        let numero20 = l.pop()
        let aux = []
        for(let i = 0 ; i < 8 ; i++){
            aux.push(l.pop(l[18-i]))
        }
        let retorno = aux.concat(l)
        retorno.unshift(numero20)
        return retorno
    }
    
    //su nombre lo dice
    const creadorDeFicture = () =>{
        let aux = TransformacionAdos()
        let l = equiposLiga.map(n => n.id)
        setFicture(CargaFicture(l , aux))
    }

    // ------------------simulacion de partido---------------------------------------

    const PuntosEquipos = (aux) =>{
        if(aux[0] === aux[1]){
            return [1 , 1]
        }else if(aux[0] > aux[1]){
            return [3 , 0]
        }else{
            return [0 , 3]
        }
    }

    //este es el generador de resultados
    const jugarPartido = async (part) =>{
        // console.log(numeroDeResultado)
        const local = equiposLiga.filter((n)=> n.id === ficture[fechaActual][part][0]);
        const visitante = equiposLiga.filter((n)=> n.id === ficture[fechaActual][part][1]);
        const indiceDeEquipos = [local[0].idDeEquipo ,  visitante[0].idDeEquipo];
        const numeroDeResultado = fechaActual*10 + part;
        const equipo1 = [local[0].Defensa , local[0].Medio , local[0].Ataque];
        const equipo2 = [visitante[0].Defensa , visitante[0].Medio , visitante[0].Ataque];
        // ----------------------------------------
        const numeroDeId = 6860 + numeroDeResultado;
        const datosEquipo1 = await axios.get(`${URITabla}${indiceDeEquipos[0]}`)
        const auxE1 = datosEquipo1.data;
        const datosEquipo2 = await axios.get(`${URITabla}${indiceDeEquipos[1]}`)
        const auxE2 = datosEquipo2.data;
        let aux = Simulacion(equipo1 , equipo2);
        let repartoDePuntos = PuntosEquipos(aux);
        await axios.put(`${URITabla}${indiceDeEquipos[0]}` , {puntos: (repartoDePuntos[0] + auxE1[0].puntos) ,partidosJugados: ((auxE1[0].partidosJugados)+1) , golesAFavor: ((auxE1[0].golesAFavor)+aux[0]) ,golesEnContra: ((auxE1[0].golesEnContra)+aux[1]) })
        await axios.put(`${URITabla}${indiceDeEquipos[1]}` , {puntos: (repartoDePuntos[1] + auxE2[0].puntos) ,partidosJugados: ((auxE2[0].partidosJugados)+1) , golesAFavor: ((auxE2[0].golesAFavor)+aux[1]) ,golesEnContra: ((auxE2[0].golesEnContra)+aux[0]) })
        await axios.put(`${URIResultados}${numeroDeId}` , {golesLocal: aux[0],golesVisitante: aux[1] , estado: 1} )      
        CargaDeResultados()
    }

    const auxSimularTodoLaFeha = (i) =>{
        jugarPartido(i)
    }

    const simularTodoLaFeha = async (array) =>{
        let numero = 0; 
        let interal = setInterval(()=>{
            if(array[numero] === 0){
                auxSimularTodoLaFeha(numero)
            }
            numero++
            if(numero === 10){
                clearInterval(interal)
            }
        })
    }

    // ------------------partido especifico---------------------------------------

    //para dar lugar a los interalos entre estados de funcion
    const activatePartido = (indice) =>{
        if(seleccion[0]){
            setSeleccion([false , seleccion[1]])
            setPartidoSel(indice)
        }else{
            setSeleccion([true , seleccion[1]])
        }
    }

    const PartidoEspecifico = () =>{
        if(!seleccion[0] && seleccion[1]){
            const local = equiposLiga.filter((n)=> n.id === ficture[fechaActual][partidoSel][0]);
            const visitante = equiposLiga.filter((n)=> n.id === ficture[fechaActual][partidoSel][1]);
            const indRes = fechaActual*10 + partidoSel;

            return (
                <>
                    <div className='mb-3'>
                        <button disabled={resultados[indRes].estado} className='btn btn-dark' onClick={(e)=> {e.preventDefault() ; jugarPartido(partidoSel)}}>JUGAR</button>
                    </div>
                    <div style={{width: '80%', height: '50%' }} className="d-flex flex-column align-items-center">
                        <div className='d-flex align-content-center' style={{width: '105%', height: '10%' , borderBottom: '2px solid black'}}>
                            <div style={{width: '92%' , backgroundColor: 'rgb(50 , 255 , 50)'}}></div>
                            <button className="d-flex btn justify-content-center align-items-center" style={{width: '8%' , border:'none'}} onClick={(e) => {e.preventDefault() ; activatePartido()}}>X</button >
                        </div>
                        <div className='d-flex flex-column' style={{width: '100%', height: '90%' , borderBottom: '1px solid black'}}>
                            <div className='d-flex justify-content-around' style={{width: '100%', height: '30%' , borderBottom: '1px solid black' , fontSize: '70px'}}>
                                <div className="d-flex Perfil justify-content-center align-items-center" style={{width: '33.3%' , fontSize: '27px'}} onClick={(e) => {e.preventDefault()}}>{local[0].nombre}</div>
                                <div className="text-center" style={{width: '33.3%'}}>
                                    {resultados[indRes].golesLocal}-{resultados[indRes].golesVisitante}
                                </div>
                                <div className="d-flex Perfil justify-content-center align-items-center" style={{width: '33.3%' , fontSize: '27px'}} onClick={(e) => {e.preventDefault()}}>{visitante[0].nombre}</div>
                            </div>
                        </div>
                    </div>
                </>
            )
        }else{
            return ''
        }
    }
    
    // ------------------ficture---------------------------------------
    
     //esta carga los resultados de los partidos a la tabla general
    const CargaDeResultados = async () =>{
        let aux =  await axios.get(URIResultados);
        setResultados(aux.data);
    }

    //este para cargar las grilla
    const buscarEquipo = (indice , Lv) =>{
        if(numero > 300){
            let aux = equiposLiga.filter((n)=> n.id === ficture[fechaActual][indice][Lv])
            return aux[0].nombre
        }
    }

    //este es una funcion la cual terna la fecha
    const RetornoDeFecha = (ind) =>{
        if(ficture[0]){
            let aux = [0,0,0,0,0]
            return (
                <div style={{height: '90%' , width:'90%'}} className="d-flex flex-column justify-content-center align-items-center">
                {aux.map((n , i) => (
                    <div key={i} onClick={(e) => {e.preventDefault(); activatePartido(i+ind)}} className="col-12 d-flex justify-content-center" style={{fontSize: '20px', margin: '0px'}}>
                        <p className="text-center border border-dark" style={{width: '45%', color: `${buscarEquipo( i+ind ,0) === equipoSeleccionado[0].nombre ? 
                        'red' : 'black'}`}}>
                            {buscarEquipo( i+ind ,0)}
                        </p>
                        <p className="text-center border border-dark" style={{width: '10%'}}>{resultados[(i + ind) + 10*fechaActual].golesLocal}-{resultados[(i + ind) + 10*fechaActual].golesVisitante}</p>
                        <p className="text-center border border-dark" style={{width: '45%', color: `${buscarEquipo(i+ind ,1) === equipoSeleccionado[0].nombre ? 
                        'red' : 'black'}`}}>
                            {buscarEquipo(i+ind ,1)}
                        </p> 
                    </div >))}
                </div>)
        }
    }
    
    //este es para pasar de hoja en hoja
    const pasoDeFechas = (m) =>{
        if(m === 0){
            if(fechaActual !== 0){
                setFechaActual(fechaActual-1)
            }else{
                setFechaActual(37)
            }
        }else{
            if(fechaActual !== 37){
                setFechaActual(fechaActual+1)
            }else{
                setFechaActual(0)
            }
        }
    }

    const Ficture = () =>{
        let aux = [];
        const indRes = fechaActual*10;
        for(let i = 0 ; i < 10;i++){
            aux.push(resultados[indRes + i].estado)
        } 
        let habilitcion = true; 
        if(aux.includes(0)){
            habilitcion = false;
        }

        return (
            <>
            <button className="btn btn-dark" disabled={habilitcion} style={{transform: 'translateY(-50px)'}} onClick={(e) => {e.preventDefault(); simularTodoLaFeha(aux)}} >SIMULAR TODA LA FECHA</button>
            <div className="d-flex flex-column justify-content-center align-items-center" style={{ width: '80vw' , overflowX: 'hidden' , overflowY: 'auto' ,  height: '60vh' , border: 'black solid 1px'}}>
                <div className="d-flex justify-content-center align-items-center" style={{borderRight: 'solid 1px black' , width: '100%',  height: '15%' , borderBottom: '1px solid black'}}>{fechaActual + 1}</div>
                <div style={{width: '100%',  height: '85%'}} className='d-flex'>
                    <div className='d-flex flex-column justify-content-center align-items-center' style={{borderRight: 'solid 1px black' , width: '50%',  height: '100%'}}>
                        {RetornoDeFecha(0)}
                    </div>
                    <div className='d-flex flex-column justify-content-center align-items-center' style={{width: '50%',  height: '100%'}}>
                        {RetornoDeFecha(5)}
                    </div>
                </div>
            </div>
            <div>
                <button type="button" className="mt-3" onClick={(e) => {e.preventDefault() ; pasoDeFechas(0)}}>-</button>
                <button type="button" className="mt-3" onClick={(e) => {e.preventDefault() ; pasoDeFechas(1)}}>+</button>
            </div></>
        )
    }

    // ------------------barra de carga---------------------------------------
    const BarraDeCarga = () =>{
        return (
            <div className="text-center" style={{width: '200px' , height: '80px' , border: 'solid black 1px' , borderRadius: '10px'}}>
                <p>cargando...</p>
                <div style={{width: `${Math.trunc(numero/3)}%` , height: '40px' , backgroundColor: 'green' , borderEndEndRadius: '10px' , borderEndStartRadius: '10px' , borderBottom: '1px solid black'}}><p className='text-center position-absolute top-50 start-50 translate-middle mt-3'>{Math.trunc(numero/3)}</p></div>
            </div>
        )
    }

    return(
        <div className="d-flex flex-column justify-content-center align-items-center" style={{height: '100vh' , width: '100vw'}}>
            <Link to='/liga' className="position-absolute top-0 start-0 d-flex justify-content-center align-items-start" style={{width: '100px' , height: '25px' , margin: '15px' , textDecoration: 'none' , color: 'white', backgroundColor: 'black' , borderRadius:'10px' , fontSize: '17.5px' }}>
                    <p>VOLVER</p>
            </Link>
            {numero < 300 && seleccion[0] && BarraDeCarga()}
            {numero > 300 && seleccion[0] && Ficture()}
            {PartidoEspecifico()}
        </div>
    )
}

export default Ficture