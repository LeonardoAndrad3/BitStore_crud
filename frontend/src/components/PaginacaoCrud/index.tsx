import './index.css';
import React from 'react';
import ReactDom from 'react-dom';
import {Create} from '../Crud/Create';
import {Update} from '../Crud/Update';
import {Read} from '../Crud/Read';
import {Delete} from '../Crud/Delete';
import { Button } from 'react-bootstrap';

export function PaginacaoCrud(props:any){

    function setPageCrud(page: JSX.Element){
        const element = (page);
        ReactDom.render(element, document.getElementById('crud'));
    }

    return(
        <>
            <div className="paginacaoTipo">
                <div className="paginacaoCrud">
                    <Button variant="success" onClick={()=>{setPageCrud(<Create type={props.type}/>)}}>Criação</Button>
                    <Button variant="warning" onClick={()=>{setPageCrud(<Update type={props.type}/>)}}>Edição</Button>
                    <Button variant="info" onClick={()=>{setPageCrud(<Read type={props.type}/>)}}>Listagem</Button>
                    <Button variant="danger" onClick={()=>{setPageCrud(<Delete type={props.type}/>)}}>Delete</Button>
            </div>
            
            </div>
        </>
    );
}