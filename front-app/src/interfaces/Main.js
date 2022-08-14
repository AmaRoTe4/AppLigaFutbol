
import React from 'react'
import {Link} from 'react-router-dom'

const Main = () =>{
    return(
        <div className="d-flex fondoInicio flex-column justify-content-center align-items-center" style={{height: '100vh' , width: '100vw'}}>
            <div className="d-flex flex-column mt-5 justify-content-center align-items-center" style={{height: '60vh' , width: '60vw' , overflowX: 'hidden' , overflowY: 'auto' , transform: 'translateY(-50px)'}}>
                <Link to='/PartidosAlAsar' className='mt-5'>
                    <button className='btn btn-white border border-dark' style={{width: '200px' , backgroundColor: 'white'}} type='button'>Partidos al Azar</button>
                </Link>
                <Link to='/Liga' className='mt-3'>
                    <button className='btn btn-white border border-dark' style={{width: '200px' , backgroundColor: 'white'}} type='button'>Liga</button>
                </Link>                
            </div>
        </div>
    )
}

export default Main