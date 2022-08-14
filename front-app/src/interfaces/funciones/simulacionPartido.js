const Simulacion = (equipo1 , equipo2) =>{
    // calculos
    const ataqueEquipo1 = (equipo1[2] + equipo1[1] * 0.75 + equipo1[0] * 0.25) / 3; 
    const medioEquipo1 = (equipo1[2] * 0.40 + equipo1[1]+ equipo1[0] * 0.40) / 3; 
    const defensaEquipo1 = (equipo1[2] * 0.10 + equipo1[1] * 0.70 + equipo1[0]) / 3; 
    const ataqueEquipo2 = (equipo2[2] + equipo2[1] * 0.75 + equipo2[0] * 0.25) / 3; 
    const medioEquipo2 = (equipo2[2] * 0.40 + equipo2[1]+ equipo2[0] * 0.40) / 3; 
    const defensaEquipo2 = (equipo2[2] * 0.10 + equipo2[1] * 0.70 + equipo2[0]) / 3; 
    const formadeEquipo1 = Math.trunc((ataqueEquipo1 + medioEquipo1 + defensaEquipo1) / 3);
    const formadeEquipo2 = Math.trunc((ataqueEquipo2 + medioEquipo2 + defensaEquipo2) / 3);
    const estadoEquipo1 = formadeEquipo1 - formadeEquipo2
    const estadoEquipo2 = formadeEquipo2 - formadeEquipo1
    const porcentajeDeAciertoEquipo1 = efectividad(Math.trunc(ataqueEquipo1 - defensaEquipo2)) 
    const porcentajeDeAciertoEquipo2 = efectividad(Math.trunc(ataqueEquipo2 - defensaEquipo1))
    const llegadasEquipo1 = llegadas(estadoEquipo1)
    const llegadasEquipo2 = llegadas(estadoEquipo2)
    const golesEquipo1 = goles(porcentajeDeAciertoEquipo1 , llegadasEquipo1)
    const golesEquipo2 = goles(porcentajeDeAciertoEquipo2 , llegadasEquipo2)
    
    return [golesEquipo1 , golesEquipo2]
}

const goles = (efectividad , llegadas ) =>{
    let goles = 0
    for(let i = 0 ; i <= llegadas; i++){
        let intento = Math.floor(Math.random()*101);
        if(intento <= efectividad){
            goles++    
        }
    }
    return goles
}

const llegadas = (puntuacion) =>{
    switch(puntuacion){
        case puntuacion = 33:
            return 35
        case puntuacion = 32:
            return 34
        case puntuacion = 31:
            return 33
        case puntuacion =  30:
            return 33
        case puntuacion = 29:
            return 33
        case puntuacion = 28:
            return 32
        case puntuacion = 27:
            return 31
        case puntuacion = 26:
            return 30
        case puntuacion = 25:
            return 30
        case puntuacion = 24:
            return 30
        case puntuacion = 23:
            return 30
        case puntuacion = 22:
            return 30
        case puntuacion = 21:
            return 30
        case puntuacion = 20:
            return 30
        case puntuacion = 19:
            return 28
        case puntuacion = 18:
            return 27
        case puntuacion = 17:
            return 26
        case puntuacion = 16:
            return 25
        case puntuacion = 15:
            return 24
        case puntuacion = 14:
            return 23
        case puntuacion = 13:
            return 21
        case puntuacion = 12:
            return 20
        case puntuacion = 11:
            return 19
        case puntuacion = 10:
            return 18
        case puntuacion = 9:
            return 16
        case puntuacion = 8:
            return 15
        case puntuacion = 7:
            return 14
        case puntuacion = 6:
            return 14
        case puntuacion = 5:
            return 14
        case puntuacion = 4:
            return 13
        case puntuacion = 3:
            return 12
        case puntuacion = 2:
            return 12
        case puntuacion = 1:
            return 12
        case puntuacion = 0:
            return 12
        case puntuacion = -33:
            return 1
        case puntuacion = -32:
            return 1
        case puntuacion = -31:
            return 1
        case puntuacion = -30:
            return 1
        case puntuacion = -29:
            return 1
        case puntuacion = -28:
            return 1
        case puntuacion = -27:
            return 1
        case puntuacion = -26:
            return 2
        case puntuacion = -25:
            return 2
        case puntuacion = -24:
            return 2
        case puntuacion = -23:
            return 2
        case puntuacion = -22:
            return 3
        case puntuacion = -21:
            return 3
        case puntuacion = -20:
            return 4
        case puntuacion = -19:
            return 4
        case puntuacion = -18:
            return 4
        case puntuacion = -17:
            return 4
        case puntuacion = -16:
            return 4
        case puntuacion = -15:
            return 5
        case puntuacion = -14:
            return 5
        case puntuacion = -13:
            return 5
        case puntuacion = -12:
            return 5
        case puntuacion = -11:
            return 6
        case puntuacion = -10:
            return 6
        case puntuacion = -9:
            return 7
        case puntuacion = -8:
            return 7
        case puntuacion = -7:
            return 8
        case puntuacion = -6:
            return 9
        case puntuacion = -5:
            return 10
        case puntuacion = -4:
            return 11
        case puntuacion = -3:
            return 12
        case puntuacion = -2:
            return 12
        case puntuacion = -1:
            return 12
        default:
            return 0
    }
}

