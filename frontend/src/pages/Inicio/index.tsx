import React from 'react';
import { Button } from 'react-bootstrap';
import './index.css';
import { Link} from 'react-router-dom';
import {ReactComponent as Icon4} from '../../assets/img/icon4.svg';
import {ReactComponent as Icon2} from '../../assets/img/icon2.svg';

export default function Inicio(){
    return(
        <>
            <div className="main">
              <div className='searchPage'>
                <div>     
                    <Icon4 className='icon1'/>
                    <Icon2 className='icon2'/>
                </div>
           
                  <h2> Bem-vindo ao gerenciador BitStore</h2>
                    <p> Seleciona o qual tipo deseja gerenciar:</p>

                    <Link to="/crud/product?type=product_produto">
                        <Button className={"buttonProd"} type='submit'  onClick={()=>{
                        }} 
                        value={'product'}>Gerenciar Product </Button>
                     </Link>
                    <Link to="/crud/tag?type=tag_tag">
                        <Button className={"buttonTag"} type='submit' value={'tag'}> Gerenciar Tag </Button>
                    </Link>
                   
              </div>
            </div>
         

        </>
    );
}
