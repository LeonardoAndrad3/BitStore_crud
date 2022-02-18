import './index.css';
import {PaginacaoCrud} from '../PaginacaoCrud';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { BASE_URL_RELATORIO } from '../../utils/requests';
import { Button } from 'react-bootstrap';

export function Crud(props:any){

    const [valuesURL, setValuesURL] = useState(props.type[0])
    let dados = valuesURL.split("_");
    
    return(
        <>
            
            <div className="contentCrud">
                <Link to="/">
                    <input className='buttonBack' type="button" value="<"/>
                </Link>

                <div className='optionCrud'>
                <h2> Gerencia de {dados[1]} </h2>
                <PaginacaoCrud type={dados}/>
                </div>
            <div id="crud" className='crud'>
                
            </div>
            
            <a href={BASE_URL_RELATORIO}> <Button> Gerar relatório </Button> </a>
            </div>
        </>
    );
}   