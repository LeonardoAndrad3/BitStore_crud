import axios from 'axios';
import React, { useState } from 'react';
import { BASE_URL } from '../../../utils/requests';
import './index.css';

export function Delete(props:any){
    
    const [deletar, setDeletar] = useState({
        type: props.type[0],
        deleteProduct: "",
        id: "",
        idTag: ""
    })

    const [inputId, setInputId] = useState("");
    const [inputIdTag, setInputIdTag] = useState("");
    const [inputIdProduct, setInputIdProduct] = useState("");
    const estado = props.type[0] == "tag"? true: false;


    const formDelete = async (e:any)=> {

        e.preventDefault()
        axios.post(`${BASE_URL}Delete.php`, deletar)
        .then((e)=>{
            setInputId("") 
            if(deletar["idTag"] !== ""){
                alert(`${e.data[0].mensagem}`)
            }else{
                alert(`${e.data[0].mensagem}`)
            }
        })
    }

    const [button, setButton] = useState(true);
    const [buttonTag, setButtonTag] = useState(true);


    return(
        <>
            <div className="delete">
                <h2> Deleção de {props.type[1]}</h2>
                <form onSubmit={formDelete}className="formDelete" action="" method="get">
                    <input 
                    name="id"
                    value={inputId}
                    onChange={(e)=>{
                        const {value} = e.target
                        setInputId(value);
                        setDeletar({...deletar, [e.target.name]: e.target.value})
                    }}
                    type="number" 
                    min={"1"}
                    placeholder={`Id ${props.type[1]}...`}/>

                    <div>
                    Confirmar
                     <input type="checkbox" 
                     name='deleteProduct'
                    onChange={(e)=>{
                        const {checked} = e.target 
                        setButton(!checked)
                        setDeletar({...deletar, [e.target.name]: e.target.value})
                    }} 
                    /> 
                    </div>                 
                    <input type="submit" className="enviar" value="Enviar" disabled={button}/>
                </form>
                <form hidden={estado}
                onSubmit={formDelete} className='formDelete'>
                <h2> Desassociar Tag</h2>
                    <input 
                        name="id"
                        value={inputIdProduct}
                        onChange={(e)=>{
                        const {value} = e.target
                        setInputIdProduct(value);
                        setDeletar({...deletar, [e.target.name]: e.target.value})
                        }}
                        type="number" 
                        min={"1"}
                        placeholder={`Id ${props.type[1]}...`}
                    />
                    <input 
                        name="idTag"
                        value={inputIdTag}
                        onChange={(e)=>{
                        const {value} = e.target
                        setInputIdTag(value);
                        setDeletar({...deletar, [e.target.name]: e.target.value})
                        }}
                        type="number" 
                        min={"1"}
                        placeholder={`Id tag...`}
                    /> 
                    <div>
                    Confirmar
                     <input 
                        type="checkbox" 
                        onChange={(e)=>{
                        const {checked} = e.target 
                        setButtonTag(!checked)
                    }}/> 
                    </div>
                     <input 
                        type="submit" 
                        className="enviar" 
                        value="Enviar" 
                        disabled={buttonTag}
                     />
                     
                </form>
            </div>
        </>
    );
}