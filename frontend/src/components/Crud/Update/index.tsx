import axios from 'axios';
import { useEffect, useState } from 'react';
import {BASE_URL } from '../../../utils/requests';
import './index.css';

export function Update(props:any){

    const [name, setName] = useState("");
    const [UpName, setUpName] = useState("");
    const [idTag, setIdTag] = useState("");
    const [upIdTag, setUpIdTag] = useState("");
    const estado = props.type[0] == 'tag' ? true : false  
    const [update, setUpdate] = useState<any>({
        "type": props.type[0],
        "idProduct": "",
        "nameUp": "",
        "idTag": "",
        "tagUp": ""
    })

    const formUpdate = async(e: any)=>{
        e.preventDefault()
        axios.post(`${BASE_URL}Update.php`, update)
        .then((e)=>{
            setName("")
            setUpName("")
            setIdTag("")
            setUpIdTag("")
            if(update["nameUp"] == ""){
                alert(`tag: ${e.data[0].mensagem}`)
            }else if(update["tagUp"] == ""){
                alert(`Produto: ${e.data[0].mensagem}`)
            }else{
                alert(`Produto: ${e.data[0].mensagem}`)
                alert(`tag: ${e.data[1].mensagem}`)
            }         
        })
    }
 
    
    return(
        <>
            <div className="update">
                <h2>Edição de {props.type[1]}</h2>
                <form onSubmit={formUpdate} className='formUpdate'>

                    <input onChange={(e)=>{
                        const {value} = e.target
                        setName(value)
                        setUpdate({...update, [e.target.name]: e.target.value})
                    }}
                    value={name} 
                    placeholder={`id ${props.type[1]}...`}
                    name="idProduct"
                    type="number"/>

                    <input onChange={(e)=>{
                        const {value} = e.target
                        setUpName(value)
                        setUpdate({...update, [e.target.name]: e.target.value})
                    }}
                    value={UpName} 
                    placeholder={'Alterar produto...'}
                    name="nameUp"
                    type="text"/>

                    <input onChange={(e)=>{
                        const {value} = e.target
                        setIdTag(value)
                        setUpdate({...update, [e.target.name]: e.target.value})
                    }}
                    value={idTag} 
                    placeholder={`id tag...`}
                    name="idTag"
                    type="number"
                    hidden={estado}
                    />

                    <input onChange={(e)=>{
                        const {value} = e.target
                        setUpIdTag(value)
                        setUpdate({...update, [e.target.name]: e.target.value})
                    }}
                    value={upIdTag} 
                    placeholder={'Alterar id tag...'}
                    name="tagUp"
                    type="number"
                    hidden={estado}
                    />
                    <input value="Enviar" type="submit"/>
                </form>
            </div>
        </>
    );
}