const efectividad = (puntuacion) =>{
    switch(puntuacion){
        case puntuacion = 39:
            return 35
        case puntuacion = 38:
            return 35
        case puntuacion = 37:
            return 35
        case puntuacion = 36:
            return 35
        case puntuacion = 35:
            return 35
        case puntuacion = 34:
            return 35
        case puntuacion = 33:
            return 35
        case puntuacion = 32:
            return 34
        case puntuacion = 31:
            return 33
        case puntuacion =  30:
            return 33
        case puntuacion = 29:
            return 33
        case puntuacion = 28:
            return 32
        case puntuacion = 27:
            return 31
        case puntuacion = 26:
            return 30
        case puntuacion = 25:
            return 30
        case puntuacion = 24:
            return 30
        case puntuacion = 23:
            return 30
        case puntuacion = 22:
            return 30
        case puntuacion = 21:
            return 30
        case puntuacion = 20:
            return 25
        case puntuacion = 19:
            return 24
        case puntuacion = 18:
            return 24
        case puntuacion = 17:
            return 23
        case puntuacion = 16:
            return 22
        case puntuacion = 15:
            return 20
        case puntuacion = 14:
            return 18
        case puntuacion = 13:
            return 18
        case puntuacion = 12:
            return 18
        case puntuacion = 11:
            return 18
        case puntuacion = 10:
            return 18
        case puntuacion = 9:
            return 15
        case puntuacion = 8:
            return 12
        case puntuacion = 7:
            return 10
        case puntuacion = 6:
            return 8
        case puntuacion = 5:
            return 8
        case puntuacion = 4:
            return 7
        case puntuacion = 3:
            return 6
        case puntuacion = 2:
            return 6
        case puntuacion = 1:
            return 6
        case puntuacion = 0:
            return 6
        case puntuacion = -29:
            return 1
        case puntuacion = -28:
            return 1
        case puntuacion = -27:
            return 1
        case puntuacion = -26:
            return 2
        case puntuacion = -25:
            return 2
        case puntuacion = -24:
            return 2
        case puntuacion = -23:
            return 2
        case puntuacion = -22:
            return 2
        case puntuacion = -21:
            return 2
        case puntuacion = -20:
            return 2
        case puntuacion = -19:
            return 2
        case puntuacion = -18:
            return 2
        case puntuacion = -17:
            return 2
        case puntuacion = -16:
            return 2
        case puntuacion = -15:
            return 2
        case puntuacion = -14:
            return 3
        case puntuacion = -13:
            return 3
        case puntuacion = -12:
            return 3
        case puntuacion = -11:
            return 3
        case puntuacion = -10:
            return 4
        case puntuacion = -9:
            return 4
        case puntuacion = -8:
            return 4
        case puntuacion = -7:
            return 4
        case puntuacion = -6:
            return 5
        case puntuacion = -5:
            return 5
        case puntuacion = -4:
            return 5
        case puntuacion = -3:
            return 6
        case puntuacion = -2:
            return 6
        case puntuacion = -1:
            return 6
        default:
            return 0
    }
}

export default Simulacion