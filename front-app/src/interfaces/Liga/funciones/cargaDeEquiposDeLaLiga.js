import axios from 'axios'

const URITabla = 'http://localhost:4000/Tabla/'

const Carga = () => {  
    const equipos = async () =>{
        const data = await axios.get(URITabla);
        const e = data.data
        let aux = e;
        aux.forEach(n => {
            tabla(n);
        });
    }
    
    const tabla = async (i) =>{
        await axios.put(`${URITabla}${i.idDeEquipo}` ,
        {
            nombre: i.nombre,
            puntos: 0,
            partidosJugados: 0 ,
            golesAFavor: 0 ,
            golesEnContra: 0,
            Ataque: i.Ataque,
            Medio: i.Medio,
            Defensa: i.Defensa,
            Seleccionado: 0
        })
    }

    equipos();
}

export default Carga
