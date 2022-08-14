
export const CargaFicture = (lista1 , lista2) =>{
    // let lista1 = [1, 2,3 ,4 ,5 ,6 ,7 ,8,9,10, 11, 12, 13 , 14 , 15 , 16, 17,18, 19, 20];
    // let lista2 = [20, 12,13 ,14 ,15 ,16 ,17 ,18,19,1, 2, 3 , 4 , 5 , 6, 7,8, 9, 10,  11];
    let retorno = []
    let partidos = [];
    
    //lee las listas
    const fechas = (lista) => {
        for(let i = 0 ; i < 10 ; i++){
            partidos.push([lista[i] , lista[19-i]])
        }
    }
    
    //simula si pones cero te tira la primera lista
    //si pones 1 la segunda y asi sucesivamente
    const simulacionImpar = () =>{//aux
        // for(let i = 1 ; i <= aux; i++){
            let aux2 = lista1.pop()
            let aux = lista1.shift()
            lista1.push(aux)
            lista1.push(aux2)
        // }
        return lista1;
    }
    
    // simula si pones cero te tira la primera lista
    // si pones 1 la segunda y asi sucesivamente
    const simulacionPar = () =>{//aux
        // for(let i = 1 ; i <= aux; i++){
            let aux2 = lista2.shift()
            let aux = lista2.shift()
            lista2.push(aux)
            lista2.unshift(aux2)
        // }
        return lista2;
    }
    
    
    const PartidosDeLaLiga = () =>{
        // let listaPar = lista2;
        // let listaImpar = lista1;
        for(let i = 0 ; i < 19 ; i++){
            let listaPar = simulacionPar()//i
            let listaImpar = simulacionImpar()//i
            fechas(listaPar);
            retorno.push(partidos)
            // console.log(partidos);
            partidos = [];
            fechas(listaImpar);
            retorno.push(partidos)
            // console.log(partidos);
            partidos = [];
        }
    }
    
    PartidosDeLaLiga()
    return retorno
}