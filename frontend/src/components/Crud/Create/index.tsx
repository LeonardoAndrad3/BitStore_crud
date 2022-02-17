import axios from 'axios';
import { useState } from 'react';
import { BASE_URL } from '../../../utils/requests';
import './index.css';

export function Create(props:any){

    const [create, setCreate] = useState({
        type: props.type[0],
        name: '',
        idTag: ''
    });

    const [inputName, setInputName] = useState(""); 
    const [inputIdTag, setInputIdTag] = useState(""); 
    const estado = props.type[0] == 'tag' ? true : false  

    const formCreate = async (e:any) =>{
        e.preventDefault()
        axios.post(`${BASE_URL}Create.php`, create)
        .then((e)=>{
            setInputName("")
            setInputIdTag("")
            alert(e.data[0].mensagem)
        });
    }

    return(
        <>
            <div className="create">
                <h2> Create {props.type[1]}</h2>
                <form onSubmit={formCreate} name="" className="formCreate" action="" method="get">
                    <input
                    value={inputName}
                    placeholder={`Nome ${props.type[1]}...`}
                    name="name" 
                    id="inputCreate"
                    onChange={(e)=>{
                        const {value} = e.target
                        setCreate({...create, [e.target.name]: e.target.value})
                        setInputName(value);
                    }} 
                    type="text"
                    required
                    />

                    <input
                        value={inputIdTag}
                        placeholder={`Associar tag id...`}
                        name="idTag" 
                        id="inputCreate"
                        onChange={(e)=>{
                            const {value} = e.target
                            setCreate({...create, [e.target.name]: e.target.value})
                            setInputIdTag(value);
                        }} 
                        type="number"
                        min={1}
                        hidden={estado}
                        />

                    <input type="submit" value="Enviar"/>
                </form>
            </div>
        </>
    );
}
