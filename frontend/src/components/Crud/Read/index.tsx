import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { BASE_URL } from '../../../utils/requests';
import './index.css';

export function Read(props:any){

    const [readProd,setReadProd] = useState<any[]>([])
    const [readAssoc,setReadAssoc] = useState<any[]>([])
    
    const [type] = useState({
        "type": props.type[0]
    })
    const [listProduct, setListProduct] = useState(false)
    const [listProductAssoc, setListProductAssoc] = useState(true)
    const estado = props.type[1] == "tag"?true:false

    useEffect(()=>{
        axios.post(`${BASE_URL}Read.php`, type)
        .then((res)=>{
            setReadProd(res.data)  
            if(!estado){
                setReadAssoc(res.data[res.data.length - 1].assoc)
            }          
        }).catch((e)=>{
            alert("Produtos não encontrados");  
        })
    }, [setReadProd]);

    return(
        <>
            <div className="read">
                <div className='readButton'>
                    <Button onClick={()=>{
                        setListProductAssoc(true)
                        setListProduct(false)
                    }}
                    hidden={estado}
                    > Listagem </Button>
                    <Button onClick={()=>{
                        setListProduct(true)
                        setListProductAssoc(false)
                    }}
                    hidden={estado}
                    > Tags associadas </Button>
                </div>
            
                <h2> Listagem de {props.type[1]}</h2>
                <table  className='listProd' hidden={listProductAssoc}>  
                    <thead>  
                    <tr>   
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Id tag</th>
                        <th>Name tag</th>
                        {/* cabeçalho */}
                    </tr>   
                    </thead>
                    <tbody>
                    {
                        readAssoc.map((res)=>{
                            return(
                                <>
                                
                                    <tr className='animationList'>
                                        <td>
                                            {res.id}
                                        </td> 
                                        <td>
                                            {res.name}
                                        </td>
                                        <td>
                                            {res.tag}
                                        </td>
                                        <td>
                                            {res.nameTag}
                                        </td>
                                    </tr>
                                </>
                            ); 
                        })
                    }
                    </tbody>
                </table>
                <table  className='listProd' hidden={listProduct}>  
                    <thead >  
                    <tr>   
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Data</th>
                        {/* cabeçalho */}
                   
                    </tr>  
                    </thead>
                    <tbody>
                    {
                        readProd.map((res)=>{
                            return(
                                <>
                                    <tr className='animationList'>
                                        <td>
                                            {res.id}
                                        </td> 
                                        <td>
                                            {res.name}
                                        </td>
                                        <td>
                                            {res.data}
                                        </td>
                                    </tr>
                                </>
                            ); 
                        })
                    }
                    </tbody>
                </table>
            </div>
        </>
    );
}